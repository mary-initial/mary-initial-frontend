import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Button } from './Button';

const meta = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    onPress: fn(),
    text: 'Action text',
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

// Primary variants
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const PrimaryOnColor: Story = {
  args: {
    variant: 'primary',
    onColor: true,
  },
};

export const PrimaryDisabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
  },
};

// Secondary variants
export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const SecondaryOnColor: Story = {
  args: {
    variant: 'secondary',
    onColor: true,
  },
};

export const SecondaryDisabled: Story = {
  args: {
    variant: 'secondary',
    disabled: true,
  },
};

// Tertiary variants
export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
  },
};

export const TertiaryDisabled: Story = {
  args: {
    variant: 'tertiary',
    disabled: true,
  },
};

// Compact variant
export const Compact: Story = {
  args: {
    variant: 'compact',
  },
};

export const CompactDisabled: Story = {
  args: {
    variant: 'compact',
    disabled: true,
  },
};

// Interaction story
export const Clickable: Story = {
  args: {
    variant: 'primary',
    text: 'Press me',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByText('Press me');
    expect(button).toBeVisible();
    await userEvent.click(button);
    expect(args.onPress).toHaveBeenCalledTimes(1);
  },
};
