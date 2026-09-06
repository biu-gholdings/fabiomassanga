#!/usr/bin/env python3
"""
Generate branded 1200x630 Open Graph cards for fabiomassanga.com.

Each card is a cover-cropped photograph under a directional scrim, with the
editorial furniture of the site laid over it: gold eyebrow, Didot headline,
a hairline rule, and the wordmark. Run from the repo root:

    python3 tools/make-og-cards.py

Output: assets/og/*.jpg
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import os

W, H = 1200, 630
OUT = "assets/og"

GOLD       = (201, 166, 66)
GOLD_SOFT  = (230, 207, 138)
PAPER      = (250, 248, 243)
MUTED      = (176, 170, 155)

DIDOT   = "/System/Library/Fonts/Supplemental/Didot.ttc"
HELV    = "/System/Library/Fonts/HelveticaNeue.ttc"

def serif(size, bold=False):
    return ImageFont.truetype(DIDOT, size, index=2 if bold else 0)

def sans(size, weight="medium"):
    idx = {"regular": 0, "bold": 1, "light": 7, "medium": 10}[weight]
    return ImageFont.truetype(HELV, size, index=idx)


def cover(path, w, h):
    """Resize + centre-crop to exactly w x h, preserving aspect ratio."""
    im = Image.open(path).convert("RGB")
    scale = max(w / im.width, h / im.height)
    im = im.resize((max(1, round(im.width * scale)), max(1, round(im.height * scale))),
                   Image.LANCZOS)
    left = (im.width - w) // 2
    top = (im.height - h) // 2
    im = im.crop((left, top, left + w, top + h))
    im = ImageEnhance.Brightness(im).enhance(1.18)
    im = ImageEnhance.Contrast(im).enhance(1.04)
    return im


def scrim(img, focus="left"):
    """Darken the image so overlaid type stays legible on any photograph."""
    grad = Image.new("L", (W, H), 0)
    px = grad.load()
    for x in range(W):
        t = x / (W - 1)
        if focus == "left":
            a = 238 - 196 * (t ** 0.80)        # dense left, open right
        else:
            a = 150 + 40 * (1 - abs(0.5 - t) * 2)
        for y in range(H):
            # a touch more weight at the very bottom, where the rule sits
            px[x, y] = int(min(250, a + 26 * (y / (H - 1)) ** 2))
    black = Image.new("RGB", (W, H), (8, 8, 7))
    return Image.composite(black, img, grad.filter(ImageFilter.GaussianBlur(2)))


def tracked(draw, xy, text, font, fill, tracking=0):
    """Draw text with letter-spacing (Pillow has no native tracking)."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking
    return x


def tracked_width(draw, text, font, tracking=0):
    return sum(draw.textlength(c, font=font) for c in text) + tracking * max(0, len(text) - 1)


def wrap(draw, text, font, max_w):
    words, lines, cur = text.split(), [], ""
    for wd in words:
        trial = (cur + " " + wd).strip()
        if draw.textlength(trial, font=font) <= max_w or not cur:
            cur = trial
        else:
            lines.append(cur)
            cur = wd
    if cur:
        lines.append(cur)
    return lines


def card(photo, eyebrow, title, kicker, out, focus="left", title_size=60):
    img = scrim(cover(photo, W, H), focus)
    d = ImageDraw.Draw(img)

    PAD = 74
    MAXW = 660

    # ---- eyebrow ----
    f_eye = sans(17, "medium")
    tracked(d, (PAD, 92), eyebrow.upper(), f_eye, GOLD, tracking=3.4)

    # ---- headline ----
    f_t = serif(title_size)
    lines = wrap(d, title, f_t, MAXW)
    while len(lines) > 4 and title_size > 40:
        title_size -= 4
        f_t = serif(title_size)
        lines = wrap(d, title, f_t, MAXW)

    lh = int(title_size * 1.16)
    block_h = lh * len(lines)
    y = 92 + 34 + max(24, (H - 300 - block_h) // 2)
    for ln in lines:
        d.text((PAD, y), ln, font=f_t, fill=PAPER)
        y += lh

    # ---- hairline + wordmark ----
    rule_y = H - 128
    d.line([(PAD, rule_y), (PAD + 92, rule_y)], fill=GOLD, width=2)

    f_name = sans(19, "bold")
    tracked(d, (PAD, rule_y + 26), "FÁBIO G. MASSANGA", f_name, PAPER, tracking=2.6)

    if kicker:
        f_k = sans(16, "regular")
        d.text((PAD, rule_y + 58), kicker, font=f_k, fill=MUTED)

    # ---- domain, bottom right ----
    f_dom = sans(16, "medium")
    dom = "fabiomassanga.com"
    dw = tracked_width(d, dom, f_dom, 1.6)
    tracked(d, (W - PAD - dw, rule_y + 26), dom, f_dom, GOLD_SOFT, tracking=1.6)

    os.makedirs(OUT, exist_ok=True)
    img.save(f"{OUT}/{out}.jpg", "JPEG", quality=86, optimize=True, progressive=True)
    print(f"  {OUT}/{out}.jpg")


CARDS = [
    # photo, eyebrow, title, kicker, output
    ("assets/hero-main.png", "Founder & CEO · Cubeshackles",
     "Sovereign financial infrastructure for Angola",
     "Cubeshackles · Biu-g Holdings · BIU.G Academy", "og-home"),

    ("assets/headshot.png", "Biography",
     "Building the systems that make capital work",
     "Founder & CEO, Cubeshackles", "og-biography"),

    ("assets/images-portrait-office.jpg", "Media",
     "Press, appearances & official materials",
     "Media resources", "og-media"),

    ("assets/images-portrait-1.png", "Images",
     "Official photography & portraits",
     "For press and editorial use", "og-images"),

    ("assets/images-luanda-bay.png", "Portfolio",
     "Cubecoin — a sovereign digital asset for Angola",
     "Identity-linked transactions at institutional scale", "og-cubecoin"),

    ("assets/article-angola-build.png", "Writing & Perspectives",
     "Articles on Angola's economic infrastructure",
     "Essays by Fábio G. Massanga", "og-articles"),

    ("assets/images-portrait-office.jpg", "Perspectiva Económica",
     "Inteligência Artificial como Infraestrutura Nacional de Produtividade",
     "Conhecimento como produtividade nacional", "og-article-ia"),

    ("assets/images-luanda-bay.png", "Perspectiva Económica",
     "O Próximo Ciclo Económico de Angola",
     "Infraestrutura, coordenação e alavancagem", "og-article-ciclo"),

    ("assets/images-portrait-2.png", "Living Gallery",
     "FábioArt — portraits & creative work",
     "Meant to be spread everywhere", "og-fabioart"),
]

if __name__ == "__main__":
    print("Generating Open Graph cards…")
    for photo, eyebrow, title, kicker, out in CARDS:
        card(photo, eyebrow, title, kicker, out)
    print("Done.")
