# fabiomassanga.com — Public Founder Repository

Official public repository for [fabiomassanga.com](https://fabiomassanga.com).

This repository publishes the public website and repository governance for **Fábio G. Massanga** — Founder of **CubeShackles** and Managing Member of **Biu-g Holdings LLC**. It is maintained as a transparent, institutional, public-facing record of biography, media, research references, and published positioning. It is not a private operations or infrastructure repository.

---

## Public Website

Live site: **https://fabiomassanga.com**

| Path | Purpose |
|------|---------|
| `/` | Home — public positioning, regulatory reference, ventures |
| `/biography/` | Biography and institutional background |
| `/media/` | Media, research, and public briefings |
| `/images/` | Public imagery and gallery entry |
| `/cubecoin/` | Cubecoin public information page |
| `/FabioArt` | Public art gallery |

Deployment is static (HTML, CSS, JavaScript, assets). No application server, database, or production credentials belong in this repository.

---

## Core Public Pages

- **Home** — founder overview, policy and compliance references, public venture links  
- **Biography** — background, thesis, and institutional context (public narrative only)  
- **Media** — articles, commentary, and public-facing briefings  
- **Images** — photography and visual materials  
- **Cubecoin** — public description and published articles (no operational or economic internals)  
- **FábioArt** — creative gallery (separate public presentation)

Supporting files: `index.html`, `style.css`, `site.js`, `assets/`, `CNAME` (custom domain for GitHub Pages).

---

## Transparency Standard

This repository is intended to:

- Present **public** biography, media, and institutional positioning  
- Link to **official external** properties (e.g. CubeShackles, BIU.G Academy) where appropriate  
- Maintain a **clear separation** between public education and private operations  
- Avoid publishing backend design, validator logic, treasury mechanics, deployment secrets, or internal governance detail  

Public copy on the site describes **what** is being built at a high level for education and accountability. It does not document **how** private systems are implemented, configured, or operated.

---

## Security Notice

- This is a **public** repository. Do not commit secrets, keys, credentials, or non-public business documents.  
- See [SECURITY.md](SECURITY.md) for reporting and scope.  
- See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution boundaries.  

If sensitive material was ever committed, rotate credentials and remove history through appropriate private channels — do not discuss operational details in public issues.

---

## Repository Hygiene Audit

The following are **recommended to move to a private repository** (or remove from public history if they were committed in error). They are listed here for transparency; **no automatic deletion** is performed by this documentation pass.

| Item | Reason |
|------|--------|
| `spec/system_guarantees.md` | Internal system guarantees and economic/observability mechanics |
| `spec/transfer_lifecycle.md` | Transfer pipeline, validation, and validator processing detail |
| `WEDGE_LOCK.md` | Internal product wedge, success criteria, and lock conditions |
| `docs/` (if populated) | Reserved for internal or draft documentation |
| Any future `internal/`, `secrets/`, `credentials/`, `private-docs/`, `legal-drafts/`, `financial-models/`, `contracts/`, `cap-table/`, `investor-materials/` | Non-public operational or legal material |
| `.env`, `*.pem`, `*.key`, certificates, logs, build artifacts | Secrets and environment-specific files (see `.gitignore`) |

**Currently present in this public tree (review recommended):** `spec/`, `WEDGE_LOCK.md`, empty `docs/`.

**Not found in this audit (good):** `internal/`, `secrets/`, `credentials/`, `private-docs/`, `legal-drafts/`, `financial-models/`, `contracts/`, `cap-table/`, `investor-materials/`, validator configs, deployment secrets.

Local-only paths (e.g. `.venv-icon/`) should remain untracked via `.gitignore`.

---

## What Remains Public (by design)

- Static website source (`*.html`, `style.css`, `site.js`)  
- Public images and logos under `assets/`  
- Domain configuration (`CNAME`)  
- This README, `SECURITY.md`, `CONTRIBUTING.md`, and `.gitignore`  

---

## Copyright

© Fábio G. Massanga. All rights reserved.

Content on fabiomassanga.com and in this repository is published for public information and transparency. Unauthorized reproduction of materials for commercial use may require permission. CubeShackles, Cubecoin, BIU.G Academy, and related names are used in their respective public contexts.

---

## Contact

General and security-related inquiries: **support@biu-gholdings.org**
