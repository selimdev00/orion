# Product

## Register

brand

## Users

Engineering hiring managers and senior developers reviewing a portfolio. They land on Orion for under a minute, skim for craft, and decide whether the author can build a real interface. Secondary: spaceflight enthusiasts browsing SpaceX launch history. Context: desktop during review, phone when shared in a chat. They have seen a thousand dark-gradient SaaS clones today.

## Product Purpose

Orion is a browsable archive of every SpaceX launch built on the public SpaceX API v4. It exists as a portfolio showpiece: the design IS the product. Success is a reviewer pausing because the interface does not look generated, then noticing the data work underneath (server components, ISR, URL-driven filtering, real edge cases handled).

## Brand Personality

Precise, technical, archival. Three words: instrument, ledger, document. The voice of a flight log or a NASA press kit, not a marketing site. Confidence through restraint and accuracy, never hype. It should feel printed and engineered, like something measured rather than styled.

## Anti-references

- Generic dark SaaS: navy/black background, blue-to-purple gradient text, glowing cards, hero-metric template. This is exactly what Orion looked like before and exactly what it must never look like again.
- Crypto / "space tech" neon-on-black cliche.
- Vercel/Linear dark-clone aesthetic and glassmorphism.
- Identical card grids repeated down the page.

## Design Principles

1. Document, do not decorate. Every surface reads like a record: ruled, labeled, dated. Ornament that does not carry data is removed.
2. Data is monospaced and tabular. Numbers, IDs, dates, counts align in a mono face so the eye can scan columns. Prose stays in the sans.
3. Escape the category reflex. Space does not mean dark. Orion is warm light paper so it reads as an archive, not a planetarium.
4. One signal color. Launch-orange marks state and action only. It is never decorative and never a gradient.
5. Honest edge cases. Empty results, failed fetches, missing patches, aborted missions all get designed states, because handling them well is the actual portfolio proof.

## Accessibility & Inclusion

WCAG AA contrast on all text and state colors against paper. Full keyboard navigation and visible focus rings. All motion (count-ups, reveals, any orbit/starfield motion that survives) guarded by `prefers-reduced-motion`. Status communicated by label plus shape, never color alone. Mobile layouts collapse ledger tables to readable stacked rows.
