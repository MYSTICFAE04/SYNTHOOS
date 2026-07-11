# SynthoOS

**SynthoOS** is a state-of-the-art enterprise-grade operating system and orchestration platform for agentic AI workflows. Built as a rebranded and enhanced distribution, SynthoOS transforms Langflow into a premium, production-ready agentic AI platform with enterprise-grade features, security, and deployment options.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python Version](https://img.shields.io/badge/python->=3.10-blue.svg)](https://www.python.org/downloads/)
[![Node.js Version](https://img.shields.io/badge/node->=20.19.0-green.svg)](https://nodejs.org/)
[![GitHub Issues](https://img.shields.io/github/issues/MYSTICFAE04/SYNTHOOS.svg)](https://github.com/MYSTICFAE04/SYNTHOOS/issues)
[![GitHub Stars](https://img.shields.io/github/stars/MYSTICFAE04/SYNTHOOS.svg)](https://github.com/MYSTICFAE04/SYNTHOOS/stargazers)

## 📋 Table of Contents

- [✨ Features & Enhancements](#-features--enhancements)
- [🚀 Quick Start](#-quick-start)
- [🛠️ Architecture](#-architecture)
- [📚 Documentation](#-documentation)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features & Enhancements

### 1. Premium Dark-Themed AI Workspace

- **Enterprise Landing Page**: Replaces the generic files-only homepage with a comprehensive, glassmorphic Control Center.
- **Visual Mesh Gradients**: Subtle background blur glow rings in purple and cyan that respond beautifully to different window screen widths.
- **Workspace Modules Grid**: A quick-action 3×3 shortcuts grid colored in alternating premium accents to easily manage:
  - Prompting & workflow creation
  - Document ingestion & data sources
  - Variables & secrets management
  - API keys & credentials
  - System settings & configuration
- **Active Statistics Monitor**: Live counter displays tracking:
  - Total Workflows
  - Connected Agents
  - Custom Components
  - System Status metrics
- **Launch CTA**: Prominent, high-priority `"Open Workflow Builder"` launcher button to instantiate and edit visual nodes directly on the canvas.

### 2. Complete SynthoOS Rebranding

- **Branding Assets**: Replaced all PWA metadata, favicons, page headers, modal titles, and monochrome/colored SVGs with the custom SynthoOS logo representing interlocking cyber-neural networks.
- **Consistent Locale Strings**: Standardized frontend locale translations (`modal.io.builtWithSynthoOS`, `help.getSynthoOSDesktop`) for zero-key leakage and seamless branding.

### 3. Enhanced Enterprise Support

- Advanced workflow orchestration
- Multi-agent coordination
- Enterprise-grade security
- Scalable deployment options
- Production-ready monitoring

---

## 🚀 Quick Start

### Prerequisites

- **Node.js**: >= 20.19.0
- **Python**: >= 3.10
- **Docker** (optional): For containerized deployment

### Installation & Development

#### 1. Clone the Repository

```bash
git clone https://github.com/MYSTICFAE04/SYNTHOOS.git
cd SYNTHOOS
```

#### 2. Install & Build Frontend Client

Navigate to the frontend directory:

```bash
cd src/frontend
npm install
npm run build
```

The React client compiles into static optimized production bundles inside the `src/frontend/build` folder.

#### 3. Run Local Development Server

To launch the Vite hot-reloading development preview:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

#### 4. Start Backend Server

In a separate terminal:

```bash
make backend
```

Backend will be available at [http://localhost:7860](http://localhost:7860)

---

## 🛠️ Architecture

### Project Structure

```
SYNTHOOS/
├── src/
│   ├── frontend/           # React UI (Vite + TypeScript)
│   │   ├── public/         # Static assets, PWAs, favicons
│   │   ├── src/
│   │   │   ├── pages/MainPage/homePage/   # Control Panel dashboard
│   │   │   ├── assets/     # SynthoOS SVG branding resources
│   │   │   └── components/core/           # Canvas builders, flow modules
│   │   └── build/          # Production bundles
│   └── backend/            # FastAPI backend
├── docker/                 # Docker configurations
├── deploy/                 # Deployment guides
├── .devcontainer/          # Dev container setup
├── DEVELOPMENT.md          # Development guide
├── CONTRIBUTING.md         # Contribution guidelines
└── README.md              # This file
```

### Technology Stack

| Component | Technology |
|-----------|----------|
| **Frontend** | React 18+, TypeScript, Vite, TailwindCSS |
| **Backend** | FastAPI, Python 3.10+ |
| **Database** | PostgreSQL/SQLite |
| **DevOps** | Docker, Docker Compose |
| **CI/CD** | GitHub Actions |

---

## 📚 Documentation

### Getting Started

- **[Development Guide](./DEVELOPMENT.md)** - Local setup and development workflow
- **[Contributing Guide](./CONTRIBUTING.md)** - How to contribute to SynthoOS
- **[Deployment Guide](./deploy/README.md)** - Docker & production deployment

### Setup Options

- **[Dev Container Setup](./.devcontainer/README.md)** - Use GitHub Codespaces or VS Code Dev Containers
- **[Docker Deployment](./deploy/README.md)** - Deploy with Docker Compose

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on:

- How to report bugs
- How to request features
- How to submit pull requests
- Code standards and testing requirements

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Write or update tests
5. Push to your fork: `git push origin feature/your-feature-name`
6. Open a Pull Request

### Code Standards

- **Test Coverage**: Minimum 75%, target 80%
- **Code Style**: Follow semantic commit conventions
- **Documentation**: Update docs for new features

---

## 🔧 Development Commands

### Build & Run

```bash
# Initialize development environment
make init

# Run backend server
make backend

# Run frontend dev server
make frontend

# Build production bundles
make build_frontend

# Run linting
make lint

# Format code
make format_backend
make format_frontend

# Run tests
make unit_tests
```

### Docker Commands

```bash
# Pull latest images
docker compose pull

# Start services
docker compose up

# Run in background
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down
```

---

## 📈 Project Status

| Aspect | Status |
|--------|--------|
| **Latest Release** | [v1.0.0](https://github.com/MYSTICFAE04/SYNTHOOS/releases/tag/v1.0.0) |
| **Build** | [![CI/CD](https://img.shields.io/badge/CI%2FCD-passing-green.svg)](https://github.com/MYSTICFAE04/SYNTHOOS/actions) |
| **Dependencies** | [![Dependencies](https://img.shields.io/badge/Dependencies-up%20to%20date-green.svg)](https://github.com/MYSTICFAE04/SYNTHOOS/pulls) |
| **License** | MIT |
| **Python Support** | 3.10+ |
| **Node.js Support** | 20.19.0+ |

---

## 🔐 Security

For security vulnerabilities, please see [SECURITY.md](./SECURITY.md) for reporting guidelines.

### Pre-commit Security

- Secrets scanning enabled
- Code quality checks
- Dependency vulnerability scans

---

## 📞 Support & Community

- **GitHub Issues**: [Report bugs or request features](https://github.com/MYSTICFAE04/SYNTHOOS/issues)
- **Documentation**: [Development Guide](./DEVELOPMENT.md)
- **Contributing**: [See CONTRIBUTING.md](./CONTRIBUTING.md)

---

## 📄 License

This project is licensed under the **MIT License** - see [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built as an enhanced distribution of Langflow
- Thanks to all contributors and maintainers
- Community feedback and suggestions welcome!

---

**Made with ❤️ for AI Workflow Orchestration**