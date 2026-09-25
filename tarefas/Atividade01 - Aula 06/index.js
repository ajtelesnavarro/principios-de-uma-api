import express from 'express';
import { env } from 'node:process';
export const app = express();

env.PORT = 3000;

export function criarAplicacao() {
  try{
    app.use(express.json());

    app.get('/api/saude', (req, res) => {
      res.status(200).json({status:'ok'});
      console.log(res.status, res.status.json)
    });
  }
  catch{
    app.use((erro, req, res, _next) => {
      console.error('Erro de sistema: ', erro.message);
      res.status(500).json({erro: 'Falha interna no servidor'});
    });
  }
}

const porta = Number(process.env.PORT || 3000);
app.listen(porta, '127.0.0.1', () => console.log(`Servidor iniciado na porta ${porta}.`));
criarAplicacao();