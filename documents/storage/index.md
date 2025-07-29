# Storage Module Entry Point

**File**: `src/storage/index.ts`

## Overview

The storage module's main export file that provides a centralized interface for all storage-related functionality. This file acts as a facade pattern implementation, exposing the necessary types, classes, and factory functions while hiding internal implementation details.

## Purpose

- **Module Organization**: Centralizes all storage-related exports in one location
- **Type Safety**: Re-exports TypeScript interfaces and types for consistent usage
- **Factory Pattern**: Provides a simple factory function to create storage service instances
- **Abstraction Layer**: Hides concrete implementation details from consumers

## Exports

### Types and Interfaces

- **`StorageService`**: Interface defining the contract for storage implementations
- **`ArtifactType`**: Enum/type defining supported artifact categories

### Classes

- **`LocalStorageService`**: Concrete implementation for local file system storage

### Utility Functions

- **`generateArtifactUUID()`**: UUID generation utility for unique artifact identification

### Factory Function

- **`createStorageService()`**: Factory function that returns a configured storage service instance

## Factory Implementation

The `createStorageService()` function currently returns a `LocalStorageService` instance by default. This design allows for:

- **Easy Extension**: Future storage backends (AWS S3, Google Cloud, etc.) can be added
- **Configuration-Based Selection**: Storage backend can be chosen based on environment variables
- **Dependency Injection**: Clean separation between storage interface and implementation

## Usage Pattern

```typescript
import { createStorageService, generateArtifactUUID } from "./storage";

const storage = createStorageService();
const uuid = generateArtifactUUID();
```

## Design Benefits

1. **Single Responsibility**: Each module handles one aspect of storage
2. **Open/Closed Principle**: Easy to extend with new storage backends without modifying existing code
3. **Interface Segregation**: Clean separation between storage interface and implementations
4. **Dependency Inversion**: High-level modules depend on abstractions, not concretions

## Future Extensibility

The factory pattern allows for easy addition of:

- Cloud storage providers (AWS S3, Azure Blob, Google Cloud Storage)
- Database storage for metadata
- Remote API-based storage solutions
- Environment-specific storage configurations
