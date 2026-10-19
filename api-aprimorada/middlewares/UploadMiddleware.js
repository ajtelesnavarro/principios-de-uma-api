import multer from "multer";
import { randomUUID } from "crypto";
import { mkdirSync } from "fs";
import { extname, resolve } from "path";

const DIRETORIO_UPLOADS = resolve("uploads/produtos");
mkdirSync(DIRETORIO_UPLOADS, { recursive: true });

const MIME_TYPES_VALIDOS = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

const storage = multer.diskStorage({
    destination: (_req, _file, callback) => {
        callback(null, DIRETORIO_UPLOADS);
    },
    filename: (_req, file, callback) => {
        const extensao = extname(file.originalname).toLowerCase();
        callback(null, `${randomUUID()}${extensao}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: },
    fileFilter: (_req, file, callback) => {

        return callback(null, true);
    }
});

export function uploadImagem(req, res, next) {
    upload.single('imagem')
}