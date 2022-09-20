const tabela = document.querySelector('table')
const thead = tabela.querySelector('thead')
const tbody = tabela.querySelector('tbody')
const inputSearch = document.querySelector('input')
const search = document.querySelector('.search')

createLoading(document.querySelector('body')).creat()
inventario.inventario.forEach(item => {
    const card = document.createElement('tr')
    card.dataset.item = JSON.stringify(item)
    const cardContent = `
                        <td>${item.codigo}</td>
                        <td><img src="${item.src !== '' ? item.src : "/Almoxarifado/assets/img/noImg.png"}"></td>
                        <td>${item.descricao}</td>
                        <td>Categoria</td>
                        <td>Localização</td>
                        <td>${item.quantidade}</td>
                        <td>${item.unidade}</td>
                        <td>${item.valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
                        <td>
                            <span class="material-symbols-sharp edit" onclick="window.location.href='./editAdd/index.html?p=${item.id}'">edit_square</span>
                            <span class="material-symbols-sharp delet">delete</span>
                        </td>
                        `
    card.innerHTML = cardContent;
    tbody.appendChild(card);
    card.querySelector('.delet').addEventListener('click',()=>{
        showMessageBox({
            type: 'danger',
            title: 'Excluir Produto',
            text: `Realmente deseja excluir o produto: <br/><strong>${item.descricao}</strong>?`,
            accept:{
                function : function(){card.remove()},
                text: 'Excluir'
            }
        })
    })
})
createLoading(document.querySelector('body')).remove()

let SearchProducts = ()=>{
    for (const tr of tbody.querySelectorAll('tr')) {
        let item = JSON.parse(tr.dataset.item)
        if((item.codigo).includes(inputSearch.value) || (StringtoSearch(item.descricao.toLowerCase())).includes(StringtoSearch(inputSearch.value.toLowerCase())))
            tr.classList.remove('hidden')
        else
            tr.classList.add('hidden')
    }
}

search.addEventListener('click',SearchProducts)
inputSearch.addEventListener("keypress", (event) => {if(event.key === "Enter") SearchProducts()});

for (const delet of tbody.querySelectorAll('.delet')) {
    delet.addEventListener('click',()=>{

    })
}