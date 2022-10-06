let valor = 0
const tabela = document.querySelector('table.orcamentos')
const thead = tabela.querySelector('thead')
const tbody = tabela.querySelector('tbody')

const search = document.querySelector('.search')
const inputSearch = document.querySelector('input')

const bgShowProdutos = document.querySelector('.bgShowProdutos')
const tableProdu = bgShowProdutos.querySelector('table')

const bgShowAlteracoes = document.querySelector('.bgShowAlteracoes')
const listAlteracoes = bgShowAlteracoes.querySelector('ul')

let ConsultarProdutosBd = IdProduto =>{
    for (const produto of inventario.inventario) {
        if(produto.id === IdProduto)
            return produto
    }
}

let ConsultarUsuarios = IdUsuario =>{
    for (const usuario of usuarios.usuarios) {
        if(usuario.id === IdUsuario)
            return usuario.user.nome
    }
}

let verificarUserProduto = () =>  
        (!!Dadoslogin && (ConsoltarBaseUsuarioResources(JSON.parse(Dadoslogin))[0].toString().includes("produtos"))) ? true : false

        
if(!verificarUserProduto()) tableProdu.querySelector('.localizacao').remove()

let ShowProdutos = produtos =>{
    createLoading(document.querySelector('body')).creat()
    tableProdu.querySelector('tbody').innerHTML = ''
    for (let produto of produtos) {
        let item = ConsultarProdutosBd(produto.id)
        let prod = `<td>
                        <img src="${item.src !== '' ? item.src : "/Almoxarifado/assets/img/noImg.png"}">
                    </td>
                    <td>${item.descricao}</td>
                    ${verificarUserProduto() === true ? `<td>${item.localizacao ? item.localizacao : 'Sem localização'}</td>` : ''}
                    <td>${produto.quantidade}</td>
                    <td>${item.valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
                    `
        tableProdu.querySelector('tbody').innerHTML += prod
    }
    bgShowProdutos.classList.remove('hidden')
    createLoading(document.querySelector('body')).remove()
}

bgShowProdutos.querySelector('.close').addEventListener('click',()=>{
    bgShowProdutos.classList.add('hidden')
    tableProdu.querySelector('tbody').innerHTML = ''
})

let statusPast = type =>{
    if(type === 'expired'){
        return 'Expirado'
    }
    if(type === 'creat'){
        return 'Criou'
    }
    if(type === 'cancel'){
        return 'Cancelou'
    }
    if(type === 'altered'){
        return 'Alterou'
    }
    if(type === 'finaly'){
        return 'Finalizou'
    }
}

let ShowAlteracoes = alteracoes =>{
    listAlteracoes.innerHTML = ''
    for (let alteracao of alteracoes) {
        let user = !!alteracao.idUser ? ConsultarUsuarios(alteracao.idUser) : 'Sistema'
        listAlteracoes.innerHTML += `
                        <li class="${alteracao.type}">
                            <time datetime="${dateTimeToUTC(alteracao.dataCreat)}">${dateTimeToUTC(alteracao.dataCreat)}</time> 
                            <span><strong>${Capitalize(user)}</strong> ${statusPast(alteracao.type)} ${!!alteracao.motivo ? `<p>${alteracao.motivo}</p>` : ''}</span>
                        </li>
                        `
    }
    bgShowAlteracoes.classList.remove('hidden')
}

bgShowAlteracoes.querySelector('.close').addEventListener('click',()=>{
    bgShowAlteracoes.classList.add('hidden')
    listAlteracoes.innerHTML = ''
})

let cancelPedido = ()=>{
    showMessageBox().showMessage({
        type: 'danger',
        title: 'Cancelar orçamento',
        boxInput: {
            textarea: true,
            text:  'Informe o motivo da cancelamento!'
        },
        accept:{
            function: (BoxMessage)=>{ console.log(BoxMessage.objeto.texto)},
            text: 'Cancelar'
        }
    })
}

let finalyPedido = (id) =>{
    console.log(id)
}

for (const newPedido of pedidos.pedidos) {
    valor = 0

    for (const produto of newPedido.produtos) {
        valor += ConsultarProdutosBd(produto.id).valor * produto.quantidade
    }
    const card = document.createElement('tr')
    card.dataset.item = JSON.stringify(newPedido)
    const cardContent = `
                        <td>${leftPad(newPedido.numero, 6)}</td>
                        <td><span class="${newPedido.status}">${Capitalize(newPedido.status)}</span></td>
                        <td><span>Produtos</span><span class="material-symbols-sharp expanProdu">expand_more</span></td>
                        <td>${valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
                        <td>${dateTimeToUTC(newPedido.dataCreat)}</td>
                        <td>${dateTimeToUTC(newPedido.dataLastAlt)}</td>
                        <td>Alterações<span class="material-symbols-sharp expandAlter">expand_more</span></td>
                        <td>
                            ${newPedido.status === 'pendente'? `
                                <span class="material-symbols-sharp download">download</span>
                                <span class="material-symbols-sharp finaly">done</span>
                                <span class="material-symbols-sharp cancel">cancel</span>
                            ` : '<span class="material-symbols-sharp download">download</span>'}
                        </td>
                        `
    card.innerHTML = cardContent;
    tbody.appendChild(card);
    card.querySelector('.expanProdu').addEventListener('click',()=>{
        ShowProdutos(newPedido.produtos)
    })
    card.querySelector('.expandAlter').addEventListener('click',()=>{
        ShowAlteracoes(newPedido.alteracoes)
    })
    if(!!card.querySelector('.cancel'))
    card.querySelector('.cancel').addEventListener('click',()=>{
        showMessageBox().showMessage({
            type: 'danger',
            title: 'Cancelar pedido',
            text: `Realmente deseja cancelar o orçamento de número: <br/><strong>${leftPad(newPedido.numero, 6)}</strong>?`,
            accept:{
                function: ()=>{ cancelPedido(newPedido)},
                text: 'Sim'
            }
        })
    })
    if(!!card.querySelector('.finaly'))
    card.querySelector('.finaly').addEventListener('click',()=>{
        showMessageBox().showMessage({
            type: 'warning',
            title: 'Finalizar pedido',
            text: `Realmente deseja finalizar o orçamento de número: <br/><strong>${leftPad(newPedido.numero, 6)}</strong>?`,
            accept:{
                function: ()=>{ finalyPedido(newPedido.numero)},
                text: 'Finalizar'
            }
        })
    })
    if(!!card.querySelector('.download'))
    card.querySelector('.download').addEventListener('click',()=>{
        showMessageBox().showMessage({
            type: 'success',
            title: 'Download pedido',
            text: `Deseja fazer o download do pedido de número: <br/><strong>${leftPad(newPedido.numero, 6)}</strong>?`,
            accept:{
                function: ()=>{
                    createLoading(document.querySelector('body')).creat()
                    DownloadPedido(newPedido)
                    createLoading(document.querySelector('body')).remove()
                },
                text: 'Download'
            }
        })
    })
}



let SearchPedidos = ()=>{
    for (const tr of tbody.querySelectorAll('tr')) {
        let item = JSON.parse(tr.dataset.item)
        if(!inputSearch.value){
            tr.classList.remove('hidden')
        }else{
            if(item.numero === +inputSearch.value)
                tr.classList.remove('hidden')
            else
                tr.classList.add('hidden')
        }
    }
}

search.addEventListener('click',()=>{SearchPedidos()})
inputSearch.addEventListener("keypress", (event) => {if(event.key === "Enter") SearchPedidos()});