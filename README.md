This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

API requests and OAuth links use same-origin `/api/...` URLs. No
`NEXT_PUBLIC_*` configuration is needed for the backend address, and Docker builds
exclude `.env*`. In production, nginx forwards `/api` to the backend.

For frontend-only local development, set `DEV_API_PROXY=https://jonu.ru` in an
uncommitted `.env` file before starting the dev server. Use another backend URL
if needed. The proxy is disabled in production.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## SeaweedFS S3 deployment

Production Compose (`configs/deploy/docker-compose.yaml`) runs a single-node,
authenticated SeaweedFS 4.48 instance. Its startup command is in
`configs/deploy/seaweedfs-entrypoint.sh`, which the deployment workflow copies
alongside the Compose file. Both object data and filer metadata persist in
`seaweedfs-data`. This is not replicated storage: back up that volume and monitor
disk usage. Do not run `docker compose down -v` on production.

The backend uploads/downloads through the private Docker address
`http://seaweedfs:8333`. Browsers receive signed image URLs at
`https://jonu.ru:9443/<bucket>/<key>`; the existing nginx certificate handles TLS.
No additional domain or DNS record is needed. Only nginx publishes port 9443;
SeaweedFS master, filer, volume, and S3 ports are not published.

Before the first deployment:

1. Publish the backend image with support for `S3_INTERNAL_ENDPOINT` and
   `S3_FORCE_PATH_STYLE` from `chat-ai-backend`. Wait for the image build to
   finish before applying the new Compose configuration.
2. Create `/home/github/chat-ai/storage.env` on the server using
   `configs/deploy/storage.env.example`. Generate independent keys, for example
   with `openssl rand -hex 16` and `openssl rand -hex 32`, and set both bucket
   names. Keep existing bucket names if migrating stored files. Run
   `chmod 600 /home/github/chat-ai/storage.env`. This file is shared only by the
   backend and SeaweedFS and overrides the storage values in `backend.env`;
   never commit real credentials.
   Alternatively, keep the local file at `../chat-ai-backend/storage.env` and run
   `bash tools/copy-env.sh github@host` from this repository to copy all three
   env files. The script accepts an optional fourth argument for the storage
   env path, after the frontend and backend env paths, and sets remote files
   to mode `600`.
3. Allow inbound TCP 9443 in the host firewall and hosting-provider firewall.
   The existing Let's Encrypt certificate must already be mounted into nginx.
4. From `/home/github/chat-ai`, run:

   ```bash
   docker compose config --quiet
   docker compose pull nginx backend seaweedfs
   docker compose up -d --wait seaweedfs backend nginx dozzle
   ```

SeaweedFS refuses to start without nonempty credentials and bucket names.
It creates missing buckets automatically without deleting existing contents;
the health check signs requests and verifies that both buckets are accessible
before the backend/nginx start. The default `weed mini` volume size is 128 MiB,
avoiding the large volume allocation defaults of a full cluster.

Nginx preserves signed Host/path/query values, disables ModSecurity only on the
S3 listener, and excludes signed query strings from its S3 access log. The main
site's CSP permits the storage endpoint. CORS allows GET/HEAD from
`https://jonu.ru` and `https://www.jonu.ru`; browser uploads are not enabled.
Unsigned requests to private objects must be rejected. A plain request to the
storage root returning HTTP 403 is expected, not a connectivity failure.

**Existing data is not copied automatically.** Before switching production,
back up both existing buckets and copy their contents into SeaweedFS with the
same bucket names and object keys. Stop writes during the final copy/cutover.
Database file references and generated-image keys remain unchanged, but objects
left only in the previous provider will no longer be available after switching.
To roll back, restore the previous backend Compose storage settings and cloud
credentials, then recreate the backend. The new Compose S3 environment overrides
and `storage.env` take precedence over `backend.env`, so editing `backend.env`
alone does not switch the provider back. Do not delete the SeaweedFS volume.

The nginx deployment workflow requires the server-side `storage.env`, pulls
SeaweedFS/backend, and applies Compose with readiness checks. Neither that
workflow nor the repository template generates or overwrites your credentials.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
