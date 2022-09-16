let idProduto = new URLSearchParams(location.search).get('p')
let NamePage = document.querySelector('nav').querySelector('.nome')
let Produto = {}

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
    document.querySelector('img').src = Produto.src !== '' ? Produto.src : "/Almoxarifado/assets/img/noImg.png"

}else{
    document.title = "Adicionar Produto"
    NamePage.innerText = "Adicionar Produto"
}