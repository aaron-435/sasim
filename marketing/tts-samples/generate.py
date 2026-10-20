#!/usr/bin/env python3
"""scripts.json의 대본을 OpenAI gpt-4o-mini-tts로 mp3로 만든다.
사용: OPENAI_API_KEY=... python3 generate.py [키 ...]  (키를 안 주면 전부)
키는 .env.local에서 읽어도 된다. 영상 설명란에 'Voiceover is AI-generated.' 표기 필수(video-kit 5장)."""
import json, os, sys, urllib.request, pathlib

here = pathlib.Path(__file__).parent
key = os.environ.get("OPENAI_API_KEY")
if not key:
    for line in (here.parent.parent / ".env.local").read_text().splitlines():
        if line.startswith("OPENAI_API_KEY="):
            key = line.split("=", 1)[1].strip().strip("\"'")
if not key:
    sys.exit("OPENAI_API_KEY 없음")

VOICE = "marin"
INSTRUCTIONS = "Calm, warm, conversational narrator for a short social video. Natural pace, clear articulation, not salesy."
scripts = json.loads((here / "scripts.json").read_text())
names = sys.argv[1:] or list(scripts)
for name in names:
    body = {"model": "gpt-4o-mini-tts", "voice": VOICE, "input": scripts[name],
            "instructions": INSTRUCTIONS, "response_format": "mp3"}
    req = urllib.request.Request("https://api.openai.com/v1/audio/speech", json.dumps(body).encode(),
                                 {"Authorization": "Bearer " + key, "Content-Type": "application/json"})
    out = here / f"{name}_openai-mini-tts_{VOICE}.mp3"
    out.write_bytes(urllib.request.urlopen(req).read())
    print("ok", out.name, len(scripts[name]), "chars")
