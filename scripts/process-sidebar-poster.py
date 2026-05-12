from collections import deque
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "image.png"
OUT = ROOT / "public" / "assets" / "sidebar-cupmate-poster.png"


def is_checker_pixel(pixel):
    r, g, b = pixel[:3]
    return max(r, g, b) > 218 and max(r, g, b) - min(r, g, b) < 18


def remove_edge_checker_background(image):
    image = image.convert("RGBA")
    pixels = image.load()
    width, height = image.size
    seen = bytearray(width * height)
    queue = deque()

    def add(x, y):
        if x < 0 or y < 0 or x >= width or y >= height:
            return
        index = y * width + x
        if seen[index]:
            return
        if is_checker_pixel(pixels[x, y]):
            seen[index] = 1
            queue.append((x, y))

    for x in range(width):
        add(x, 0)
        add(x, height - 1)
    for y in range(height):
        add(0, y)
        add(width - 1, y)

    while queue:
        x, y = queue.popleft()
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            add(nx, ny)

    for y in range(height):
        for x in range(width):
            if seen[y * width + x]:
                pixels[x, y] = (0, 0, 0, 0)

    return image


def make_background(size):
    width, height = size
    bg = Image.new("RGBA", size, (3, 16, 35, 255))
    draw = ImageDraw.Draw(bg, "RGBA")

    for y in range(height):
        t = y / max(1, height - 1)
        r = int(3 + 4 * (1 - abs(t - 0.48)))
        g = int(17 + 16 * (1 - abs(t - 0.52)))
        b = int(37 + 28 * (1 - abs(t - 0.5)))
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))

    glow = Image.new("RGBA", size, (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow, "RGBA")
    glow_draw.ellipse((width * 0.05, height * 0.70, width * 0.95, height * 1.05), fill=(48, 119, 206, 82))
    glow_draw.ellipse((width * 0.18, height * 0.76, width * 0.82, height * 0.98), fill=(247, 188, 92, 48))
    glow = glow.filter(ImageFilter.GaussianBlur(34))
    bg.alpha_composite(glow)

    return bg


def main():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    source = Image.open(SOURCE)
    cutout = remove_edge_checker_background(source)
    background = make_background(cutout.size)
    background.alpha_composite(cutout)
    background.save(OUT)
    print(OUT)


if __name__ == "__main__":
    main()
