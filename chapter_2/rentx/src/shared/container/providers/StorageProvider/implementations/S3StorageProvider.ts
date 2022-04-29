import { S3 } from "aws-sdk";

import { IStorageProvider } from "../IStorageProvider";

class S3StorageProvider implements IStorageProvider {
  private client: S3;
  constructor() {
    this.client = new S3({
      region: "sa-east-1",
    });
  }
  save(file: string, folder: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  delete(file: string, folder: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
