#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import subprocess
from datetime import datetime, timezone
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Commit generated catalog outputs in size-bounded batches.")
    parser.add_argument("--repo-root", type=Path, required=True)
    parser.add_argument("--output-dir", type=Path, required=True)
    parser.add_argument("--branch", required=True)
    parser.add_argument("--max-batch-mb", type=int, default=160)
    parser.add_argument("--max-files-per-batch", type=int, default=30)
    return parser.parse_args()


def run(command: list[str], cwd: Path, check: bool = True) -> subprocess.CompletedProcess:
    print("+", " ".join(command), flush=True)
    return subprocess.run(command, cwd=cwd, text=True, capture_output=True, check=check)


def priority(path: Path) -> tuple[int, str]:
    normalized = str(path).replace("\\", "/")
    if path.name == "README.md":
        return (0, normalized)
    if "Inventario_Mestre" in path.name:
        return (1, normalized)
    if "/data/" in f"/{normalized}":
        return (2, normalized)
    if "/qa/" in f"/{normalized}":
        return (3, normalized)
    if "/volumes/" in f"/{normalized}":
        return (5, normalized)
    return (4, normalized)


def group_files(paths: list[Path], max_bytes: int, max_files: int) -> list[list[Path]]:
    groups: list[list[Path]] = []
    current: list[Path] = []
    current_size = 0
    for path in paths:
        size = path.stat().st_size
        if current and (current_size + size > max_bytes or len(current) >= max_files):
            groups.append(current)
            current = []
            current_size = 0
        current.append(path)
        current_size += size
    if current:
        groups.append(current)
    return groups


def main() -> int:
    args = parse_args()
    repo = args.repo_root.resolve()
    output = args.output_dir.resolve()
    relative_output = output.relative_to(repo)
    run(["git", "config", "user.name", "github-actions[bot]"], repo)
    run(["git", "config", "user.email", "41898282+github-actions[bot]@users.noreply.github.com"], repo)

    # First commit deletions from a previous catalog so stale volumes cannot survive a rebuild.
    run(["git", "add", "-u", "--", str(relative_output)], repo, check=False)
    staged = run(["git", "diff", "--cached", "--quiet"], repo, check=False).returncode != 0
    commit_shas: list[str] = []
    if staged:
        run(["git", "commit", "-m", "docs: remove stale asset catalog outputs [skip ci]"], repo)
        run(["git", "push", "origin", f"HEAD:{args.branch}"], repo)
        commit_shas.append(run(["git", "rev-parse", "HEAD"], repo).stdout.strip())

    files = sorted([path for path in output.rglob("*") if path.is_file()], key=priority)
    groups = group_files(files, args.max_batch_mb * 1024 * 1024, args.max_files_per_batch)
    for index, group in enumerate(groups, start=1):
        relative_paths = [str(path.relative_to(repo)) for path in group]
        run(["git", "add", "--", *relative_paths], repo)
        if run(["git", "diff", "--cached", "--quiet"], repo, check=False).returncode == 0:
            continue
        group_size = sum(path.stat().st_size for path in group)
        message = (
            f"docs: publish asset catalog batch {index}/{len(groups)} "
            f"({len(group)} files, {group_size / 1024 / 1024:.1f} MB) [skip ci]"
        )
        run(["git", "commit", "-m", message], repo)
        run(["git", "push", "origin", f"HEAD:{args.branch}"], repo)
        commit_shas.append(run(["git", "rev-parse", "HEAD"], repo).stdout.strip())

    result = {
        "generated_at": datetime.now(timezone.utc).replace(microsecond=0).isoformat(),
        "branch": args.branch,
        "file_count": len(files),
        "batch_count": len(groups),
        "commits": commit_shas,
        "head": run(["git", "rev-parse", "HEAD"], repo).stdout.strip(),
    }
    status_path = output / "repository_publish_status.json"
    status_path.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
