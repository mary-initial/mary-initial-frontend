export enum ENV {
  API_URL = "API_URL",
}

const envVars: Record<ENV, string | undefined> = {
  API_URL: process.env.EXPO_PUBLIC_API_URL,
};

/**
 * Gets an environment variable value
 * @param envKey The environment variable key defined by @see ENV
 * @returns The environment variable value or null if no value exists
 */
export const env = (envKey: ENV): string | null => envVars[envKey] ?? null;
