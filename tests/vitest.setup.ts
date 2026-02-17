import { beforeAll } from "vitest";
import { setProjectAnnotations } from "@storybook/react-native-web-vite";
import * as previewAnnotations from "../storybook/.storybook/preview"

const annotations = setProjectAnnotations([previewAnnotations]);

beforeAll(annotations.beforeAll);
