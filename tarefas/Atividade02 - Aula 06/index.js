import express from 'express';
export const app = express();

const produtoRoutes = express.Router();

const produtos = [
  { id: 1, nome: 'Teclado', preco: 120 },
  { id: 2, nome: 'Mouse', preco: 80 }
];

produtoRoutes.get('/', async (req, res, next) => {
  try{
    res.status(200).json({sucesso: true, dados: produtos})
  } catch (erro) {
    next(erro);
  }
})

export function criarAplicacao() {
  app.use(express.json());
  app.use('/api/produtos', produtoRoutes);
}


const porta = Number(process.env.PORT || 3000);
app.listen(porta, '127.0.0.1', () => console.log(`Servidor iniciado na porta ${porta}.`));
criarAplicacao();