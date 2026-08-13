# Contributing

Thanks for helping improve ChatGPT SDImg Web.

## Good Contributions

Useful contributions include:

- Reproducible bug reports with deployment method, browser, logs, and screenshots.
- Fixes for authentication, quota, API proxy, deployment, or documentation issues.
- Security hardening for API keys, server routes, dependencies, and Docker/Vercel configuration.
- Documentation improvements for self-hosting and environment variables.

## Pull Request Guidelines

Before opening a PR:

1. Keep the change focused.
2. Explain the user-facing behavior or maintenance problem being fixed.
3. Avoid adding third-party deployment buttons, analytics, scripts, or external services unless the maintainer has verified and approved the provider.
4. Do not include secrets, tokens, cookies, private endpoints, or production logs.
5. For security-sensitive changes, describe the attack surface and the control being added or changed.

## Local Development

```bash
yarn install
yarn dev
```

For production-like validation:

```bash
yarn build
yarn start
```

Configure environment variables using `.env.template` as a reference.

## Issue Triage

Issues may be closed when they do not include enough information to reproduce, are unrelated to this repository, or request unsupported private customization work. Please use GitHub Issues for trackable project maintenance.
