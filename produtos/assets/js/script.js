const tabela = document.querySelector('table')
const tbody = tabela.querySelector('tbody')

inventario.inventario.forEach(item => {
    const card = document.createElement('tr')
    card.dataset.item = JSON.stringify(item)
    const cardContent = `
                        <td>${item.codigo}</td>
                        <td><img src="${item.src !== '' ? item.src : "/Almoxarifado/assets/img/noImg.png"}"></td>
                        <td>Categoria</td>
                        <td>Localização</td>
                        <td>${item.descricao}</td>
                        <td>${item.quantidade}</td>
                        <td>${item.unidade}</td>
                        <td>${item.valor}</td>
                        `
    card.innerHTML = cardContent;
    tbody.appendChild(card);
})