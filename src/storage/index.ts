import type { StorageService } from "./storage";
import { LocalStorageService } from "./localStorage";

export type { StorageService } from "./storage";
export { ArtifactType } from "./storage";
export { LocalStorageService } from "./localStorage";
export { generateArtifactUUID } from "./utils";

export function createStorageService(): StorageService {
  return new LocalStorageService();
}
