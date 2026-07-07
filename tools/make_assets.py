from pathlib import Path
from urllib.request import Request, urlopen
import math
import random

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
ASSET_DIR = ROOT / "assets"
COVER_DIR = ASSET_DIR / "covers"


COVERS = [
    {
        "slug": "joji-sanctuary",
        "url": "https://i1.sndcdn.com/artworks-u4KFkZQwtRYA-0-t1080x1080.jpg",
    },
    {
        "slug": "joji-die-for-you",
        "url": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/d0/2a/43/d02a433a-3ab8-9a94-b07d-1dc599b64966/93624864387.jpg/600x600bb.jpg",
    },
    {
        "slug": "black-skirts-king-of-hurts",
        "url": "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/f6/b2/8a/f6b28a81-b90d-9ff0-0aba-c8f953cd5503/99.jpg/600x600bb.jpg",
    },
    {
        "slug": "frank-ocean-seigfried",
        "url": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/bb/45/68/bb4568f3-68cd-619d-fbcb-4e179916545d/BlondCover-Final.jpg/600x600bb.jpg",
    },
    {
        "slug": "jaurim-i-am-sorry-i-hate-you",
        "url": "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/31/21/2d/31212d86-d1c7-98bc-8387-51441e12bf9f/Lovers.jpg/600x600bb.jpg",
    },
    {
        "slug": "amy-winehouse-love-is-a-losing-game",
        "url": "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/5a/72/3f/5a723fec-965d-3483-89f8-d66b79f88419/15UMGIM24224.rgb.jpg/600x600bb.jpg",
    },
    {
        "slug": "whys-young-dimension-theory",
        "url": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/29/48/79/29487927-cebd-fc67-4ac0-1f044a71e836/5021732875167.jpg/600x600bb.jpg",
    },
    {
        "slug": "cigarettes-after-sex-k",
        "url": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/b3/5e/0f/b35e0fbe-2370-fc48-0f0c-977525e93bf2/720841214601_Cover.jpg/600x600bb.jpg",
    },
]


def clamp(value):
    return max(0, min(255, int(value)))


def download_image(url):
    request = Request(url, headers={"User-Agent": "music-web-artwork-fetcher/1.0"})
    with urlopen(request, timeout=30) as response:
        return Image.open(response).convert("RGB")


def save_cover(slug, url):
    image = download_image(url)
    size = 72
    image.thumbnail((size, size), Image.Resampling.BILINEAR)
    canvas = Image.new("RGB", (size, size), (8, 7, 6))
    x = (size - image.width) // 2
    y = (size - image.height) // 2
    canvas.paste(image, (x, y))
    canvas = canvas.quantize(colors=18).convert("RGB")
    canvas.save(COVER_DIR / f"{slug}.webp", format="WEBP", quality=18, method=6)


def make_noise_assets():
    random.seed(729)
    noise = Image.new("RGBA", (48, 48), (0, 0, 0, 0))
    pixels = noise.load()
    for y in range(48):
        for x in range(48):
            v = random.randint(0, 255)
            pixels[x, y] = (v, v, v, random.randint(24, 70))
    noise.save(ASSET_DIR / "paper-noise.png", optimize=True)

    floor_size = 640
    floor = Image.new("RGB", (floor_size, floor_size), (26, 18, 14))
    pixels = floor.load()

    seams = [0]
    while seams[-1] < floor_size:
        seams.append(seams[-1] + random.randrange(38, 76))

    plank = 0
    for x in range(floor_size):
        while plank + 1 < len(seams) and x >= seams[plank + 1]:
            plank += 1

        left_gap = x - seams[plank]
        right_gap = seams[plank + 1] - x if plank + 1 < len(seams) else floor_size
        seam = -27 if min(left_gap, right_gap) < random.choice((1, 2, 3)) else 0
        base = 24 + (plank % 3) * 5 + random.randint(-3, 3)

        for y in range(floor_size):
            grain = random.randint(-19, 16) + random.randint(-4, 4)
            if random.random() < 0.02:
                grain -= random.randint(12, 35)
            pixels[x, y] = (
                clamp(base + grain + seam),
                clamp(22 + grain // 2 + seam),
                clamp(16 + grain // 3 + seam),
            )

    for _ in range(82):
        cx = random.randrange(-80, floor_size + 80)
        cy = random.randrange(-60, floor_size + 60)
        rx = random.randrange(18, 165)
        ry = random.randrange(10, 104)
        angle = random.uniform(-1.35, 1.35)
        ca = math.cos(angle)
        sa = math.sin(angle)
        stain = random.choice([(4, 8, 6), (52, 18, 12), (11, 22, 17), (76, 58, 28), (0, 0, 0)])

        for y in range(max(0, cy - rx - ry), min(floor_size, cy + rx + ry)):
            for x in range(max(0, cx - rx - ry), min(floor_size, cx + rx + ry)):
                dx = x - cx
                dy = y - cy
                px = (dx * ca + dy * sa) / rx
                py = (-dx * sa + dy * ca) / ry
                edge = 1 + 0.18 * math.sin(x * 0.071 + y * 0.043 + cx)
                blot = px * px + py * py
                if blot < edge + random.uniform(-0.18, 0.12):
                    old = pixels[x, y]
                    mix = random.uniform(0.08, 0.44) * max(0.24, 1 - blot * 0.52)
                    pixels[x, y] = tuple(clamp(old[i] * (1 - mix) + stain[i] * mix) for i in range(3))

    for _ in range(140):
        x = random.randrange(floor_size)
        y = random.randrange(floor_size)
        length = random.randrange(14, 150)
        drift = random.choice((-1, 0, 1))
        for step in range(length):
            px = x + step
            py = y + drift * step // random.randrange(18, 42)
            if 0 <= px < floor_size and 0 <= py < floor_size:
                old = pixels[px, py]
                amount = random.uniform(0.45, 0.82)
                pixels[px, py] = tuple(clamp(channel * amount) for channel in old)

    floor.save(ASSET_DIR / "floor-board.webp", format="WEBP", quality=28, method=6)


def main():
    ASSET_DIR.mkdir(exist_ok=True)
    COVER_DIR.mkdir(parents=True, exist_ok=True)
    for old_cover in COVER_DIR.glob("*"):
        old_cover.unlink()
    for cover in COVERS:
        save_cover(cover["slug"], cover["url"])
    make_noise_assets()


if __name__ == "__main__":
    main()
