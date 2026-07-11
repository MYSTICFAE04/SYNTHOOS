# SynthoOS Development Container Setup

This guide will walk you through setting up and running SynthoOS via GitHub Codespaces or a local dev container.

## Create a Codespace in GitHub

To setup SynthoOS in a Codespace:

1. Navigate to the [SynthoOS repository](https://github.com/MYSTICFAE04/SYNTHOOS)
2. Click the **"<> Code"** button and select the **"Codespaces"** tab
3. Click the green **"Create codespace on main"** button to create a new Codespace

## Wait for everything to install

After the codespace opens, installation happens in two phases (~5-10 minutes total):

- **Phase 1**: Building Container - you can view logs by clicking "Building Codespace"
- **Phase 2**: Running postCreateCommand - the terminal will show setup progress

Once completed, this terminal window will close automatically.

You now need to manually build the frontend. Open a new Terminal and run:

```bash
make build_frontend
```

This will compile the React frontend into production bundles. You should see output like:
```
✓ Building frontend static files
```

## Start up the Service

Open a new Terminal and start SynthoOS:

```bash
uv run synthoos run
```

The service will start and you may see a port forwarding dialog. **The service is ready when you see:**

```
╭────────────────────────────────────────────────────────────────╮
│ Welcome to SynthoOS                                             │
│                                                                 │
│ 🌟 GitHub: https://github.com/MYSTICFAE04/SYNTHOOS             │
│ 💬 Discord: Join our community for support                     │
│                                                                 │
│ 🟢 Open SynthoOS → http://localhost:7860                       │
╰────────────────────────────────────────────────────────────────╯
```

At this point you can:
- Click the port forwarding link in the bottom-right dialog, OR
- Find the forwarded address in the **Ports** tab (next to Terminal tab)

Navigate to the forwarded address in your browser to access the SynthoOS UI.

## Troubleshooting

**Issue**: Build fails or services won't start
- **Solution**: Run `make clean` then `make init` for a fresh build

**Issue**: Frontend not loading
- **Solution**: Ensure `npm install` completed successfully in `src/frontend/`

**Issue**: Backend API unreachable
- **Solution**: Check that both frontend and backend services are running in separate terminals

## Next Steps

For full development setup instructions, see [DEVELOPMENT.md](../DEVELOPMENT.md)
