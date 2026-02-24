import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { Badge } from './Badge';

const meta = {
  title: 'Badge',
  component: Badge,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

// Large — Active states
export const LargeActiveIcon: Story = {
  args: {
    size: 'large',
    content: 'icon',
    disabled: false,
  },
};

export const LargeActiveNumber: Story = {
  args: {
    size: 'large',
    content: 'number',
    number: 1,
    disabled: false,
  },
};

export const LargeActiveNone: Story = {
  args: {
    size: 'large',
    content: 'none',
    disabled: false,
  },
};

// Large — Disabled states
export const LargeDisabledIcon: Story = {
  args: {
    size: 'large',
    content: 'icon',
    disabled: true,
  },
};

export const LargeDisabledNumber: Story = {
  args: {
    size: 'large',
    content: 'number',
    number: 1,
    disabled: true,
  },
};

export const LargeDisabledNone: Story = {
  args: {
    size: 'large',
    content: 'none',
    disabled: true,
  },
};

// Small — Active / Disabled
export const SmallActive: Story = {
  args: {
    size: 'small',
    content: 'none',
    disabled: false,
  },
};

export const SmallDisabled: Story = {
  args: {
    size: 'small',
    content: 'none',
    disabled: true,
  },
};
