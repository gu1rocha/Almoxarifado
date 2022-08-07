inventario.inventario.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card')
    const cardContent = `
                        <img src="${item.img !== undefined ? item.img : "./assets/img/noImg.png"}">
                        <h1>${item.descricao}</h1>
                        <h2>${item.quantidade} UND</h2>
                        `
    card.innerHTML = cardContent;
    document.querySelector('.cards').appendChild(card);
})