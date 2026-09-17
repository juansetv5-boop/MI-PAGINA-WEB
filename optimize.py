import os
from PIL import Image

def optimize_images(base_path):
    for root, dirs, files in os.walk(base_path):
        for file in files:
            if file.lower().endswith('.png'):
                png_path = os.path.join(root, file)
                webp_filename = os.path.splitext(file)[0] + '.webp'
                webp_path = os.path.join(root, webp_filename)
                
                try:
                    img = Image.open(png_path)
                    img.save(webp_path, 'webp', quality=85)
                    print(f"Converted: {png_path} -> {webp_path}")
                except Exception as e:
                    print(f"Error converting {png_path}: {e}")
                    
                try:
                    os.remove(png_path)
                    print(f"Deleted: {png_path}")
                except Exception as e:
                    print(f"Error deleting {png_path}: {e}")

if __name__ == '__main__':
    frames_dir = os.path.join('public', 'frames')
    optimize_images(frames_dir)
