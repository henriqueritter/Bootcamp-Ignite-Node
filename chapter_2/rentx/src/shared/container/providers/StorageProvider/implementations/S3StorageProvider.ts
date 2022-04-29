import { S3 } from "aws-sdk";
import fs from "fs";
import mime from "mime";
import { resolve } from "path";

import upload from "@config/upload";

import { IStorageProvider } from "../IStorageProvider";

class S3StorageProvider implements IStorageProvider {
  private client: S3;
  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    });
  }
  async save(file: string, folder: string): Promise<string> {
    // pegamos o arquivo que foi inserido na pasta TMP
    const originalName = resolve(upload.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalName);

    // retorna o contentType
    const ContentType = mime.getType(originalName);

    await this.client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
        ACL: "public-read",
        Body: fileContent,
        ContentType,
      })
      .promise(); // para transformar esse put object em uma promise

    // apos inserido removemos o arquivo do nosso tmp local
    await fs.promises.unlink(originalName);

    return file;
  }
  async delete(file: string, folder: string): Promise<void> {
    // para deletar o arquivo
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
      })
      .promise();
  }
}
