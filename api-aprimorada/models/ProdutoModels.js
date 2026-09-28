//criarProdutoModel é tipo uma biblioteca grandona e que dentro vc pode chamar as 3 funç~]oes individualmente ou juntas

export function criarProdutoModel({pool}){
    async function listarTodos() {
        const [linhas] = await pool.query('SELECT * FROM produtos'); //colocou entrechaves = array, e com a linha de baixo = essa funcão vai retornar uma array
        return linhas.map(p=> ({...p, preco: Number(p.preco)})); //agnt aq só vai converter o decimal em numero pq ele vem em string
    }
    async function buscarPorId(id) {
        const [linhas] = await pool.query('SELECT * FROM produtos WHERE id = ?', [id]); //esse placeholder(?) ajuda contra o sql injection
        if (linhas.length === 0) return null;
        return {...linhas[0], preco: Number(linhas[0].preco)};
        //aqui nesse return agnt verifica se a query tem alguma resposta, e se nao tiver (ou seja length === 0) retorna null, e se não ela retorna a linha em si, e depois transformamos o decimal em número, e retornamos apenas o primeiro resultado
    }
    async function criar(produto) {
        const sql = 'INSERT INTO produtos (nome, preco, estoque, categoria) VALUES (?, ?, ?, ?)';
        const valores = [produto.nome, produto.preco, produto.estoque, produto.categoria];
        const [resultado] = await pool.query(sql, valores) //a sintaxe de pool.query (ele ja trabalha com sql injection) é pool.query(comandos com placeholder, array com os valores respectivos dos placeholders)
        return{...produto, id: resultado.insertId}; //insertId é uma função orgânica do mySQL que retorna automaticamente retorna uma variavl aonde consta o ultimo id criado
    }

    return {listarTodos, buscarPorId, criar};
}