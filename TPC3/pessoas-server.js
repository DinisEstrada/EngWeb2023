var http = require('http');
var fs = require('fs');
var url = require('url')
const axios = require('axios')
var mypages = require('./mypages')

http.createServer(function (req,res) {
    
    var d = new Date().toISOString().substring(0,16);
    console.log(req.method + " " + req.url + " " + d);
    
    if(req.url == "/") {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write(mypages.genIndicePage(d))
            res.end()
    }


    else if(/\/w3.css$/.test(req.url)){  
        fs.readFile('w3.css', function(err,data){
            res.writeHead(200,{'Content-Type':'text/css; charset=utf-8'})
            if(err){
                res.write("Erro na leitura do ficheiro: " + err)
            }
            else{
                res.write(data)
            }
        
            res.end()
           })
    }

    else if(req.url == '/pessoas') {
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp) {
            var pessoas = resp.data

            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end(mypages.genMainPage(pessoas,d))
        })

        .catch(erro => {
            console.log("Erro: " + erro)
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: " + erro + "</p>")
        })
    }

    else if (req.url == '/pessoas_ordenadas'){
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){ 
                var pessoas = resp.data 
                let pessoasOrdenadas = pessoas.sort(
                    (p1,p2) => (p1.nome < p2.nome) ? -1 : 1 
                )
                if(pessoas.length != 2000) {console.log("Dataset com o tamanho errado.")} 
                res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
                res.end(mypages.genListaPage(pessoasOrdenadas))
            })
            .catch(erro => { 
                console.log("Erro "+ erro)
                res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
                res.end("<p>Erro  :" + erro + " </p>")
            }) 
    }

    else if (req.url == '/sexo'){

        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){ 
                var pessoas = resp.data 
                if(pessoas.length != 2000) {console.log("Dataset com o tamanho errado.")} 
                res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
                res.end(mypages.genSexoPage(pessoas)) 
            })
            .catch(erro => { 
                console.log("Erro "+ erro)
                res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
                res.end("<p>Erro  :" + erro + " </p>")
            }) 
    }
   else if(req.url.match(/sexo\/\w+/)){
    let aux = req.url.match(/sexo\/\w+/)[0].slice(5)
    axios.get('http://localhost:3000/pessoas?sexo=' +  aux)
            .then(function(resp){ 
                var pessoas = resp.data 
                let pessoasOrdenadas = pessoas.sort(
                    (p1,p2) => (p1.nome < p2.nome) ? -1 : 1
                )
                res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
                res.end(mypages.genSexobySexPage(pessoasOrdenadas)) 
            })
            .catch(erro => { 
                console.log("Erro "+ erro) 
                res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
                res.end("<p>Erro  :" + erro + " </p>")
            }) 
    }


    else if (req.url == '/desporto'){
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){ 
                var pessoas = resp.data 


                res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
                res.end(mypages.genDesportoPage(pessoas)) 
            })
            .catch(erro => { 
                console.log("Erro "+ erro)
                res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
                res.end("<p>Erro :" + erro + " </p>")
            }) 
    }

    else if (req.url.match(/desporto\/[a-zA-Z]+/)){
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){ 
                var pessoas = resp.data 
                let pessoasOrdenadas = pessoas.sort(
                    (p1,p2) => (p1.nome < p2.nome) ? -1 : 1 
                ) 
                
                var desporto = decodeURIComponent(req.url.substring(10))

                var lista = new Array()
            
                pessoasOrdenadas.forEach((p) => {
                    if(p.desportos.includes(desporto)) lista.push(p)
                })

                res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
                res.end(mypages.genListaPage(lista))
            })
            .catch(erro => { 
                console.log("Erro "+ erro)
                res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
                res.end("<p>Erro :" + erro + " </p>")
            }) 
    }


    else if (req.url == '/profissoes'){
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){ 
                var pessoas = resp.data 
                
                res.end(mypages.genProfissoesPage(pessoas)) 
            })
            .catch(erro => { 
                console.log("Erro "+ erro)
                res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
                res.end("<p>Erro  :" + erro + " </p>")
            }) 
    }
    

    else if (req.url.match(/profissoes\/[a-zA-Z]+/)){
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){ 
                var pessoas = resp.data 
                let pessoasOrdenadas = pessoas.sort(
                    (p1,p2) => (p1.nome < p2.nome) ? -1 : 1 
                ) 

                var profissoes = decodeURIComponent(req.url.substring(12))

                var lista = new Array()
            
                pessoasOrdenadas.forEach((p) => {
                    if(p.profissao.includes(profissoes)) lista.push(p)
                })

                res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
                res.end(mypages.genListaPage(lista)) 
            })
            .catch(erro => { 
                console.log("Erro "+ erro)
                res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
                res.end("<p>Erro  :" + erro + " </p>")
            }) 
    }

    else if(req.url.match(/p\d+/)){
        axios.get('http://localhost:3000/pessoas/' + req.url.substring(9))
        .then(function(resp) {
            var pessoa = resp.data
            
        
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end(mypages.genPessoaPage(pessoa,d))
        })

        .catch(erro => {
            console.log("Erro: " + erro)
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end("<p>Erro: " + erro + "</p>")
        })
    }





}).listen(5555)