import fs from "fs";
import path from "path";
import { argv } from "process";

const iconPath = argv[2];

if (!iconPath) {
  console.error("Usage: npm run import-icon -- <icon-path>");
  process.exit(1);
}

const iconName = iconPath
  .split("/")
  .pop()
  ?.replace(".svg", "")
  .split("-")
  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
  .join("");

const svgIcon = fs.readFileSync(path.resolve(iconPath), "utf-8");

const componentTemplate = `import { BaseIcon, type IconComponentProps } from "..";

export const ${iconName}Icon: React.FC<IconComponentProps> = (props) => (
  <BaseIcon {...props}>
    ${svgIcon.replace(/<svg[^>]*>/, "").replace(/<\/svg>/, "")}
  </BaseIcon>
);
`;

const outputPath = path.resolve(
  import.meta.dirname,
  `../../src/components/ui/Icon/icons/${iconName}Icon.tsx`,
);

fs.writeFileSync(outputPath, componentTemplate);

function updateIndexFile() {
  const indexPath = path.resolve(
    import.meta.dirname,
    "../../src/components/ui/Icon/icons/index.ts",
  );
  let indexContent = fs.readFileSync(indexPath, "utf-8");

  const importStatement = `import { ${iconName}Icon } from "./${iconName}Icon";`;

  indexContent = indexContent.replace(/[/][/] Import all icons/, (match) => {
    return `${match}\n${importStatement}`;
  });

  // Add to icon registry
  const registryEntry = `  "${iconName
    ?.split(/(?=[A-Z])/)
    .join("-")
    .toLowerCase()}": ${iconName}Icon,\n`;

  indexContent = indexContent.replace(/export \{/, (match) => {
    return `${match}\n${iconName}Icon,`;
  });

  indexContent = indexContent.replace(
    /export const iconComponents = \{/,
    (match) => {
      return `${match}\n${registryEntry}`;
    },
  );

  fs.writeFileSync(indexPath, indexContent);
}

updateIndexFile();

console.log(`Icon component ${iconName} created at ${outputPath}`);
