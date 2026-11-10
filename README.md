# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

## Gemini chatbot setup

Create a `.env` file in the project root and add your Gemini API key:

```env
VITE_GEMINI_API_KEY=your_api_key_here
VITE_GEMINI_MODEL=gemini-3.8-flash
# Optional: set a different model enabled for your API key as an overload fallback.
# VITE_GEMINI_FALLBACK_MODEL=your_available_fallback_model
```

FAQs load from the local defaults so opening the site does not consume Gemini quota. The app limits its own Gemini requests to five per model per minute in the current page runtime; Gemini quotas are still shared across tabs and apps using the same project. The app retries temporary 503 errors with increasing delays, then tries the optional fallback model if configured. A 503 indicates temporary model overload, while a 429 indicates a quota or rate limit; neither is fixed by adding another API key. If Gemini returns 429, wait for the quota window to reset or review the project's quota at <https://ai.dev/rate-limit>. Restart the Vite development server after changing these settings.

Vite exposes variables prefixed with `VITE_` in the browser bundle. Use this client-side setup only for local development; keep production API keys on a backend and never commit a real key.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
