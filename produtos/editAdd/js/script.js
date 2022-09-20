let idProduto = new URLSearchParams(location.search).get('p')
let NamePage = document.querySelector('nav').querySelector('.nome')
let salvarProd = document.getElementById('salvarProd')
let Produto = {}
let DadosProduto = {}
let erro = false

let ValidarDados = (element, erro) => {
    if(element.value.length <= 0){
        element.classList.add('error')
        return true
    }
    element.classList.remove('error')
    return erro
}

let SalvarProduto = () =>{
    erro = ValidarDados(document.querySelector('#desProd'), erro)
    erro = ValidarDados(document.querySelector('#qtdProd'), erro)
    erro = ValidarDados(document.querySelector('#uniProd'), erro)
    erro = ValidarDados(document.querySelector('#valProd'), erro)
    erro = ValidarDados(document.querySelector('#locProd'), erro)
    
    if(!erro){
        DadosProduto = {
            codigo: document.querySelector('#codProd').value,
            descricao: document.querySelector('#desProd').value,
            quantidade: document.querySelector('#qtdProd').value,
            unidade: document.querySelector('#uniProd').value,
            valor: document.querySelector('#valProd').value,
            localizacao: document.querySelector('#locProd').value,
            src: document.querySelector('img').src
        }
    }else{
        showMessageBox({
            type: 'danger',
            title: 'Dados incompletos',
            text: `Para atualizar preencha os campos obrigatórios!`
        })
    }
}

let AtualizarProduto = () =>{
    erro = ValidarDados(document.querySelector('#desProd'), erro)
    erro = ValidarDados(document.querySelector('#qtdProd'), erro)
    erro = ValidarDados(document.querySelector('#uniProd'), erro)
    erro = ValidarDados(document.querySelector('#valProd'), erro)
    erro = ValidarDados(document.querySelector('#locProd'), erro)
    
    if(!erro){
        DadosProduto = {
            codigo: document.querySelector('#codProd').value,
            descricao: document.querySelector('#desProd').value,
            quantidade: document.querySelector('#qtdProd').value,
            unidade: document.querySelector('#uniProd').value,
            valor: document.querySelector('#valProd').value,
            localizacao: document.querySelector('#locProd').value,
            src: document.querySelector('img').src
        }
    }else{
        showMessageBox({
            type: 'danger',
            title: 'Dados incompletos',
            text: `Para atualizar preencha os campos obrigatórios!`
        })

    }
}

if(idProduto > 0){
    document.title = "Editar Produto"
    NamePage.innerText = "Editar Produto"
    for (const iterator of inventario.inventario) {
        if(iterator.id === +idProduto) {
            Produto = iterator 
            break
        }
    }

    document.querySelector('#codProd').value = Produto.codigo
    document.querySelector('#desProd').value = Produto.descricao
    document.querySelector('#qtdProd').value = Produto.quantidade
    document.querySelector('#uniProd').value = Produto.unidade
    document.querySelector('#valProd').value = Produto.valor
    !!Produto.localizacao ? document.querySelector('#locProd').value = Produto.localizacao : ''
    document.querySelector('img').src = Produto.src !== '' ? Produto.src : "/Almoxarifado/assets/img/noImg.png"

    salvarProd.addEventListener('click',()=>{
        showMessageBox({
            type: 'warning',
            title: 'Atualização de dados',
            text: `Realmente deseja <strong>atualizar</strong> o produto?`,
            accept:{
                function : function(){
                    AtualizarProduto()
                },
                text: 'Atualizar'
            }
        })
    })

}else{
    document.title = "Adicionar Produto"
    NamePage.innerText = "Adicionar Produto"

    salvarProd.addEventListener('click',()=>{
        showMessageBox({
            type: 'warning',
            title: 'Salvar dados',
            text: `Realmente deseja <strong>cadastrar</strong> o produto?`,
            accept:{
                function : function(){
                    SalvarProduto()
                },
                text: 'Atualizar'
            }
        })
    })
}