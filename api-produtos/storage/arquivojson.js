import { mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { basename, dirname, join } from 'node:path';


//linha 16 e 17 mostra que o codigo ta forçãndo que dados tenha uma array, se nao tiver da erro
//aqui ele colcoa duas validas, uma pra ver se o json é uma array e a outra se o caminho nao
//linha 34 agnt so ta extraindo o nome do diretorio, nao o cminho completo dele, apenas o diretoreio de caminho
//linha 37 agnt ele vai verififcar se exise ou nao, e se nao existir ele cria
//linha 45 o forçe true força literalmente o apagamento se der alguma merda
//essa função vai se executada de forma sequencial nao tudo de uma vez, pq? naos ei
export async function lerJson(caminho) {
    let texto;
    try{
        texto = await readFile(caminho, 'utf8');
    } catch (erro){
        if (erro.code === 'ENOENT') return [];
        throw erro;
    }
    try {
        const dados = JSON.parse(texto);
        if(!Array.isArray(dados)){
            throw new TypeError ('O catálogo JSON deve conter uma array');
        }
        return dados;
    } catch (erro){
        if (erro instanceof SyntaxError){
            throw new SyntaxError(`JSON inválido em ${basename(caminho)}`);
        }
        throw erro;
    }
}

export async function gravarJson(caminho, dados){
    if(!Array.isArray(dados)){
        throw new TypeError('Os dados gravados devem formar uma array');
    }
    const diretorio = dirname(caminho)
    await mkdir(diretorio, {recursive: true});
    const temporario = join(diretorio, `.${basename(caminho)}.${randomUUID()}.tmp`);
    const texto = `${JSON.stringify(dados, null, 2)}\n`;

    try {
        await writeFile(temporario, texto, 'utf8');
        await rename(temporario, caminho);
    } catch(erro){
        await rm(temporario, {force: true}).catch(()=> undefined);
        throw erro;
    }
}