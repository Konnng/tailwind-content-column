# @konnng/tailwind-content-column

A plugin that provides support to content columns on Tailwind.

Supports the following CSS Properties:

- https://developer.mozilla.org/en-US/docs/Web/CSS/column-count
- https://developer.mozilla.org/en-US/docs/Web/CSS/column-fill
- https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap
- https://developer.mozilla.org/en-US/docs/Web/CSS/column-rule-color
- https://developer.mozilla.org/en-US/docs/Web/CSS/column-rule-style
- https://developer.mozilla.org/en-US/docs/Web/CSS/column-rule-width
- https://developer.mozilla.org/en-US/docs/Web/CSS/column-span
- https://developer.mozilla.org/en-US/docs/Web/CSS/column-width

## Installation

Install the plugin from npm:

```sh
npm install -D @konnng/tailwind-content-column
```

Then add the plugin to your `tailwind.config.js` file.

```js
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      // ...
    },
  },
  plugins: [
    require('@konnng/tailwind-content-column'),
    // ...
  ],
};
```

### Available utilities

| Utility            | CSS property                  | Description                                                                                       |
| ------------------ | ----------------------------- | ------------------------------------------------------------------------------------------------- |
| `col-count-[SIZE]` | `column-count: [SIZE];`       | Sizes from tailwind column config                                                                 |
| `col-fill-[VALUE]` | `column-fill: [VALUE];`       | Available values [doc](https://developer.mozilla.org/en-US/docs/Web/CSS/column-fill#syntax)       |
| `col-gap-[SIZE]`   | `column-gap: [SIZE];`         | Sizes from tailwind gap config                                                                    |
| `col-rule-[COLOR]` | `column-rule-color: [COLOR];` | Colors from tailwind color config                                                                 |
| `col-rule-[STYLE]` | `column-rule-style: [STYLE];` | Available styles [doc](https://developer.mozilla.org/en-US/docs/Web/CSS/column-rule-style#syntax) |
| `col-rule-[SIZE]`  | `column-rule-width: [SIZE];`  | sizes from tailwind border config                                                                 |
| `col-span-[VALUE]` | `column-span: [VALUE];`       | Available values [doc](https://developer.mozilla.org/en-US/docs/Web/CSS/column-span#syntax)       |
| `col-width-[SIZE]` | `column-width: [SIZE];`       | Sizes from tailwind width config                                                                  |

## Usage

Set content column to 2 and with a gap between columns.

```html
<p class="col-count-2 col-gap-4">
  This is a bunch of text split into two columns using the CSS
  <code>column-count</code>
  property. The text is equally distributed over the columns.
</p>
```
