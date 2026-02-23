#!/usr/bin/env node
/**
 * Figma Variables → Design Tokens sync script
 *
 * Usage:
 *   npm run tokens:sync
 *
 * Workflow:
 *   1. Export Figma Variables from Figma Desktop using the flat JSON plugin export
 *      and save to lib/scripts/figma-tokens.json
 *   2. Run this script to generate lib/theme/tokens/*.ts from the JSON
 *
 * Alternatively, the JSON can be fetched via the Figma REST API if needed
 * (requires reformatting into the flat export schema first).
 *
 * Figma JSON schema (flat export format):
 *   {
 *     "Colors": { "base": { "0": { "value": { "MARYS": "#...", "Dark": "#..." }, "type": "color" } } },
 *     "Spacing": { "base": { "8": { "value": { "Mobile": 8 }, "type": "number" } } },
 *     "Type": { "Display L": { "Size": { "value": { "Mobile": 56 }, "type": "number" } } },
 *     "Motion": { "ease": { "in": { "value": "cubic-bezier(...)", "type": "string", "resolvedType": "STRING" } } }
 *   }
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ─── Types ───────────────────────────────────────────────────────────────────

/** A leaf token node in the flat Figma export */
interface FlatTokenLeaf {
  value: Record<string, string | number | boolean> | string | number | boolean;
  type: string;
  resolvedType?: string;
}

/** Any node in the tree — either a leaf or nested object (use isLeaf() to distinguish) */
type FlatTokenNode = Record<string, unknown>;

/** The full figma-tokens.json root structure */
type FigmaTokensJson = Record<string, Record<string, FlatTokenNode>>;

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Returns true if node is a leaf token (has both `value` and `type` keys) */
function isLeaf(node: unknown): node is FlatTokenLeaf {
  return (
    typeof node === 'object' &&
    node !== null &&
    'value' in node &&
    'type' in node &&
    !Array.isArray(node)
  );
}

/** Converts kebab-case and space-separated strings to camelCase. Numeric keys are kept as-is. */
function toCamelCase(str: string): string {
  if (/^-?\d+$/.test(str)) return str; // preserve numeric keys (e.g. "24", "-24")
  return str
    .replace(/[-\s]+(.)/g, (_, c: string) => c.toUpperCase())
    .replace(/^(.)/, (c: string) => c.toLowerCase());
}

/**
 * Resolves a Figma alias string like "{Colors.base.0}" to its actual value.
 * Handles nested paths and recursive aliases.
 */
function resolveAlias(
  alias: string,
  modeName: string | null,
  json: FigmaTokensJson,
): string | number | null {
  const match = alias.match(/^\{(.+)\}$/);
  if (!match) return alias;

  const path = match[1].split('.');
  let current: unknown = json;

  for (const segment of path) {
    if (typeof current !== 'object' || current === null) return null;
    current = (current as Record<string, unknown>)[segment];
  }

  if (!isLeaf(current)) return null;

  // Flat leaf (Motion) — value is a direct primitive
  if (typeof current.value === 'string' || typeof current.value === 'number') {
    const v = current.value;
    if (typeof v === 'string' && v.startsWith('{')) {
      return resolveAlias(v, modeName, json);
    }
    return v as string | number;
  }

  // Mode-keyed leaf — extract the mode value
  if (typeof current.value === 'object' && current.value !== null && modeName) {
    const modeValue = (current.value as Record<string, unknown>)[modeName];
    if (modeValue === undefined) {
      // Fall back to first available mode
      const fallback = Object.values(current.value as Record<string, unknown>)[0];
      if (typeof fallback === 'string' && fallback.startsWith('{')) {
        return resolveAlias(fallback, modeName, json);
      }
      return fallback as string | number | null;
    }
    if (typeof modeValue === 'string' && modeValue.startsWith('{')) {
      return resolveAlias(modeValue, modeName, json);
    }
    return modeValue as string | number;
  }

  return null;
}

/**
 * Recursively walks a token node tree and extracts resolved values.
 * @param node - Current token node
 * @param modeName - Mode to extract (e.g. "MARYS", "Mobile"). null = flat (Motion).
 * @param json - Full JSON root for alias resolution
 * @param skipTypes - Token types to skip (e.g. ["boolean"])
 */
