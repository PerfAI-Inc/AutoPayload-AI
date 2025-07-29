# Storage Utility Functions

**File**: `src/storage/utils.ts`

## Overview

This file provides utility functions used throughout the storage system. Currently focused on UUID generation for unique artifact identification, but designed to be extensible for additional storage-related utilities.

## Purpose

- **UUID Generation**: Provides unique identifiers for artifact sets
- **Utility Consolidation**: Centralizes common storage-related helper functions
- **Dependency Management**: Manages external utility library usage
- **Reusability**: Offers reusable functions across the storage system

## Core Functions

### `generateArtifactUUID()`

```typescript
export function generateArtifactUUID(): string {
  return uuidv4();
}
```

**Purpose**: Generates a unique identifier for each set of related artifacts.

**Implementation**:

- Uses the `uuid` library's v4 function for random UUID generation
- Returns a standard UUID string format (e.g., `"550e8400-e29b-41d4-a716-446655440000"`)
- Ensures uniqueness across different execution runs

**Benefits**:

1. **Unique Identification**: Each artifact set gets a globally unique identifier
2. **Correlation**: Links related artifacts (screenshot, DOM, HAR, trace) together
3. **Traceability**: Enables tracking and debugging of specific execution runs
4. **Collision Avoidance**: Virtually eliminates the risk of identifier conflicts

**Usage Pattern**:

```typescript
import { generateArtifactUUID } from "./storage/utils";

const uuid = generateArtifactUUID();
// Use uuid for naming all related artifacts
```

## Dependencies

### UUID Library

- **Package**: `uuid` (v11.1.0)
- **Function**: `v4` - Random UUID generation
- **Type Support**: `@types/uuid` for TypeScript definitions

## Design Considerations

### Abstraction Layer

The function wraps the uuid library to:

- Provide a domain-specific name (`generateArtifactUUID` vs generic `uuidv4`)
- Allow for easy swapping of UUID generation strategies
- Enable additional logic (logging, validation) if needed in the future

### Consistency

All UUID generation throughout the application should use this function to ensure:

- Consistent UUID format and version
- Centralized dependency management
- Easy migration if UUID strategy changes

## Future Extensions

This file can be extended to include additional storage utilities:

### Potential Additions

- **Path Validation**: Functions to validate and sanitize storage paths
- **File Type Detection**: Utilities to detect and validate artifact file types
- **Compression Helpers**: Functions for compressing/decompressing artifacts
- **Metadata Extraction**: Utilities to extract metadata from artifacts
- **Storage Statistics**: Functions to calculate storage usage and metrics

### Example Extensions

```typescript
// File validation utility
export function validateArtifactFile(filePath: string, expectedType: ArtifactType): boolean;

// Path sanitization utility
export function sanitizeStoragePath(path: string): string;

// File size calculation
export function getArtifactSize(filePath: string): Promise<number>;
```

## Testing Considerations

The UUID generation can be tested by:

- Verifying UUID format compliance
- Ensuring uniqueness across multiple generations
- Validating that UUIDs are properly formatted strings
- Testing that the function consistently returns valid identifiers

## Error Handling

Currently relies on the underlying `uuid` library for error handling. The function assumes:

- The uuid library is properly installed and available
- System has sufficient entropy for random number generation
- No external dependencies or network calls are required
