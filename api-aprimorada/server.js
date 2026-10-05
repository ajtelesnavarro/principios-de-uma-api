import { carregarAmbiente } from './config/ambiente.js';

const config = carregarAmbiente('.env'); //aqui adicionamos a função carregarAmbiente e dentro colocamos o parâmentro de .env, que é basicamente onde todas as  nossas infos confidennciais estão

const { app } = await import('./app.js'); //aqui estamos fazendo um import dinamico, que seria aonde nós importamos uma promise de algo que não está inicialmente criado na aplicação, e ai o await espera esse comando apos ele terminar para fazer o que ele foi designado a fazer e guarda na variavel app
const porta = config.porta || 3000; //aqui só fazemos uma verificação onde colocamos em porta a config.porta, e se não tiver o codigo vai colcoar em porta a padrão, que é 3000

app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
}); //aqui é realmente aonde fazemos o servidor rodar, ent aqui usamos a variavel exportada de app.js que contem o express dentro e usamos a propriedade listen, onde basicamente agnt diz para a aplicação começar a aceitar requisições na porta especificada
//porem ao lado de porta temos uma arrow function, onde ela basicamente diz que depois que o codigo foi eecutado e funcionando, execute este código, no caso o console.log
