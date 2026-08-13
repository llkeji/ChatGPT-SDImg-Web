# Security Policy

## Scope

Security work for this repository focuses on the public code, deployment templates, and documented self-hosting flow for ChatGPT SDImg Web.

Important surfaces include:

- OpenAI API key and organization configuration.
- User authentication, access code, quota, credit, and recharge logic.
- Server routes that proxy OpenAI or Stable Diffusion WebUI requests.
- Docker, Vercel, and other deployment configuration.
- Third-party dependencies, scripts, and pull requests.

## Reporting a Vulnerability

Please do not open a public issue with secrets, tokens, cookies, private logs, or working exploit details.

For security issues, contact the maintainer through GitHub or the contact channel listed on the maintainer profile. Include:

- Affected version, commit, or deployment method.
- Clear reproduction steps.
- Expected impact.
- Minimal logs or screenshots with secrets removed.

The maintainer will triage reproducible reports and prioritize fixes for issues that can expose user data, API keys, billing resources, authentication state, or server-side execution paths.

## Maintainer Checklist

Before merging security-sensitive changes, check:

- No API key, token, cookie, private URL, or production log is committed.
- Auth and quota checks are enforced on server-side paths, not only in UI code.
- External API base URLs and proxy settings cannot be abused to reach unintended internal services.
- Dependency and Docker changes are reviewed for supply-chain risk.
- Documentation clearly warns users about environment variables and third-party deployment platforms.
