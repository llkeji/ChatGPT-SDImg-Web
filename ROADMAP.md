# Roadmap

This roadmap tracks maintenance work that improves reliability, security, and self-hosting quality.

## Security

- Document required and optional environment variables.
- Review API key handling and prevent accidental key exposure in logs or client code.
- Review authentication, access code, quota, credit, and recharge paths.
- Audit server routes that proxy OpenAI or Stable Diffusion WebUI requests.
- Review Docker, Vercel, and third-party deployment instructions.

## Maintenance

- Keep dependency upgrades small and reviewable.
- Add regression checks for key user flows.
- Improve issue templates so reports include deployment method and logs.
- Keep README deployment instructions aligned with the current code.

## Documentation

- Add a deployment safety checklist.
- Clarify the difference between local development and production deployment.
- Improve troubleshooting docs for API base URL, proxy, and Stable Diffusion WebUI integration.
- Keep screenshots and demo links current when UI behavior changes.
