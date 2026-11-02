"""Turn a sample report PDF into page images for the /voorbeelden page.

    python scripts/samples/pdf_to_webp.py <report.pdf> <out-dir> [--pdf-as <name.pdf>]

Writes <out-dir>/p01.webp, p02.webp, ... at 1075 px wide (same as the older training samples)
and copies the PDF next to the folder when --pdf-as is given. Needs PyMuPDF + Pillow.
Prints the page count — put that in src/lib/samples.ts.
"""
import argparse, io, pathlib, shutil
import fitz
from PIL import Image

WIDTH = 1075

ap = argparse.ArgumentParser()
ap.add_argument("pdf")
ap.add_argument("out")
ap.add_argument("--pdf-as")
a = ap.parse_args()

out = pathlib.Path(a.out)
out.mkdir(parents=True, exist_ok=True)
for old in out.glob("p*.webp"):
    old.unlink()
doc = fitz.open(a.pdf)
for i, page in enumerate(doc, start=1):
    zoom = WIDTH / page.rect.width
    pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=False)
    img = Image.open(io.BytesIO(pix.tobytes("png")))
    img.save(out / f"p{i:02d}.webp", "WEBP", quality=82, method=6)
if a.pdf_as:
    shutil.copyfile(a.pdf, out.parent / a.pdf_as)
print(f"{a.pdf}: {len(doc)} pages, {img.size[0]}x{img.size[1]}")
