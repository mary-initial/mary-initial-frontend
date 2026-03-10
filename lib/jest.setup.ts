import { beforeAll, jest } from "@jest/globals";
import { setProjectAnnotations } from "@storybook/react";
import * as previewAnnotations from "./storybook/.rnstorybook/preview";

jest.useFakeTimers();
jest.mock("./plugin");

const annotations = setProjectAnnotations([previewAnnotations]);

beforeAll(annotations.beforeAll as unknown as never);
