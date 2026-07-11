# Deploy SynthoOS

This guide covers deploying SynthoOS using Docker Compose.

## Prerequisites

- Docker and Docker Compose installed on your machine
- See [Docker installation guide](https://docs.docker.com/get-docker/)

## Docker Compose Deployment

### Step 1: Pull Latest Images

It's recommended to pull the latest version of the images before running:

```bash
docker compose pull
```

### Step 2: Start Services

To start all SynthoOS services:

```bash
docker compose up
```

The service will start and be accessible at: **http://localhost:80**

To run in the background:

```bash
docker compose up -d
```

### Step 3: Access SynthoOS

Once running, open your browser and navigate to:
```
http://localhost:80
```

The SynthoOS enterprise dashboard will load.

## Configuration

Edit the `.env` file in the root directory to customize:
- Port number (default: 80)
- Environment variables
- API keys and credentials
- Database settings

Example:
```env
PORT=80
ENVIRONMENT=production
LOG_LEVEL=info
```

## Managing Services

**View logs:**
```bash
docker compose logs -f
```

**Stop services:**
```bash
docker compose stop
```

**Stop and remove containers:**
```bash
docker compose down
```

**Restart services:**
```bash
docker compose restart
```

## Volumes and Persistence

The `docker-compose.yml` file defines volumes for data persistence. Ensure:
- Database data is persisted between restarts
- Configuration changes are saved
- Logs are retained for debugging

## Monitoring

To check service health:

```bash
docker compose ps
```

To view detailed container information:

```bash
docker stats
```

## Troubleshooting

**Services won't start:**
- Check port 80 is not in use: `lsof -i :80`
- Review logs: `docker compose logs`
- Ensure `.env` file is properly configured

**Performance issues:**
- Check available disk space
- Monitor CPU/memory usage with `docker stats`
- Consider allocating more resources to Docker

**Connectivity issues:**
- Verify all containers are running: `docker compose ps`
- Check network configuration: `docker network inspect`
- Ensure firewall allows port 80

## Upgrading

To upgrade to the latest version:

```bash
docker compose pull
docker compose down
docker compose up -d
```

## Support

For additional help, see:
- [DEVELOPMENT.md](../DEVELOPMENT.md) - Local development setup
- [GitHub Issues](https://github.com/MYSTICFAE04/SYNTHOOS/issues)
