# Main Application Entry Point

**File**: `src/index.ts`

## Overview

The main entry point of the AutoPayload-AI application that orchestrates the complete web automation and artifact collection process. This file serves as the primary execution script that launches a browser, captures various types of data during web interactions, and stores the collected artifacts using the storage service.

## Purpose

- **Web Automation**: Launches a headless Chromium browser using Playwright
- **Artifact Collection**: Captures screenshots, DOM content, HAR files, and execution traces
- **Data Management**: Organizes and stores collected artifacts with unique identifiers
- **Process Orchestration**: Coordinates the entire data collection and storage workflow

## Key Components

### Browser Launch Configuration

- **Headless Mode**: Runs browser without GUI for automated execution
- **HAR Recording**: Captures HTTP Archive format files for network analysis
- **Tracing**: Records detailed execution traces with screenshots and snapshots

### Artifact Generation

The application generates four types of artifacts:

1. **Screenshots** (`.png`): Full-page screenshots of the target website
2. **DOM Content** (`.html`): Complete HTML structure and content
3. **HAR Files** (`.har`): Network request/response data
4. **Traces** (`.zip`): Playwright execution traces with debugging information

### Storage Integration

- Uses the storage service factory to get appropriate storage implementation
- Generates unique UUIDs for each artifact set
- Ensures bucket/directory existence before storing artifacts
- Cleans up temporary files after successful storage

## Workflow

1. **Initialization**

   - Create storage service instance
   - Generate unique artifact UUID
   - Launch browser with recording configuration

2. **Data Collection**

   - Navigate to target URL (https://perfai.ai/)
   - Capture full-page screenshot
   - Extract DOM content
   - Record HAR and trace data automatically

3. **Storage**

   - Upload artifacts to configured storage backend
   - Clean up temporary files
   - Display storage locations in console

4. **Cleanup**
   - Close browser context and browser instance
   - Remove temporary files from filesystem

## Dependencies

- **playwright**: Browser automation and artifact capture
- **fs/promises**: File system operations for temporary file handling
- **./storage**: Storage service abstraction layer

## Target Website

Currently configured to analyze `https://perfai.ai/`, but can be easily modified to target different URLs for analysis.

## Output

The application provides console feedback showing:

- Artifact UUID for tracking
- Storage locations for each artifact type
- Success/completion status
