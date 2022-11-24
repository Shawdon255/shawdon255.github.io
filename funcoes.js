
adicionaEventoPesquisa();


// INDEX //

// Função para preencher cards do Lançamentos com a API
function preencheLancamentos() {

    let limiteCardsLanc = 12;
    let string = "";
    let nome = "";

    // Abordagem JQUERY
    $.ajax({
        url: 'https://api.rawg.io/api/games?key=4468cfa18c92494999e7f34e96f87b34&ordering=-released&metacritic=85,100'
    })
    .done (response => {
        if (response.count >= limiteCardsLanc) {
            for (let i = 0; i < limiteCardsLanc; i++) {
                nome = limitaNome(response.results[i].name,20);

                string += `<div class="col-xl-3 col-lg-4 col-md-6 col-12">
                                <div class="card" >
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-9">
                                                <h5 class="card-title">${nome}</h5>
                                            </div>
                                            <div class="col-3">
                                                <h5 class="card-title card-nota">${response.results[i].metacritic}</h5>
                                            </div>
                                        </div>
                                        <img src=${response.results[i].background_image} class="lancamentos-imagem" alt="Imagem do jogo ${response.results[i].name}">
                                        <h5 class="card-lancamento">Lançado em: ${response.results[i].released.substring(8,10)}/${response.results[i].released.substring(5,7)}/${response.results[i].released.substring(0,4)}</h5>
                                        <a href="detalhes.html?id=${response.results[i].id}" >Mais detalhes ...</a>
                                    </div>
                                </div>   
                            </div>`;
            }// fim for
            
            //inclui no final da div de Lançamentos o último botão
            string +=   `<div class="col-12 botao-lanc">
                            <button type="button" class="btn btn-dark"> <i class="fa-regular fa-plus"></i>Carregar mais lançamentos</button>
                        </div>`
            
            document.getElementById("blocoLancamento").innerHTML += string;
        }// fim if
    });

}// fim preencheLancamentos()

// Função para preencher cards do Publishers com a API
function preenchePublishers() {

    let limiteCardsPub = 3;
    let limiteJogosCardPub = 3;
    let string = "";
    let nomePub = "";
    let nomeJogos = [];

    // Abordagem JQUERY
    $.ajax({
        url: 'https://api.rawg.io/api/publishers?key=4468cfa18c92494999e7f34e96f87b34'
    })
    .done (response => {
        if (response.count >= limiteCardsPub) {
            for (let i = 0; i < limiteCardsPub; i++) {
                nomePub = limitaNome(response.results[i].name,30);
                for (let j = 0; j < limiteJogosCardPub; j++) {
                    if (response.results[i].games.length > j)
                        nomeJogos[j] = limitaNome(response.results[i].games[j].name,25);
                    else {
                        nomeJogos[j] = "sem jogo...";
                    }//fim if else
                }// fim for

                string += ` <div class="col-lg-4 col-md-6 col-12">
                                <div class="card">
                                    <div class="card-body">
                                    <h5 class="card-title">${nomePub}</h5>
                                    <img src=${response.results[i].image_background} class="publisher-imagem" alt="${response.results[i].name}">
                                    <h6>Principais Jogos</h6>
                                    <ul>
                                        <li>${nomeJogos[0]}</li>
                                        <li>${nomeJogos[1]}</li>
                                        <li>${nomeJogos[2]}</li>
                                    </ul>
                                    <a href="#" >Mais detalhes ...</a>
                                    </div>
                                </div>   
                            </div>`;
            }// fim for
            
            //inclui no final da div de Publishers o último botão
            string +=   `<div class="col-12 botao-publ">
                            <button type="button" class="btn btn-dark"> <i class="fa-regular fa-plus"></i> Carregar mais publishers</button>
                        </div>  `
            
            document.getElementById("blocoPublishers").innerHTML += string;
        }// fim if
    });

}// fim preenchePublishers()

// Funcao para delimitar o tamanho do nome
function limitaNome(nomeJogo, tamanho) {

    let nomeJogoCortado = "";

    if (nomeJogo.length > tamanho) {
        nomeJogoCortado = nomeJogo.substring(0,tamanho-1) + " ..";
    } else {
        nomeJogoCortado = nomeJogo;
    } // fim if else

    return nomeJogoCortado;

}// fim limitaNome(nomeJogo)



// Função para preencher detalhes do jogo recebido com a API
function preencheDetalhesJogo() {

    //recupera id da query string
    const urlParams = new URLSearchParams(location.search);
    let idJogo = parseInt(urlParams.get('id'))

    let string = "";
    let nome = "";

    // Abordagem JQUERY
    $.ajax({
        url: `https://api.rawg.io/api/games/${idJogo}?key=4468cfa18c92494999e7f34e96f87b34`
    })
    .done (response => {
        //nome = limitaNome(response.results[i].name,30);

        string += ` <div class="col-12 titulo-detalhe">
                        <h1>${response.name}</h1>
                    </div>

                    <div class="row">
                        <div class="col-lg-7 col-12 detalhe-imagem">
                            <img src=${response.background_image} class="detalhe-img-jogo" alt="Imagem do jogo ${response.name}">
                        </div>

                        <div class="col-lg-5 col-12">
                            <p class="detalhe-p-first"> <span class="detalhe-caracteristicas">Sobre:</span> ${response.description_raw} </p>`;

        string += ` 
                        <p class="detalhe-carac-publ"> <span class="detalhe-caracteristicas">Publisher:</span> ${buscaPublishers(response)}</p>`;

        string += ` 
                        <p class="detalhe-carac-lanc"> <span class="detalhe-caracteristicas">Lançamento:</span> ${response.released.substring(8,10)}/${response.released.substring(5,7)}/${response.released.substring(0,4)} </p>`;

        string += ` 
                        <p> <span class="detalhe-caracteristicas">Plataformas:</span> ${buscaPlataformas(response)} </p>`;
        
        string += ` 
                        <p> <span class="detalhe-caracteristicas">Gênero:</span> ${buscaGenero(response)} </p>`;

        string += ` 
                        <p class="detalhe-p-last"> <span class="detalhe-caracteristicas">Avaliação:</span> <span class="detalhe-avaliacao"> ${response.metacritic}</span> </p>
                    </div>
                </div>`;
    
        document.getElementById("blocoDetalhes").innerHTML += string;
    });

}// fim preencheDetalhesJogo()

