export const ArtifactType = {
  SNAPSHOT: "snapshots",
  DOM: "dom",
  HAR: "har",
  TRACE: "trace",
} as const;
export type ArtifactType = (typeof ArtifactType)[keyof typeof ArtifactType];

export interface StorageService {
  uploadSnapshot(localPath: string, uuid: string): Promise<string>;
  uploadDOM(localPath: string, uuid: string): Promise<string>;
  uploadHAR(localPath: string, uuid: string): Promise<string>;
  uploadTrace(localPath: string, uuid: string): Promise<string>;
  ensureBucketExists?(): Promise<void>;
}
