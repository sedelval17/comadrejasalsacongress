"""Create browser-compatible delivery copies; preserve the original video unchanged."""
from pathlib import Path
import json
import subprocess
import imageio_ffmpeg

binary = imageio_ffmpeg.get_ffmpeg_exe()
source = Path('public/assets/original/assets-video-resumen-congreso.mp4')
output = Path('public/assets/video')
output.mkdir(parents=True, exist_ok=True)
# Original: H.264 High 10, 10-bit HLG. Tone-map to SDR for ordinary web playback.
filters = 'zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,tonemap=tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,format=yuv420p,fps=30'
commands = [
    [binary, '-y', '-i', str(source), '-vf', filters, '-c:v', 'libx264', '-profile:v', 'main', '-crf', '22', '-preset', 'medium', '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', str(output / 'resumen-congreso.mp4')],
    [binary, '-y', '-i', str(source), '-vf', filters, '-c:v', 'libvpx-vp9', '-crf', '33', '-b:v', '0', '-deadline', 'good', '-cpu-used', '4', '-c:a', 'libopus', '-b:a', '80k', str(output / 'resumen-congreso.webm')],
]
for command in commands:
    subprocess.run(command, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
report = {
    'source': str(source),
    'originalCodec': 'H.264 High 10 / yuv420p10le / HLG BT.2020; AAC',
    'durationSeconds': 24.22,
    'width': 406,
    'height': 720,
    'delivery': [{'file': str(path), 'bytes': path.stat().st_size} for path in output.iterdir()],
    'processing': 'Same footage and audio; HLG to SDR tone mapping, 30 fps, H.264 Main 8-bit + VP9 WebM delivery copies. No invented frames or content.',
}
Path('research/video-optimization.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
print(json.dumps(report, ensure_ascii=False, indent=2))
