# Storage Service Interface and Types

**File**: `src/storage/storage.ts`

## Overview

This file defines the core abstractions and contracts for the storage system, including interfaces, types, and constants. It establishes the foundation for all storage implementations and ensures type safety across the storage layer.

## Purpose

- **Interface Definition**: Defines the contract that all storage implementations must follow
- **Type Safety**: Provides TypeScript types for artifact categories and storage operations
- **Standardization**: Ensures consistent naming and behavior across storage backends
- **Extensibility**: Allows for multiple storage implementations while maintaining compatibility

## Core Components

### ArtifactType Constant Object

```typescript
export const ArtifactType = {
  SNAPSHOT: "snapshots",
  DOM: "dom",
  HAR: "har",
  TRACE: "trace",
} as const;
```

**Purpose**: Defines the standardized artifact categories and their corresponding directory/path names.

**Benefits**:

- **Type Safety**: Prevents typos and ensures consistent usage
- **Single Source of Truth**: Centralized definition for all artifact types
- **Immutable**: `as const` assertion ensures values cannot be modified
- **IntelliSense Support**: Provides autocompletion in IDEs

### ArtifactType Type Definition

```typescript
export type ArtifactType = (typeof ArtifactType)[keyof typeof ArtifactType];
```

**Purpose**: Creates a union type from the ArtifactType constant values.

**Result**: Type that accepts only: `"snapshots" | "dom" | "har" | "trace"`

### StorageService Interface

```typescript
export interface StorageService {
  uploadSnapshot(localPath: string, uuid: string): Promise<string>;
  uploadDOM(localPath: string, uuid: string): Promise<string>;
  uploadHAR(localPath: string, uuid: string): Promise<string>;
  uploadTrace(localPath: string, uuid: string): Promise<string>;
  ensureBucketExists?(): Promise<void>;
}
```

**Contract Definition**:

#### Required Methods

- **`uploadSnapshot()`**: Store screenshot image files
- **`uploadDOM()`**: Store HTML document content
- **`uploadHAR()`**: Store HTTP Archive network data
- **`uploadTrace()`**: Store Playwright execution traces

#### Optional Methods

- **`ensureBucketExists()`**: Initialize storage backend (marked with `?`)

#### Method Signatures

- **Input**: `localPath` (temporary file location) and `uuid` (unique identifier)
- **Output**: Promise resolving to the final storage path/URL
- **Error Handling**: Implementations should throw appropriate errors for failures

## Design Principles

### Interface Segregation

Each method has a specific, single responsibility for one artifact type.

### Async Operations

All methods return Promises to support both synchronous and asynchronous storage backends.

### Path Flexibility

Methods return storage paths/URLs, allowing implementations to use:

- Local file paths
- Cloud storage URLs
- Database identifiers
- API endpoints

### Optional Initialization

The `ensureBucketExists()` method is optional, allowing implementations to:

- Skip initialization if not needed
- Perform setup operations (create directories, verify credentials)
- Validate storage backend availability

## Usage Patterns

### Implementation Example

```typescript
class CloudStorageService implements StorageService {
  async uploadSnapshot(localPath: string, uuid: string): Promise<string> {
    // Upload to cloud and return URL
  }
  // ... other methods
}
```

### Consumer Usage

```typescript
const storage: StorageService = createStorageService();
const path = await storage.uploadSnapshot("temp.png", uuid);
```

## Type Safety Benefits

1. **Compile-Time Validation**: TypeScript ensures all methods are implemented
2. **Parameter Validation**: Prevents incorrect parameter types
3. **Return Type Consistency**: Ensures all implementations return expected types
4. **Interface Evolution**: Easy to extend interface while maintaining backward compatibility

## Future Extensions

The interface can be extended to support:

- Metadata storage and retrieval
- Batch upload operations
- Storage backend health checks
- Artifact deletion and cleanup
- Storage usage analytics
