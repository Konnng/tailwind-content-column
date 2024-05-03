// const _ = require('lodash');
const { expect, it, afterEach, vi } = await import('vitest');

const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const merge = require('lodash/merge');
const prettier = require('prettier');

const plugin = require('../src/index');

const testConfig = {
  theme: {
    colGap: {
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
    },
    colWidth: {
      sm: '120px',
      md: '240px',
      lg: '360px',
    },
    colRuleColor: { tailwind: '#38b2ac' },
    colRuleWidth: {
      default: '1px',
      sm: '2px',
      md: '4px',
      lg: '8px',
    },
  },
  corePlugins: false,
  plugins: [plugin],
};

const format = async (raw) => prettier.format(raw, { parser: 'css' });

const generatePluginCss = async (css = '', config = {}) => {
  const postcssPlugins = [tailwindcss(merge(testConfig, config))];

  const rawCSS = `
    @tailwind utilities;
    ${css}
  `;

  const { css: output } = await postcss(postcssPlugins).process(rawCSS, {
    from: undefined,
  });

  return await format(output);
};

afterEach(() => vi.clearAllMocks());

it('checks if generating CSS works', async () => {
  const result = await generatePluginCss();

  expect(result).toBe('');
});

it('checks if applies col-gap utility', async () => {
  const expected = await format(`
    article {
      column-count: 2;
    }`);
  const result = await generatePluginCss('article { @apply col-count-2; }');

  expect(result).toBe(expected);
});

it('checks if applies col-count utility', async () => {
  const expected = await format(`
    article {
      column-count: 2;
      column-gap: 1rem;
    }`);
  const result = await generatePluginCss(
    'article { @apply col-count-2 col-gap-sm; }'
  );

  expect(result).toBe(expected);
});

it('checks if applies col-width utility', async () => {
  const expected = await format(`
    article {
      column-count: 2;
      column-width: ${testConfig.theme.colWidth.sm};
    }`);
  const result = await generatePluginCss(
    'article { @apply col-count-2 col-width-sm; }'
  );

  expect(result).toBe(expected);
});

it('checks if applies col-rule-color utility', async () => {
  const expected = await format(`
    article {
      column-count: 2;
      column-rule-color: ${testConfig.theme.colRuleColor.tailwind};
      column-width: ${testConfig.theme.colWidth.sm};
    }`);
  const result = await generatePluginCss(
    'article { @apply col-count-2 col-width-sm col-rule-tailwind; }'
  );

  expect(result).toBe(expected);
});

it('checks if applies col-rule-width utility', async () => {
  const expected = await format(`
    article {
      column-count: 2;
      column-rule-color: ${testConfig.theme.colRuleColor.tailwind};
      column-rule-width: ${testConfig.theme.colRuleWidth.sm};
      column-width: ${testConfig.theme.colWidth.sm};
    }`);
  const result = await generatePluginCss(
    'article { @apply col-count-2 col-width-sm col-rule-tailwind col-rule-width-sm; }'
  );

  expect(result).toBe(expected);
});

it('checks if applies col-rule-style utility', async () => {
  const expected = await format(`
    article {
      column-count: 2;
      column-rule-color: ${testConfig.theme.colRuleColor.tailwind};
      column-rule-style: dotted;
      column-rule-width: ${testConfig.theme.colRuleWidth.sm};
      column-width: ${testConfig.theme.colWidth.sm};
    }`);
  const result = await generatePluginCss(
    'article { @apply col-count-2 col-width-sm col-rule-tailwind col-rule-width-sm col-rule-dotted; }'
  );

  expect(result).toBe(expected);
});

it('checks if applies col-rule-style utility', async () => {
  const expected = await format(`
    article {
      column-count: 2;
      column-rule-color: ${testConfig.theme.colRuleColor.tailwind};
      column-rule-style: dotted;
      column-rule-width: ${testConfig.theme.colRuleWidth.sm};
      column-width: ${testConfig.theme.colWidth.sm};
    }`);
  const result = await generatePluginCss(
    'article { @apply col-count-2 col-width-sm col-rule-tailwind col-rule-width-sm col-rule-dotted; }'
  );

  expect(result).toBe(expected);
});

it('checks if applies col-rule-span utility', async () => {
  const expected = await format(`
    article {
      column-count: 2;
      column-rule-color: ${testConfig.theme.colRuleColor.tailwind};
      column-rule-style: dotted;
      column-rule-width: ${testConfig.theme.colRuleWidth.sm};
      column-width: ${testConfig.theme.colWidth.sm};
    }
    h1 {
      column-span: all;
    }
  `);
  const result = await generatePluginCss(`
    article { @apply col-count-2 col-width-sm col-rule-tailwind col-rule-width-sm col-rule-dotted; }
    h1 { @apply col-span-all; }
  `);

  expect(result).toBe(expected);
});

it('checks if applies col-fill utility', async () => {
  const expected = await format(`
    article {
      column-count: 2;
      column-fill: balance;
      column-rule-color: ${testConfig.theme.colRuleColor.tailwind};
      column-rule-style: dotted;
      column-rule-width: ${testConfig.theme.colRuleWidth.sm};
      column-width: ${testConfig.theme.colWidth.sm};
    }
    h1 {
      column-span: all;
    }
  `);
  const result = await generatePluginCss(`
    article { @apply col-count-2 col-width-sm col-rule-tailwind col-rule-width-sm col-rule-dotted col-fill-balance; }
    h1 { @apply col-span-all; }
  `);

  expect(result).toBe(expected);
});

// ---------

it('checks if applies col-count utility - responsively', async () => {
  const expected = await format(`article {
        column-count: 2
    }
    @media (min-width: 768px) {
        article {
            column-count: 3
        }
    }`);
  const result = await generatePluginCss(
    'article { @apply col-count-2 md:col-count-3; }'
  );

  expect(result).toBe(expected);
});

it('checks if applies custom column width variant (sm)', async () => {
  const expected = await format(`
    article {
      column-count: 2;
      column-width: ${testConfig.theme.colWidth.sm};
    }
  `);
  const result = await generatePluginCss(
    'article { @apply col-count-2 col-width-sm; }'
  );

  expect(result).toBe(expected);
});
