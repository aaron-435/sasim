"""Collect short-form metrics for one TikTok account (see marketing/shortform-framework.md).

usage: python3 -I collect.py <group> <handle> [--list 300] [--top 10] [--recent 10]

Picks the top-N videos by views among the latest --list videos plus the latest --recent,
downloads each into the scratchpad, transcribes it, counts cuts, saves 4 frames,
and appends one row per video to marketing/shortform/data/videos_raw.csv.
"""
import argparse, csv, json, os, statistics, subprocess, sys, time

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "..", "data")
DL = os.environ.get("SHORTFORM_DL", os.path.expanduser("~/.cache/shortform_dl"))
WHISPER_MODEL = os.path.expanduser("~/.local/share/whisper-models/ggml-small.bin")
SCENEDETECT = os.path.expanduser("~/.local/share/shortform-venv/bin/scenedetect")

FIELDS = ["group", "account", "platform", "url", "id", "pick", "upload_date", "duration",
          "views", "likes", "comments", "shares", "saves", "account_median", "outlier_x",
          "share_rate", "save_rate", "comment_rate", "like_rate", "track", "artist",
          "description", "cuts", "cuts_per_sec", "transcript_lang", "transcript"]


def run(cmd, **kw):
    return subprocess.run(cmd, capture_output=True, text=True, **kw)


def list_account(handle, n):
    # TikTok intermittently returns an empty list, so retry before giving up
    for attempt in range(4):
        r = run(["yt-dlp", "--flat-playlist", "-J", "--sleep-requests", "1", "-I", f"1:{n}",
                 f"https://www.tiktok.com/@{handle}"])
        if r.returncode == 0:
            entries = [e for e in json.loads(r.stdout).get("entries", []) if e.get("view_count") is not None]
            if entries:
                return entries
        time.sleep(20 * (attempt + 1))
    sys.exit(f"list failed for @{handle}: {r.stderr.strip()[-300:]}")


def transcribe(wav):
    r = run(["whisper-cli", "-m", WHISPER_MODEL, "-f", wav, "-l", "auto", "-nt"])
    lang = ""
    for line in r.stderr.splitlines():
        if "auto-detected language:" in line:
            lang = line.split("auto-detected language:")[1].split()[0]
    return lang, " ".join(r.stdout.split())


def count_cuts(mp4, outdir):
    run([SCENEDETECT, "-q", "-i", mp4, "-o", outdir, "detect-content", "list-scenes", "-f", "scenes.csv"])
    path = os.path.join(outdir, "scenes.csv")
    if not os.path.exists(path):
        return 1
    with open(path) as f:
        rows = list(csv.reader(f))
    # first line is the timecode list, second the header
    return max(1, len(rows) - 2)


def frames(mp4, outdir, duration):
    for t in [0, 1, 2, 3, max(0, (duration or 4) - 1.5)]:
        name = "end" if t not in (0, 1, 2, 3) else f"{t}s"
        run(["ffmpeg", "-loglevel", "error", "-y", "-ss", str(t), "-i", mp4, "-frames:v", "1",
             "-vf", "scale=360:-2", os.path.join(outdir, f"frame_{name}.jpg")])


def rate(a, b):
    return round(a / b * 100, 3) if a is not None and b else ""


def refetch_frames(groups):
    # frames live outside the repo; rebuild them for rows already in the CSV
    with open(os.path.join(DATA, "videos_raw.csv")) as f:
        rows = [r for r in csv.DictReader(f) if r["group"] in groups]
    for r in rows:
        vdir = os.path.join(DL, r["account"], r["id"])
        if os.path.exists(os.path.join(vdir, "frame_0s.jpg")):
            continue
        os.makedirs(vdir, exist_ok=True)
        mp4 = os.path.join(vdir, "v.mp4")
        run(["yt-dlp", "-q", "--sleep-requests", "1", "-f", "best[height<=720]/best",
             "-o", os.path.join(vdir, "v.%(ext)s"), r["url"]])
        if os.path.exists(mp4):
            frames(mp4, vdir, float(r["duration"] or 4))
            os.remove(mp4)
            print(f"frames {r['account']} {r['id']}")
        else:
            print(f"no video {r['id']}", file=sys.stderr)


