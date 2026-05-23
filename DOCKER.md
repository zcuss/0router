# Docker

Run 0Router in a container. Published image: [`ghcr.io/zcuss/0router`](https://github.com/zcuss/0router/pkgs/container/0router) — multi-platform `linux/amd64` + `linux/arm64`.

---

# 👤 For Users

## Quick start

```bash
docker run -d \
  -p 20128:20128 \
  -v "$HOME/.0router:/app/data" \
  -e DATA_DIR=/app/data \
  --name 0router \
  ghcr.io/zcuss/0router:latest
```

App listens on port `20128`. Open: http://localhost:20128

## Manage container

```bash
docker logs -f 0router        # view logs
docker stop 0router           # stop
docker start 0router          # start again
docker rm -f 0router          # remove
```

## Data persistence

```bash
-v "$HOME/.0router:/app/data" \
-e DATA_DIR=/app/data
```

Without `DATA_DIR`, the app falls back to `~/.0router/` (macOS/Linux) or `%APPDATA%\0router\` (Windows). In the container, `DATA_DIR=/app/data` makes the bind mount work.

Data layout under `$DATA_DIR/`:

```text
$DATA_DIR/
├── db/
│   ├── data.sqlite       # main SQLite database
│   └── backups/          # auto backups
└── ...                   # certs, logs, runtime configs
```

Host path: `$HOME/.0router/db/data.sqlite`
Container path: `/app/data/db/data.sqlite`

## Optional env vars

```bash
docker run -d \
  -p 20128:20128 \
  -v "$HOME/.0router:/app/data" \
  -e DATA_DIR=/app/data \
  -e PORT=20128 \
  -e HOSTNAME=0.0.0.0 \
  -e DEBUG=true \
  --name 0router \
  ghcr.io/zcuss/0router:latest
```

## Update to latest

```bash
docker pull ghcr.io/zcuss/0router:latest
docker rm -f 0router
# re-run the quick start command
```

---

# 🛠 For Developers

## Build image locally (test)

```bash
cd app && docker build -t 0router .

docker run --rm -p 20128:20128 \
  -v "$HOME/.0router:/app/data" \
  -e DATA_DIR=/app/data \
  0router
```

## Publish (automatic via CI)

Push a git tag `v*` → GitHub Actions builds multi-platform (amd64+arm64) and pushes to:
- `ghcr.io/zcuss/0router:v{version}` + `:latest`

```bash
# Use scripts/release.js (recommended)
node scripts/release.js "Release title" "Notes"

# Or manually
git tag v0.4.x && git push origin v0.4.x
```

Workflow: `app/.github/workflows/docker-publish.yml`
