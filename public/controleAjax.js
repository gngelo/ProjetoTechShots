function execHome() {
             let h='<h1>Noticias do mundo</h1>';
             
                 
            $('#tela_inicial').html(h);
            $('#tela_inicial').show ();
           
            $('#tela_noticia').hide ();            
            $('#tela_conteudo').hide();
            $('#tela_inicial').hide();
            $('#tela_pesquisa').hide();
            $('#tela_fontes').hide();
            
}

function execHeadlines() {
    $.ajax({
        url: 'https://newsapi.org/v2/top-headlines?country=us&apiKey=1562820b9cfb4eb1a8cee664b129c26a',
        success: function (dados, status, req) {
            let texto = '<h1> Link da 5 primeiras noticias </h1>';
            let conteudo = '<h1> Resultados da Pesquisa </h1>';
            for (i = 0; i < 5; i++) {
                texto += `<p><a href="#">${dados.articles[i].url}</a></p>`;
                conteudo += `<p>${dados.articles[i].title}<br>
                             Noticia: ${dados.articles[i].description}<br>
                             Autor: ${dados.articles[i].author}</p>`
            }
            $('#tela_noticia').html(texto);
            $('#tela_noticia').show ();
            $('#tela_conteudo').html(conteudo);
            $('#tela_conteudo').show();
            $('#tela_inicial').hide();
            $('#tela_pesquisa').hide();
            $('#tela_fontes').hide();
        }
    });
}

function execPesquisa() {
    let query = $('#query').val();
    $.ajax({

        url: `https://newsapi.org/v2/everything?q=${query}&apiKey=1562820b9cfb4eb1a8cee664b129c26a`,
        success: function (dados, status, req) {
            let texto = `<h1> Resultados da pesquisa :${query}</h1>`;
            for (i = 0; i < 5; i++) {
                texto += `<h2>${dados.articles[i].title}</h2>
                       <p>${dados.articles[i].author}<br>
                        ${dados.articles[i].description}</p>`;
            }
            $('#tela_pesquisa').html(texto);
            $('#tela_pesquisa').show();
            $('#tela_inicial').hide();
            $('#tela_noticia').hide();
            $('#tela_conteudo').hide();
            $('#tela_fontes').hide();
            
        }
    });
}

function execFontes() {
    $.ajax({

        url: `https://newsapi.org/v2/sources?apiKey=f77843a5690f4ef491ddc3135be91e35`,
        success: function (dados, status, req) {
            let texto = `<h1> Resultados da pesquisa por fontes</h1>`;
            for (i = 0; i < 5; i++) {
                texto += `<h2>${dados.sources[i].name}</h2>
                       <p>${dados.sources[i].description}<br>
                       <a href="#">${dados.sources[i].url}</a></p>`;
                
            }
            $('#tela_fontes').html(texto);
            $('#tela_fontes').show();            
            $('#tela_inicial').hide();
            $('#tela_noticia').hide();
            $('#tela_conteudo').hide();
            $('#tela_pesquisa').hide();
        }
    });
}
$('#Home').click(execHome);
$('#Noticias').click (execHeadlines);
$('#Pesquisar').click (execPesquisa);
$('#Fontes').click (execFontes);