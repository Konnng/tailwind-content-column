const plugin = require('tailwindcss/plugin');
const resolveCfg = require('tailwindcss/resolveConfig');
const kebabCase = require('lodash/kebabCase');
const isPlainObject = require('lodash/isPlainObject');

const { theme: defaultTheme } = resolveCfg({});

const defaultConfig = {
  colCount: {
    ...defaultTheme.columns,
  },
  colFill: {
    auto: 'auto',
    balance: 'balance',
    'balance-all': 'balance-all',
    inherit: 'inherit',
    initial: 'initial',
    revert: 'revert',
    'revert-layer': 'revert-layer',
    unset: 'unset',
  },
  colGap: {
    ...defaultTheme.gap,
  },
  colRuleColor: {
    ...defaultTheme.borderColor,
  },
  colRuleStyle: {
    none: 'none',
    hidden: 'hidden',
    dotted: 'dotted',
    dashed: 'dashed',
    solid: 'solid',
    double: 'double',
    groove: 'groove',
    ridge: 'ridge',
    inset: 'inset',
    outset: 'outset',
    inherit: 'inherit',
    initial: 'initial',
    revert: 'revert',
    'revert-layer': 'revert-layer',
    unset: 'unset',
  },
  colRuleWidth: {
    ...defaultTheme.borderWidth,
  },
  colSpan: {
    none: 'none',
    all: 'all',
    inherit: 'inherit',
    initial: 'initial',
    revert: 'revert',
    'revert-layer': 'revert-layer',
    unset: 'unset',
  },
  colWidth: {
    ...defaultTheme.width,
  },
};

const generateCSSProperty = (property) => {
  return property.replace('col', 'column');
};

const contentColumnPlugin = plugin(
  ({ addUtilities, e, prefix, theme, variants }) => {
    const utilities = [];

    const prefixStr = prefix('.').replace(/^\./, '');

    const generateClassName = (property, key, variant = null) => {
      const parsedProperty = kebabCase(property).replace(/color|style/, '');

      let className = `${kebabCase(parsedProperty)}-${key}`;
      if (variant) {
        className += `-${variant}`;
      }

      return `.${e(`${prefixStr}${className}`)}`;
    };

    Object.keys(defaultConfig).forEach((property) => {
      const values = theme(property);

      Object.entries(values).forEach(([key, value]) => {
        if (isPlainObject(value)) {
          Object.entries(value).forEach(([k, v]) => {
            utilities.push({
              [generateClassName(property, key, k)]: {
                [property]: `${v}`,
              },
            });
          });
        } else {
          utilities.push({
            [generateClassName(property, key)]: {
              [generateCSSProperty(property)]: `${value}`,
            },
          });
        }
      });
    });

    // utilities.forEach((v) => console.log(v));

    addUtilities(utilities, ['responsive', 'hover']);
  },
  {
    theme: defaultConfig,
  }
);

module.exports = contentColumnPlugin;
