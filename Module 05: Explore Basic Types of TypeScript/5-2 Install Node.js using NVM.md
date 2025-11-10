# 5-2 Install Node.js using NVM

## What is NVM?

NVM (Node Version Manager) is a tool that allows you to install and manage multiple versions of Node.js on your system. This is especially useful for developers who work on different projects that may require different Node.js versions.

## Why Use NVM?

- **Version Management**: Easily switch between different Node.js versions
- **Project Compatibility**: Use the specific Node.js version required by each project
- **Easy Updates**: Simple commands to install and switch versions
- **No Permission Issues**: Install Node.js without requiring sudo/admin privileges

## Installing NVM on Linux/Mac

### Step 1: Download and Install NVM

Run the following command in your terminal:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

This command downloads and runs the NVM installation script.

### Step 2: Source the NVM Script

After installation, you need to source the NVM script in your shell profile. Run:

```bash
source ~/.bashrc
```

Or if you're using zsh:

```bash
source ~/.zshrc
```

### Step 3: Verify NVM Installation

Check if NVM is installed correctly:

```bash
nvm --version
```

You should see the version number if installed properly.

## Installing Node.js using NVM

### Install the Latest LTS Version

```bash
nvm install --lts
```

This installs the latest Long Term Support (LTS) version of Node.js.

### Install a Specific Version

```bash
nvm install 18.17.0
```

Replace `18.17.0` with your desired version number.

### List Available Node.js Versions

```bash
nvm list-remote
```

This shows all available Node.js versions you can install.

## Switching Between Node.js Versions

### Use a Specific Version

```bash
nvm use 18.17.0
```

### Set Default Version

```bash
nvm alias default 18.17.0
```

### Check Current Version

```bash
node --version
npm --version
```

## Installing NVM on Windows

For Windows users, you can use the Windows Subsystem for Linux (WSL) and follow the Linux instructions above, or use the Windows-specific installer from the [NVM Windows repository](https://github.com/coreybutler/nvm-windows).

## Troubleshooting

### Command Not Found Error

If you get a "command not found" error after installation, make sure you've sourced your shell profile:

```bash
source ~/.bashrc
# or
source ~/.zshrc
```

### Permission Denied Error

NVM installs Node.js in your home directory, so you shouldn't need sudo. If you encounter permission issues, check your NVM installation.

## Next Steps

Once Node.js is installed, you can proceed to install TypeScript globally:

```bash
npm install -g typescript
```

Verify TypeScript installation:

```bash
tsc --version
```

## Additional Resources

- [NVM GitHub Repository](https://github.com/nvm-sh/nvm)
- [Node.js Official Website](https://nodejs.org/)
- [NVM Windows (for Windows users)](https://github.com/coreybutler/nvm-windows)