def main():
    if len(sys.argv) > 2 and sys.argv[1] == "--refetch-frames":
        return refetch_frames(sys.argv[2:])
    ap = argparse.ArgumentParser()
    ap.add_argument("group"); ap.add_argument("handle")
    ap.add_argument("--list", type=int, default=300)
    ap.add_argument("--top", type=int, default=10)
    ap.add_argument("--recent", type=int, default=10)
    a = ap.parse_args()

    entries = list_account(a.handle, a.list)
    if not entries:
        sys.exit(f"@{a.handle}: no videos with view counts")
    median = statistics.median(e["view_count"] for e in entries[:20])
    picks = {}
    for e in entries[:a.recent]:
        picks[e["id"]] = "recent"
    for e in sorted(entries, key=lambda e: -e["view_count"])[:a.top]:
        picks[e["id"]] = "top+recent" if e["id"] in picks else "top"

    os.makedirs(DATA, exist_ok=True)
    out = os.path.join(DATA, "videos_raw.csv")
    new = not os.path.exists(out)
    done = set()
    if not new:
        with open(out) as f:
            done = {r["id"] for r in csv.DictReader(f)}
    with open(out, "a", newline="") as f:
        w = csv.DictWriter(f, fieldnames=FIELDS)
        if new:
            w.writeheader()
        for vid, pick in picks.items():
            if vid in done:
                continue
            url = f"https://www.tiktok.com/@{a.handle}/video/{vid}"
            vdir = os.path.join(DL, a.handle, vid)
            os.makedirs(vdir, exist_ok=True)
            mp4 = os.path.join(vdir, "v.mp4")
            r = run(["yt-dlp", "-q", "--sleep-requests", "1", "-f", "best[height<=720]/best",
                     "--write-info-json", "-o", os.path.join(vdir, "v.%(ext)s"), url])
            info_path = os.path.join(vdir, "v.info.json")
            if not os.path.exists(info_path):
                print(f"skip {vid}: {r.stderr.strip()[-200:]}", file=sys.stderr)
                continue
            d = json.load(open(info_path))
            lang, text, cuts = "", "", ""
            if os.path.exists(mp4):
                wav = os.path.join(vdir, "a.wav")
                run(["ffmpeg", "-loglevel", "error", "-y", "-i", mp4, "-ar", "16000", "-ac", "1", wav])
                if os.path.exists(wav):
                    lang, text = transcribe(wav)
                cuts = count_cuts(mp4, vdir)
                frames(mp4, vdir, d.get("duration"))
            views = d.get("view_count")
            dur = d.get("duration")
            w.writerow({
                "group": a.group, "account": a.handle, "platform": "tiktok", "url": url, "id": vid,
                "pick": pick, "upload_date": d.get("upload_date"), "duration": dur,
                "views": views, "likes": d.get("like_count"), "comments": d.get("comment_count"),
                "shares": d.get("repost_count"), "saves": d.get("save_count"),
                "account_median": median, "outlier_x": round(views / median, 1) if views and median else "",
                "share_rate": rate(d.get("repost_count"), views), "save_rate": rate(d.get("save_count"), views),
                "comment_rate": rate(d.get("comment_count"), views), "like_rate": rate(d.get("like_count"), views),
                "track": d.get("track"), "artist": d.get("artist"),
                "description": (d.get("description") or "").replace("\n", " ")[:300],
                "cuts": cuts, "cuts_per_sec": round(cuts / dur, 2) if cuts and dur else "",
                "transcript_lang": lang, "transcript": text[:1500],
            })
            f.flush()
            print(f"ok {a.handle} {vid} {pick} views={views}")
            os.remove(mp4) if os.path.exists(mp4) else None
            if os.path.exists(os.path.join(vdir, "a.wav")):
                os.remove(os.path.join(vdir, "a.wav"))


if __name__ == "__main__":
    main()
