# Local Storage Service Implementation

**File**: `src/storage/localStorage.ts`

## Overview

The `LocalStorageService` class provides a concrete implementation of the `StorageService` interface for storing artifacts on the local file system. This implementation organizes artifacts into categorized directories and uses UUID-based naming for unique identification.

## Purpose

- **Local File Storage**: Implements storage operations for the local file system
- **Directory Organization**: Creates organized folder structure for different artifact types
- **File Management**: Handles file copying, directory creation, and path resolution
- **Interface Compliance**: Implements the StorageService contract for consistent usage

## Class Structure

### Configuration

- **Base Directory**: Configurable via `LOCAL_STORAGE_PATH` environment variable (defaults to `./tmp-storage`)
- **Directory Structure**: Organizes artifacts by type (snapshots, dom, har, trace)

### Core Methods

#### `uploadArtifact(localPath, artifactType, uuid, extension)`

**Private utility method** that handles the common file upload logic:

- Creates destination directory if it doesn't exist
- Generates filename using UUID and appropriate extension
- Copies file from temporary location to organized storage location
- Returns the final storage path

#### `uploadSnapshot(localPath, uuid)`

**Public method** for storing screenshot artifacts:

- Handles PNG image files
- Stores in `snapshots/` subdirectory
- Uses `.png` extension

#### `uploadDOM(localPath, uuid)`

**Public method** for storing DOM content:

- Handles HTML document files
- Stores in `dom/` subdirectory
- Uses `.html` extension

#### `uploadHAR(localPath, uuid)`

**Public method** for storing HTTP Archive files:

- Handles both compressed (`.har.gz`) and uncompressed (`.har`) files
- Automatically detects compression based on file extension
- Stores in `har/` subdirectory

#### `uploadTrace(localPath, uuid)`

**Public method** for storing Playwright trace files:

- Handles ZIP-compressed trace files
- Stores in `trace/` subdirectory
- Uses `.zip` extension

#### `ensureBucketExists()`

**Public method** for storage initialization:

- Creates the base storage directory structure
- Ensures proper permissions and accessibility
- Called during storage service initialization

## Directory Structure

The service creates the following organized structure:

```
tmp-storage/  (or custom path)
├── snapshots/     # PNG screenshot files
├── dom/           # HTML DOM content files
├── har/           # HTTP Archive files
└── trace/         # Playwright trace ZIP files
```

## File Naming Convention

All files are named using the format: `{uuid}.{extension}`

- **UUID**: Unique identifier linking related artifacts
- **Extension**: Appropriate file extension for the artifact type

## Error Handling

The implementation relies on Node.js file system promises for:

- Directory creation with recursive option
- File copying operations
- Path resolution and validation

## Dependencies

- **fs/promises**: Node.js file system operations with promise-based API
- **path**: Node.js path utilities for cross-platform path handling
- **StorageService**: Interface implementation compliance

## Environment Configuration

- **`LOCAL_STORAGE_PATH`**: Environment variable to override default storage location
- **Default Path**: `./tmp-storage` relative to project root

## Usage Benefits

1. **Simple Setup**: No external dependencies or configuration required
2. **Local Development**: Perfect for development and testing environments
3. **File Organization**: Clear, organized structure for easy manual inspection
4. **Cross-Platform**: Uses Node.js path utilities for Windows/Unix compatibility