// DETALHES //

//Funcao para montar lista com publishers no detalhe
function buscaPublishers(jogo) {

    let publishers = "";

    for (let i = 0; i < jogo.publishers.length-1; i++) {
        publishers += `${jogo.publishers[i].name}, `;
    }// fim for

    if (jogo.publishers.length > 0) {
        publishers += jogo.publishers[jogo.publishers.length-1].name;
    } else { 
        publishers = "Não fornecido..";
    } // fim if else

    return publishers;
}// fim buscaPublishers(jogo)

//Funcao para montar lista com plataformas no detalhe
function buscaPlataformas(jogo) {

    let plataformas = "";

    for (let i = 0; i < jogo.platforms.length-1; i++) {
        plataformas += `${jogo.platforms[i].platform.name}, `;
    }// fim for

    if (jogo.platforms.length > 0) {
        plataformas += jogo.platforms[jogo.platforms.length-1].platform.name;
    } else { 
        plataformas = "Não fornecido..";
    } // fim if else

    return plataformas;
}// fim buscaPlataformas(jogo)

//Funcao para montar lista com generos no detalhe
function buscaGenero(jogo) {

    let generos = "";

    for (let i = 0; i < jogo.genres.length-1; i++) {
        generos += `${jogo.genres[i].name}, `;
    }// fim for

    if (jogo.genres.length > 0) {
        generos += jogo.genres[jogo.genres.length-1].name;
    } else { 
        generos = "Não fornecido..";
    } // fim if else

    return generos;
}// fim buscaGenero(jogo)


// PESQUISA //

//Funcao para adicionar evento na caixa de pesquisa
function adicionaEventoPesquisa() {

    const butaoPesquisa = document.querySelector('.realizar_pesquisa');
    const caixaPesquisa = document.querySelector('.texto_pesquisa');

    butaoPesquisa.addEventListener("click", (evento) => {
        let pesquisa = caixaPesquisa.value;
        location.href = `pesquisa.html?search=${pesquisa}`;
        evento.preventDefault();
    })

}// fim adicionaEventoPesquisa()

//Funcao para adicionar evento na caixa de pesquisa para mobile
function adicionaEventoPesquisaMobile() {

    const butaoPesquisa = document.querySelector('.realizar_pesquisa_mobile');
    const caixaPesquisa = document.querySelector('.texto_mobile_pesquisa');

    butaoPesquisa.addEventListener("click", (evento) => {
        let pesquisa = caixaPesquisa.value;
        location.href = `pesquisa.html?search=${pesquisa}`;
        evento.preventDefault();
    })

}// fim adicionaEventoPesquisaMobile()

// Função para preencher cards da Pesquisa com a API
function preenchePesquisa() {

    //recupera pesquisa da query string
    const urlParams = new URLSearchParams(location.search);
    let stringPesquisa = urlParams.get('search');

    let limiteCardsPesq = 20;
    let string = "";
    let nome = "";

    if (stringPesquisa.length > 0) {

        // Abordagem JQUERY
        $.ajax({
            url: `https://api.rawg.io/api/games?key=4468cfa18c92494999e7f34e96f87b34&ordering=-released&metacritic=1,100&search=${stringPesquisa}&search_precise=true`
        })
        .done (response => {
            if (response.count < limiteCardsPesq) {
                limiteCardsPesq = response.count;
            }// fim if
            for (let i = 0; i < limiteCardsPesq; i++) {
                nome = limitaNome(response.results[i].name,20);

                string += `<div class="col-xl-3 col-lg-4 col-md-6 col-12">
                                <div class="card" >
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-9">
                                                <h5 class="card-title">${nome}</h5>
                                            </div>
                                            <div class="col-3">
                                                <h5 class="card-title card-nota">${response.results[i].metacritic}</h5>
                                            </div>
                                        </div>
                                        <img src=${response.results[i].background_image} class="pesquisa-imagem" alt="Imagem do jogo ${response.results[i].name}">
                                        <h5 class="card-pesquisa">Lançado em: ${response.results[i].released.substring(8,10)}/${response.results[i].released.substring(5,7)}/${response.results[i].released.substring(0,4)}</h5>
                                        <a href="detalhes.html?id=${response.results[i].id}" >Mais detalhes ...</a>
                                    </div>
                                </div>   
                            </div>`;
            }// fim for
            
            document.getElementById("blocoPesquisa").innerHTML += string;
        });
        
    }// fim if

}// fim preenchePesquisa()