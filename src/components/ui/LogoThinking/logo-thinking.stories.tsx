import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Text } from "@/components/ui/Text";
import { LogoThinking } from "./index";

const meta = {
  component: LogoThinking,
} satisfies Meta<typeof LogoThinking>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-end gap-6">
        <LogoThinking size="large" />
        <LogoThinking size="medium" />
        <LogoThinking size="small" />
      </div>
      <div className="flex gap-3">
        <LogoThinking size="small" />
        <Text style="regular" type="s" color="#9C9C9C">
          Формирую ответ
        </Text>
      </div>
    </div>
  ),
};
