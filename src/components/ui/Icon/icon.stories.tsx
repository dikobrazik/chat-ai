import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { type IconName, iconComponents } from "./icons";
import { Icon } from "./index";

const meta = {
  component: () => {
    const iconNames = Object.keys(iconComponents) as IconName[];
    return (
      <div className="flex flex-wrap gap-4">
        {iconNames.map((name) => (
          <div
            key={name}
            className="flex flex-col items-center gap-2 color-gray-700"
          >
            <Icon name={name} size={32} />
            <span className="text-xs">{name}</span>
          </div>
        ))}
      </div>
    );
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const List: Story = {
  args: {},
};
