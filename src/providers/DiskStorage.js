const fs = require("fs"); //O módulo File System do Node.js permite o trabalho com o sistema de arquivos do computador.
const path = require("path");
const uploadConfig = require("../configs/upload");

class DiskStorage {
    async saveFile(file){  // Função para salvar o arquivo
        await fs.promises.rename( // função promises.rename do fs é para mudar o arquivo de lugar, no caso mudar da pasta temporária para a pasta de upload
            path.resolve(uploadConfig.TMP_FOLDER, file), // Renomeia o arquivo temporário
            path.resolve(uploadConfig.UPLOADS_FOLDER, file) // Move o arquivo para a pasta de uploads
        );

        return file; // Retorna o nome do arquivo salvo
    }

    async deleteFile(file){ // função para deletar um arquivo caso ele já exista e for feito o upload de outro (mudando a foto do usuário por exemplo)
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file); // Caminho completo do arquivo

        try{
            await fs.promises.stat(filePath); // Verifica se o arquivo existe
        } catch {
            return; // Se não existir, retorna sem fazer nada
        }
        await fs.promises.unlink(filePath); // Deleta o arquivo
    }
}

module.exports = DiskStorage;