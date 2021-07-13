import fs from "fs";

export const deleteFile = async (filename: string) => {
  try {
    await fs.promises.stat(filename); // verifica se arquivo existe no diretorio passado
  } catch {
    return null;
  }

  await fs.promises.unlink(filename); // remove o arquivo
};
