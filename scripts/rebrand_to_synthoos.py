"""Replace user-facing Langflow branding with SynthoOS."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def replace_in_file(path: Path, replacer) -> bool:
    text = path.read_text(encoding="utf-8")
    new = replacer(text)
    if new != text:
        path.write_text(new, encoding="utf-8")
        return True
    return False


def simple_replace(text: str) -> str:
    return text.replace("Langflow", "SynthoOS")


def cli_repl(text: str) -> str:
    out: list[str] = []
    for line in text.splitlines(True):
        if re.match(r"^\s*(from|import)\s", line):
            out.append(line)
            continue
        if any(
            token in line
            for token in (
                "langflow_sdk",
                "LangflowClient",
                "LangflowNotFoundError",
                "LangflowHTTPError",
                "LangflowAuthError",
                "LangflowConnectionError",
                "LangflowTimeoutError",
            )
        ):
            out.append(line)
            continue
        out.append(line.replace("Langflow", "SynthoOS"))
    return "".join(out)


def comp_repl(text: str) -> str:
    quote_pattern = re.compile(r'(["\'])([^"\']*?)Langflow([^"\']*?)\1')
    skip_tokens = (
        "LangflowLogo",
        "LangflowCounts",
        "LangflowButton",
        "LangflowPage",
        "loginLangflow",
        "addFlowToTestOnEmptyLangflow",
        "langflowShortcuts",
        "langflow-counts",
        "LangflowLogoColor",
    )

    def sub_line(line: str) -> str:
        if re.match(r"^\s*(from|import)\s", line):
            return line
        if any(token in line for token in skip_tokens):
            return line
        if "integrations/Langflow/" in line or "langflow-ai" in line:
            return line
        if "LangflowClient" in line or "LangflowError" in line:
            return line
        return quote_pattern.sub(
            lambda m: f"{m.group(1)}{m.group(2)}SynthoOS{m.group(3)}{m.group(1)}",
            line,
        )

    return "".join(sub_line(line) for line in text.splitlines(True))


def main() -> None:
    changed: list[str] = []

    for path in (ROOT / "src/frontend/src/locales").glob("*.json"):
        if replace_in_file(path, simple_replace):
            changed.append(str(path.relative_to(ROOT)))

    for rel in ("src/frontend/index.html", "src/frontend/public/manifest.json"):
        path = ROOT / rel
        if path.exists() and replace_in_file(path, simple_replace):
            changed.append(rel)

    frontend_files = [
        "src/frontend/src/constants/constants.ts",
        "src/frontend/src/constants/dbProviderConstants.ts",
        "src/frontend/src/components/core/assistantPanel/assistant-panel.constants.ts",
        "src/frontend/src/utils/buildUtils.ts",
        "src/frontend/src/customization/utils/custom-poll-build-events.ts",
        "src/frontend/src/pages/Playground/index.tsx",
        "src/frontend/src/pages/MainPage/pages/knowledgePage/utils/backendMetadata.ts",
        "src/frontend/src/components/core/canvasControlsComponent/CanvasControls.tsx",
    ]
    for rel in frontend_files:
        path = ROOT / rel
        if path.exists() and replace_in_file(path, simple_replace):
            changed.append(rel)

    backend_files = [
        "src/backend/base/langflow/utils/version.py",
        "src/backend/base/langflow/main.py",
        "src/backend/base/langflow/initial_setup/constants.py",
        "src/backend/base/langflow/services/database/constants.py",
        "src/backend/base/langflow/services/job_queue/service.py",
        "src/backend/base/langflow/services/adapters/deployment/watsonx_orchestrate/utils.py",
        "src/backend/base/langflow/api/v1/mcp_projects.py",
        "src/backend/base/langflow/agentic/helpers/input_sanitization.py",
        "src/backend/base/langflow/agentic/services/flow_types.py",
    ]
    for rel in backend_files:
        path = ROOT / rel
        if path.exists() and replace_in_file(path, simple_replace):
            changed.append(rel)

    cli_paths = sorted({*list((ROOT / "src/lfx/src/lfx/cli").glob("*.py")), *(ROOT / "src/lfx/src/lfx/cli").rglob("*.py")})
    for path in cli_paths:
        if replace_in_file(path, cli_repl):
            changed.append(str(path.relative_to(ROOT)))

    for path in (ROOT / "src/lfx/src/lfx/components").rglob("*.py"):
        if replace_in_file(path, comp_repl):
            changed.append(str(path.relative_to(ROOT)))

    # Backend component locale files and flow JSON with user-visible branding
    for pattern in (
        "src/backend/base/langflow/locales/*.json",
        "src/backend/base/langflow/initial_setup/starter_projects/*.json",
        "src/backend/base/langflow/agentic/flows/*.json",
    ):
        for path in ROOT.glob(pattern):
            if replace_in_file(path, simple_replace):
                changed.append(str(path.relative_to(ROOT)))

    extra_backend = [
        "src/backend/base/langflow/__main__.py",
        "src/backend/base/langflow/api/utils/mcp/agentic_mcp.py",
        "src/backend/tests/unit/utils/test_version.py",
    ]
    for rel in extra_backend:
        path = ROOT / rel
        if path.exists() and replace_in_file(path, simple_replace):
            changed.append(rel)

    # Frontend unit tests (string literals only; preserve code identifiers)
    for path in (ROOT / "src/frontend/src").rglob("*"):
        if path.suffix not in {".ts", ".tsx"} or "__tests__" not in path.parts:
            continue
        if replace_in_file(path, comp_repl):
            changed.append(str(path.relative_to(ROOT)))

    # Frontend tests asserting visible UI text (string literals only)
    test_patterns = [
        "src/frontend/tests/**/*.spec.ts",
        "src/frontend/tests/**/*.tsx",
        "src/frontend/src/**/__tests__/**/*.{ts,tsx}",
    ]
    for pattern in test_patterns:
        for path in ROOT.glob(pattern):
            if replace_in_file(path, comp_repl):
                changed.append(str(path.relative_to(ROOT)))

    print(f"Updated {len(changed)} files")
    for item in sorted(set(changed)):
        print(f"  {item}")


if __name__ == "__main__":
    main()
