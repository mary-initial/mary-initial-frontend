import { beforeAll, jest } from '@jest/globals';
import { setProjectAnnotations } from '@storybook/react';
import { setUpTests } from 'react-native-reanimated';
import * as previewAnnotations from "./storybook/.rnstorybook/preview";

setUpTests();

jest.useFakeTimers();

const annotations = setProjectAnnotations([previewAnnotations]);

beforeAll(annotations.beforeAll as unknown as any);