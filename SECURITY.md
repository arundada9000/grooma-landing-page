# Security Policy

## Reporting a vulnerability

This site is a marketing site for a commercial product. We take security
seriously, including accidental exposure of data in public files or build
output.

**Please do not open a public issue for a security problem.** Report it
privately and directly to the maintainer:

- **Email:** arunneupane0000@gmail.com

Include as much of the following as you can:

- The affected pages, endpoints, or files.
- Steps to reproduce.
- The impact you believe the issue has.
- Your contact details (optional, in case we need to ask follow-up questions).

## What we ask

- Do not access, modify, or exfiltrate data beyond what is needed to
  demonstrate the vulnerability.
- Do not exploit the issue beyond reproducing it.
- Give us a reasonable amount of time to respond and fix before disclosure.

## Scope

This repository is the **marketing website** for Grooma. It is a static,
front-end-only site. Booking demos run entirely in the browser with no
backend and no real customer data. Reported issues should focus on:

- Exposure of secrets, tokens, or personal data in the repository.
- Misconfigured metadata or headers that leak information.
- Client-side injection or unsafe rendering.
- Broken authentication/authorization if any is ever added.

## Disclosure

We coordinate disclosure privately. We will acknowledge receipt within a few
days and aim to share a fix timeline as soon as we understand the issue.
