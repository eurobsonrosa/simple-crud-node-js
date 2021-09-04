//incluindo bibliotecas
const http = require('http');
const url = require('url');
const queryString = require('query-string');
const fs = require('fs');

//definindo ip e porta
const hostname = '127.0.0.1'; //localhost
const port = 3000;

//implementação da regra de negócio
const server = http.createServer((req, res) => {

  var resposta;
  const urlparse = url.parse(req.url, true);
  
  //receber informacoes do usario
  const params = queryString.parse(urlparse.search);

  //cadastrar usuario - atualizar asuario
  if(urlparse.pathname == '/criar-atualizar-usuario'){

    //salvar as inforamcoes
    fs.writeFile('users/'+params.id+'.txt',JSON.stringify(params), function (err) {
      if (err) throw err;
      console.log('Saved!');
      resposta = 'Usuario criado/atualizado com sucesso'
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(resposta);});  
  }
  
  //Selecionar usuario
  else if (urlparse.pathname == '/selecionar-usuario'){
    fs.readFile('users/'+params.id+'.txt', function(err, data) {
      resposta = data;
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(resposta);});  
  }

  //remover usuario
  else if (urlparse.pathname == '/excluir-usuario'){
    fs.unlink('users/'+params.id+'.txt', function (err) {
    console.log('File deleted!');
    resposta = err ? "usuario nao encontrado." : "usuario removido.";
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(resposta);});
    }
});

//Execução
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})

//URLS PARA TESTAR APLICACAO

//http://localhost:3000/criar-atualizar-usuario?nome=robson&idade=25&id=1
//http://localhost:3000/criar-atualizar-usuario?nome=robson&idade=27&id=1
//http://localhost:3000/selecionar-usuario?id=1
//http://localhost:3000/excluir-usuario?id=1