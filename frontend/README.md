# React + TypeScript + Vite

## Hande High SEO

The production site has page titles and metadata, canonical URLs, structured data, `robots.txt`, and a sitemap. The production build runs `npm run seo` before building to regenerate `public/sitemap.xml` and `public/robots.txt`; set `VITE_SITE_URL` and `VITE_API_URL` in Vercel's build environment so sitemap URLs and published news are generated from production settings.

To request discovery, verify `www.handehigh.co.zw` in Google Search Console and submit `https://www.handehigh.co.zw/sitemap.xml`. This helps Google find the pages but cannot guarantee or immediately cause indexing or search rankings.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