function walkTokens(
  node: FlatTokenNode,
  modeName: string | null,
  json: FigmaTokensJson,
  skipTypes: string[] = ['boolean'],
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const [rawKey, child] of Object.entries(node)) {
    const key = toCamelCase(rawKey);

    if (isLeaf(child)) {
      if (skipTypes.includes(child.type)) continue;

      let resolvedValue: string | number | null = null;

      if (modeName === null) {
        // Flat leaf (Motion)
        if (typeof child.value === 'string' || typeof child.value === 'number') {
          resolvedValue = child.value;
        }
      } else if (typeof child.value === 'object' && child.value !== null && !Array.isArray(child.value)) {
        // Mode-keyed leaf
        const modeValue = (child.value as Record<string, unknown>)[modeName];
        if (modeValue === undefined) continue;
        if (typeof modeValue === 'string' && modeValue.startsWith('{')) {
          resolvedValue = resolveAlias(modeValue, modeName, json);
        } else {
          resolvedValue = modeValue as string | number;
        }
      }

      if (resolvedValue !== null && resolvedValue !== undefined) {
        result[key] = resolvedValue;
      }
    } else {
      // Nested node — recurse
      const nested = walkTokens(child as FlatTokenNode, modeName, json, skipTypes);
      if (Object.keys(nested).length > 0) {
        result[key] = nested;
      }
    }
  }

  return result;
}

// ─── Serialisation ───────────────────────────────────────────────────────────

function objectToTs(obj: Record<string, unknown>, indent = 2): string {
  const pad = ' '.repeat(indent);
  const lines = Object.entries(obj).map(([k, v]) => {
    // Quote keys that start with a digit or contain hyphens/spaces
    const key = /^\d|[-\s]/.test(k) ? `'${k}'` : k;
    if (typeof v === 'object' && v !== null) {
      return `${pad}${key}: ${objectToTs(v as Record<string, unknown>, indent + 2)},`;
    }
    return `${pad}${key}: ${JSON.stringify(v)},`;
  });
  return `{\n${lines.join('\n')}\n${' '.repeat(indent - 2)}}`;
}

function writeTokenFile(
  filename: string,
  exportName: string,
  typeName: string,
  content: Record<string, unknown>,
): void {
  const path = resolve(ROOT, 'theme', 'tokens', filename);
  const ts = [
    `// GENERATED from Figma Variables — run npm run tokens:sync to update`,
    ``,
    `export const ${exportName} = ${objectToTs(content)} as const;`,
    ``,
    `export type ${typeName} = typeof ${exportName};`,
    ``,
  ].join('\n');
  writeFileSync(path, ts, 'utf-8');
  console.log(`  ✓ Written theme/tokens/${filename}`);
}

// ─── TOKENS.md ───────────────────────────────────────────────────────────────

function writeTokensMarkdown(
  sections: Record<string, Record<string, unknown>>,
): void {
  const flatten = (obj: Record<string, unknown>, prefix = ''): [string, unknown][] =>
    Object.entries(obj).flatMap(([k, v]) =>
      typeof v === 'object' && v !== null
        ? flatten(v as Record<string, unknown>, prefix ? `${prefix}.${k}` : k)
        : [[prefix ? `${prefix}.${k}` : k, v]],
    );

  const lines: string[] = [
    '# Design Tokens Reference',
    '',
    '> Auto-generated — run `npm run tokens:sync` to update.',
    '',
  ];

  for (const [sectionName, tokens] of Object.entries(sections)) {
    lines.push(`## ${sectionName}`, '');
    lines.push('| Token | Value |', '|---|---|');
    for (const [key, value] of flatten(tokens)) {
      lines.push(`| \`${key}\` | \`${value}\` |`);
    }
    lines.push('');
  }

  const path = resolve(ROOT, 'theme', 'TOKENS.md');
  writeFileSync(path, lines.join('\n'), 'utf-8');
  console.log('  ✓ Written theme/TOKENS.md');
}

// ─── Main ────────────────────────────────────────────────────────────────────

function loadFromFile(): FigmaTokensJson {
  const path = resolve(__dirname, 'figma-tokens.json');
  if (!existsSync(path)) {
    throw new Error(
      `figma-tokens.json not found at ${path}.\n` +
        'Export variables from Figma Desktop and save to lib/scripts/figma-tokens.json',
    );
  }
  return JSON.parse(readFileSync(path, 'utf-8')) as FigmaTokensJson;
}

