# SynthoOS

**SynthoOS** is a state-of-the-art enterprise-grade operating system and orchestration platform for agentic AI workflows. Built as a rebranded and enhanced distribution, SynthoOS transforms the layout into a premium, dark-themed control plane where developers can visual-build, deploy, and scale intelligent multi-agent cognitive systems.

---

## ✨ Features & Enhancements

### 1. Premium Dark-Themed AI Workspace
- **Enterprise Landing Page**: Replaces the generic files-only homepage with a comprehensive, glassmorphic Control Center.
- **Visual Mesh Gradients**: Subtle background blur glow rings in purple and cyan that respond beautifully to different window screen widths.
- **Workspace Modules Grid**: A quick-action 3x3 shortcuts grid colored in alternating premium accents to easily manage prompting, document ingestion, variables, keys, and settings.
- **Active Statistics Monitor**: Live counter displays tracking *Total Workflows*, *Connected Agents*, *Custom Components*, and *System Status* metrics.
- **Launch CTA**: Prominent, high-priority `"Open Workflow Builder"` launcher button to instantiate and edit visual nodes directly on the canvas.

### 2. Complete SynthoOS Rebranding
- **Branding Assets**: Replaced all PWA metadata, favicons, page headers, modal titles, and monochrome/colored SVGs with the custom SynthoOS logo representing interlocking cyber-neural networks.
- **Consistent Locale Strings**: Standardized frontend locale translations (`modal.io.builtWithSynthoOS`, `help.getSynthoOSDesktop`) for zero-key leakage.

---

## ⚡️ Quickstart

### Prerequisites
- Node.js >= 20.19.0
- Python >= 3.10

### 1. Install & Build Frontend Client
Navigate to the frontend directory:
```bash
cd src/frontend
npm install
npm run build
```

The React client compiles into static optimized production bundles inside the `src/frontend/build` folder.

### 2. Run Local Development Server
To launch the Vite hot-reloading development preview:
```bash
npm run dev
```

---

## 🛠️ Folder & Architecture Layout

- `src/frontend/public/` - Static assets including PWAs, favicons, logos.
- `src/frontend/src/pages/MainPage/pages/homePage/index.tsx` - Rebuilt Control Panel landing dashboard.
- `src/frontend/src/assets/` - SynthoOS SVG vector branding resources.
- `src/frontend/src/components/core/` - Canvas builders, flow modules, and core page headers.
