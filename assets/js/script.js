
const searchBar = document.querySelector(".search-bar");

const search = searchBar.querySelector(".search");
const inputSearch = searchBar.querySelector("input");

const cards = document.querySelector('.cards');
const noFound = document.querySelector('.noFound');

const download = document.querySelector('.download-button');
const finalyOrcamento = document.querySelector('.finalyOrcamento')

function alterar_url(nova){
    history.pushState({}, null, nova);
}

const urlParams = new URLSearchParams(location.search)

let SearchProducts = () => {
    if(inputSearch.value.length > 0){
        alterar_url(location.origin+location.pathname+`?p=${inputSearch.value.toLowerCase()}`)
        searchBar.classList.remove('error')
        let cont = 0;
        for(let card of cards.querySelectorAll(".card")){
            if(StringtoSearch(card.querySelector('h3').textContent.toLowerCase()).includes(StringtoSearch(inputSearch.value.toLowerCase()))){
                cont++
                card.classList.remove('hidden')
            }else{
                card.classList.add('hidden')
            }
        }
        if(cont > 0){
            noFound.classList.add('hidden')
        }else{
            noFound.classList.remove('hidden')
        }
    }else{
        alterar_url(location.origin+location.pathname)
        for(let card of cards.querySelectorAll(".card")){card.classList.remove('hidden')}
        noFound.classList.add('hidden')
    }
}

if(urlParams.get('p') !== ''){
    inputSearch.value = urlParams.get('p')
    SearchProducts()
}

let Orcamento = {}

let verificarUser = () =>  (!!Dadoslogin && (ConsoltarBaseUsuarioResources(JSON.parse(Dadoslogin))[0].toString().includes("orcamentos"))) ? true : false

if(!!urlParams.get('o') && verificarUser()){
    for (const orcamento of orcamentos.orcamentos) {
        if(orcamento.id === +urlParams.get('o')) {
            Orcamento = orcamento 
            break
        }
    }
    for (const produto of Orcamento.produtos) {
        let newProduto = {}
        for (const iterator of inventario.inventario) {
            if(iterator.id === produto.id){
                newProduto = iterator
                break
            }
        }
        addItemOrcamento(newProduto, produto.quantidade)
    }
    finalyOrcamento.innerText = 'Atualizar Orçamento'

    finalyOrcamento.addEventListener('click',()=>{
        card.querySelector('.finaly').addEventListener('click',()=>{
            showMessageBox().showMessage({
                type: 'warning',
                title: 'Finalizar orçamento',
                text: `Realmente deseja ataluzar o orçamento de número: <br/><strong>${leftPad(Orcamento.id, 6)}</strong>?`,
                accept:{
                    function: ()=>{ finalyOrcamento(Orcamento.id)},
                    text: 'Sim'
                }
            })
        })
    })
}

search.addEventListener('click',SearchProducts)

inputSearch.addEventListener("keypress", (event) => {if(event.key === "Enter") SearchProducts()});

download.addEventListener('click', ()=>{
    createLoading(document.querySelector('body')).creat()
    genPDF(); 
    createLoading(document.querySelector('body')).remove()
})
