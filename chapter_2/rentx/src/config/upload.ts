import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

const tmpFolder = resolve(__dirname, "..", "..", "tmp");

export default {
  tmpFolder,
  // funcao export recebe o caminho

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString("hex"); // cria o hash para o nome do arquivo
      const fileName = `${fileHash}-${file.originalname}`; // concatena o nome original do arquivo com o hash criado

      return callback(null, fileName);
    },
  }),
};
