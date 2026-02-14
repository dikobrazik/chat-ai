FROM owasp/modsecurity-crs:4.22.0-nginx-202601060501

USER root

COPY crs-setup.conf /etc/modsecurity.d/owasp-crs/crs-setup.conf
COPY nginx.yc.conf /etc/nginx/templates/conf.d/default.conf.template