function main() {
  console.log('🔄 Syncing Figma Variables → design tokens...\n');

  const json = loadFromFile();

  const mdSections: Record<string, Record<string, unknown>> = {};

  // ── Colors ─────────────────────────────────────────────────────────────────
  // Extract 4 modes: MARYS → marys, Dark → dark, Aktivitet → aktivitet, Viden → viden
  // Nested under Colors.base (and surface, etc.)
  const colorsNode = json['Colors'] as Record<string, FlatTokenNode>;
  if (!colorsNode) throw new Error('Colors collection not found in figma-tokens.json');

  const colorModes: Record<string, string> = {
    marys: 'MARYS',
    dark: 'Dark',
    aktivitet: 'Aktivitet',
    viden: 'Viden',
  };

  const colorTokens: Record<string, unknown> = {};
  for (const [tokenKey, modeName] of Object.entries(colorModes)) {
    colorTokens[tokenKey] = walkTokens(colorsNode, modeName, json);
  }
  writeTokenFile('colors.ts', 'colorTokens', 'ColorTokens', colorTokens);
  mdSections['Colors (marys mode)'] = colorTokens['marys'] as Record<string, unknown>;

  // ── Spacing ────────────────────────────────────────────────────────────────
  const spacingNode = json['Spacing'] as Record<string, FlatTokenNode>;
  if (!spacingNode) throw new Error('Spacing collection not found in figma-tokens.json');

  // base → spacing.ts (numeric scale, value-as-key)
  const spacingBase = spacingNode['base'];
  if (!spacingBase) throw new Error('Spacing.base not found');
  const spacingTokens = walkTokens(spacingBase as Record<string, FlatTokenNode>, 'Mobile', json);
  writeTokenFile('spacing.ts', 'spacingTokens', 'SpacingTokens', spacingTokens);
  mdSections['Spacing'] = spacingTokens;

  // corner radius → radius.ts (semantic names, camelCased)
  const cornerRadiusNode = spacingNode['corner radius'];
  if (!cornerRadiusNode) throw new Error('Spacing["corner radius"] not found');
  const radiusTokens = walkTokens(cornerRadiusNode as Record<string, FlatTokenNode>, 'Mobile', json);
  writeTokenFile('radius.ts', 'radiusTokens', 'RadiusTokens', radiusTokens);
  mdSections['Radius'] = radiusTokens;

  // ── Type ───────────────────────────────────────────────────────────────────
  const typeNode = json['Type'] as Record<string, FlatTokenNode>;
  if (!typeNode) throw new Error('Type collection not found in figma-tokens.json');

  const typographyTokens = walkTokens(typeNode, 'Mobile', json);

  // Map Figma font variant names to React Native-compatible fontWeight values.
  // Figma uses weight names ("Bold", "Regular") that don't match RN's accepted values.
  const figmaWeightToRN: Record<string, string> = {
    Regular: '400',
    Book: '300',
    Bold: '700',
    Light: '300',
    Poster: '900',
  };
  const baseFonts = (typographyTokens as Record<string, unknown>)['base'] as Record<string, unknown> | undefined;
  if (baseFonts) {
    const fontWeightsRN: Record<string, string> = {};
    for (const [key, value] of Object.entries(baseFonts)) {
      if (typeof value === 'string' && figmaWeightToRN[value]) {
        fontWeightsRN[key] = figmaWeightToRN[value];
      }
    }
    if (Object.keys(fontWeightsRN).length > 0) {
      (typographyTokens as Record<string, unknown>)['fontWeightsRN'] = fontWeightsRN;
    }
  }

  writeTokenFile('typography.ts', 'typographyTokens', 'TypographyTokens', typographyTokens);
  mdSections['Typography (Mobile)'] = typographyTokens;

  // ── Motion ─────────────────────────────────────────────────────────────────
  const motionNode = json['Motion'] as Record<string, FlatTokenNode>;
  if (!motionNode) throw new Error('Motion collection not found in figma-tokens.json');

  // Motion values are flat (no mode keys) — pass null as modeName
  const animationTokens = walkTokens(motionNode, null, json);
  writeTokenFile('animations.ts', 'animationTokens', 'AnimationTokens', animationTokens);
  mdSections['Motion'] = animationTokens;

  writeTokensMarkdown(mdSections);

  console.log('\n✅ Done! Commit the updated token files.');
}

main();
