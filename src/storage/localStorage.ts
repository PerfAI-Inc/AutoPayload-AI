import fs from "fs/promises";
import path from "path";
import { StorageService } from "./storage";

const BASE_DIR = process.env.LOCAL_STORAGE_PATH || "./tmp-storage";

export class LocalStorageService implements StorageService {
  private async uploadArtifact(localPath: string, artifactType: string, uuid: string, extension: string): Promise<string> {
    const destDir = path.join(BASE_DIR, artifactType);
    await fs.mkdir(destDir, { recursive: true });
    const filename = `${uuid}.${extension}`;
    const destPath = path.join(destDir, filename);
    await fs.copyFile(localPath, destPath);
    return destPath;
  }

  async uploadSnapshot(localPath: string, uuid: string): Promise<string> {
    return this.uploadArtifact(localPath, "snapshots", uuid, "png");
  }

  async uploadDOM(localPath: string, uuid: string): Promise<string> {
    return this.uploadArtifact(localPath, "dom", uuid, "html");
  }

  async uploadHAR(localPath: string, uuid: string): Promise<string> {
    const extension = localPath.endsWith(".gz") ? "har.gz" : "har";
    return this.uploadArtifact(localPath, "har", uuid, extension);
  }

  async uploadTrace(localPath: string, uuid: string): Promise<string> {
    return this.uploadArtifact(localPath, "trace", uuid, "zip");
  }

  async ensureBucketExists(): Promise<void> {
    await fs.mkdir(BASE_DIR, { recursive: true });
  }
}
