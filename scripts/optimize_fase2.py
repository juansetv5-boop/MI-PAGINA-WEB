"""
optimize_fase2.py
=================
Script de optimización y conversión en lote de fotogramas para la Fase 2 del Scrollytelling.
- Entrada:  public/frames/fase2/*.png
- Salida:   public/frames/fase2/*.webp  (calidad 82%, renombrado con padding 3 dígitos)
- Los archivos .png originales se eliminan tras la conversión exitosa.
"""

import os
import sys
import time
from pathlib import Path

# ── Intentar importar Pillow ──────────────────────────────────────────────────
try:
    from PIL import Image
except ImportError:
    print("[ERROR] Pillow no está instalado. Instala con:  pip install Pillow")
    sys.exit(1)

# ── Configuración ─────────────────────────────────────────────────────────────
SCRIPT_DIR   = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
INPUT_DIR    = PROJECT_ROOT / "public" / "frames" / "fase2"
WEBP_QUALITY = 82          # Calidad WebP (80-85 según spec)
PADDING      = 3           # Dígitos de padding numérico (001, 002, …)

# ── Validar carpeta de entrada ────────────────────────────────────────────────
if not INPUT_DIR.exists():
    print(f"[ERROR] Carpeta no encontrada: {INPUT_DIR}")
    sys.exit(1)

# ── Recopilar PNGs ordenados numéricamente ────────────────────────────────────
png_files = sorted(
    [f for f in INPUT_DIR.iterdir() if f.suffix.lower() == ".png"],
    key=lambda p: int(p.stem) if p.stem.isdigit() else 0
)

if not png_files:
    print("[INFO] No se encontraron archivos .png en la carpeta de entrada.")
    sys.exit(0)

total_frames      = len(png_files)
total_input_bytes = 0
total_output_bytes = 0
converted         = 0
errors            = []

print(f"\n{'='*60}")
print(f"  Optimización Fase 2 — {total_frames} fotogramas encontrados")
print(f"  Entrada : {INPUT_DIR}")
print(f"  Calidad : {WEBP_QUALITY}%  |  Padding: {PADDING} dígitos")
print(f"{'='*60}\n")

start_time = time.time()

for idx, png_path in enumerate(png_files, start=1):
    # Nombre de salida con padding estricto: 001.webp, 002.webp, …
    out_name  = f"{idx:0{PADDING}d}.webp"
    out_path  = INPUT_DIR / out_name

    input_size = png_path.stat().st_size
    total_input_bytes += input_size

    try:
        with Image.open(png_path) as img:
            # Convertir RGBA/P a RGB si la imagen no tiene canal alfa relevante
            if img.mode in ("RGBA", "LA"):
                # Compositar sobre fondo negro para preservar transparencias
                background = Image.new("RGB", img.size, (0, 0, 0))
                background.paste(img, mask=img.split()[-1])
                img_to_save = background
            elif img.mode != "RGB":
                img_to_save = img.convert("RGB")
            else:
                img_to_save = img

            img_to_save.save(
                out_path,
                format="WEBP",
                quality=WEBP_QUALITY,
                method=6,      # Mejor compresión (0-6)
                optimize=True
            )

        output_size = out_path.stat().st_size
        total_output_bytes += output_size
        reduction = (1 - output_size / input_size) * 100

        # Eliminar PNG original tras conversión exitosa
        png_path.unlink()

        converted += 1
        print(
            f"  [{idx:>{PADDING}}/{total_frames}] "
            f"{png_path.name:12s} → {out_name}  "
            f"{input_size/1024:>7.1f} KB → {output_size/1024:>6.1f} KB  "
            f"(-{reduction:.1f}%)"
        )

    except Exception as exc:
        errors.append((png_path.name, str(exc)))
        print(f"  [ERROR] {png_path.name}: {exc}")

elapsed = time.time() - start_time

# ── Resumen final ─────────────────────────────────────────────────────────────
print(f"\n{'='*60}")
print(f"  RESULTADO FINAL")
print(f"{'='*60}")
print(f"  Fotogramas procesados : {converted} / {total_frames}")
print(f"  Peso total entrada    : {total_input_bytes / (1024*1024):.2f} MB")
print(f"  Peso total salida     : {total_output_bytes / (1024*1024):.2f} MB")
saved_mb    = (total_input_bytes - total_output_bytes) / (1024 * 1024)
saved_pct   = (1 - total_output_bytes / total_input_bytes) * 100 if total_input_bytes else 0
print(f"  Reducción total       : -{saved_mb:.2f} MB  (-{saved_pct:.1f}%)")
print(f"  Tiempo de ejecución   : {elapsed:.1f}s")
print(f"  Formato de salida     : WebP  |  Calidad: {WEBP_QUALITY}%")
if errors:
    print(f"\n  ERRORES ({len(errors)}):")
    for name, msg in errors:
        print(f"    • {name}: {msg}")
print(f"{'='*60}\n")

# ── Escribir resumen a archivo de log ────────────────────────────────────────
log_path = SCRIPT_DIR / "optimize_fase2_log.txt"
with open(log_path, "w", encoding="utf-8") as log:
    log.write(f"Optimización Fase 2 — {time.strftime('%Y-%m-%d %H:%M:%S')}\n")
    log.write(f"Fotogramas procesados : {converted} / {total_frames}\n")
    log.write(f"Peso entrada          : {total_input_bytes / (1024*1024):.2f} MB\n")
    log.write(f"Peso salida           : {total_output_bytes / (1024*1024):.2f} MB\n")
    log.write(f"Reducción             : -{saved_mb:.2f} MB (-{saved_pct:.1f}%)\n")
    log.write(f"Tiempo                : {elapsed:.1f}s\n")
    log.write(f"Calidad WebP          : {WEBP_QUALITY}%\n")
    log.write(f"Errores               : {len(errors)}\n")

print(f"  Log guardado en: {log_path}\n")
