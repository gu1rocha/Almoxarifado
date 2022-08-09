inventario.inventario.forEach(item => {
    console.log(item.img !== undefined ? item.src : "./assets/img/noImg.png")
    const card = document.createElement('div');
    card.classList.add('card')
    const cardContent = `
                        <img src="${item.src !== undefined ? item.src : "./assets/img/noImg.png"}">
                        <h3>${item.descricao}</h3>
                        <h4>${item.quantidade} UND</h4>
                        `
    card.innerHTML = cardContent;
    document.querySelector('.cards').appendChild(card);
})
