import fs from "fs";
import { resolve } from "path";

import upload from "@config/upload";

import { IStorageProvider } from "../IStorageProvider";

class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(upload.tmpFolder, file), // remove dessa origem e coloca na pasta destino   exemplo: tmp/test.jpg
      resolve(`${upload.tmpFolder}/${folder}`, file) // destino do arquivo  exemplo:  tmp/avatar/test.jpg
    );

    return file;
  }
  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file);

    try {
      await fs.promises.stat(filename);
    } catch {
      //
    }
    await fs.promises.unlink(filename);
  }
}

export { LocalStorageProvider };
