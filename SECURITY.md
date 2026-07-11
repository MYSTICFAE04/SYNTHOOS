# SECURITY.md

## Security Reporting

If you discover a security vulnerability in SynthoOS, please report it responsibly by emailing security@synthoos.dev or opening a private security advisory on GitHub.

**Please do NOT open public issues for security vulnerabilities.**

### What to Include in Your Report

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested remediation (if any)

### Response Timeline

We aim to:
1. Acknowledge receipt within 48 hours
2. Confirm the vulnerability within 7 days
3. Release a patch within 30 days when possible

## Security Practices

### Pre-commit Security Scanning

SynthoOS uses automated tools to prevent secrets leakage:

- **detect-secrets**: Scans for API keys, credentials, and tokens
- **Dependabot**: Monitors dependencies for known vulnerabilities
- **GitHub Secret Scanning**: Detects exposed credentials

### Required Before Commit

```bash
# Install pre-commit hooks
uv run pre-commit install

# Run security checks
uv run pre-commit run --all-files
```

### Secrets Management

Never commit:
- API keys or tokens
- Database credentials
- Private encryption keys
- Personal access tokens
- OAuth tokens

Use environment variables or `.env` files (excluded from git) instead.

## Dependency Security

### Regular Updates

- Weekly dependency scans via Dependabot
- Automatic PRs for updates
- Security patches prioritized

### Reporting Dependency Vulnerabilities

If you find a vulnerable dependency:

1. Check if we've already opened an issue
2. Create a new issue with:
   - Package name and version
   - CVE details (if available)
   - Severity level
   - Suggested fixed version

## Contact

- **Security Team**: security@synthoos.dev
- **GitHub Issues**: [Report publicly safe issues only](https://github.com/MYSTICFAE04/SYNTHOOS/issues)
- **Private Advisory**: Use GitHub's security advisory feature

## Acknowledgments

We appreciate security researchers who help keep SynthoOS safe. Researchers who responsibly disclose vulnerabilities may be listed in our security acknowledgments (with permission).