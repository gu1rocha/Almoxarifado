const boxCards = document.querySelector('.cards')
const inventory = document.querySelector('.inventory')
const boxOrcamento = document.querySelector('.boxOrcamento')
const orcamentoLocal = boxOrcamento.querySelector('.orcamentos')

const total = document.querySelector('.total')

inventario.inventario.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card')
    card.dataset.item = JSON.stringify(item)
    const cardContent = `
                        
                        <img src="${item.src !== '' ? item.src : "./assets/img/noImg.png"}">
                        <h3>${item.descricao}</h3>
                        <div class="bottom">
                            <div>
                                <span>${item.valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
                                <span>${item.quantidade} UND</span>
                            </div>
                            <button>Add <span class="material-symbols-sharp">inventory</span> </button>
                        </div>
                        `
    card.innerHTML = cardContent;
    boxCards.appendChild(card);
})

let orcamentoList = [];
let orcQtd = ''
let valorTotal = 0

let altualizarTotal = () => {
    valorTotal = 0
    for (const orc of document.querySelectorAll('.orcamento')) {
        valorTotal += JSON.parse(orc.dataset.item).qtdCompra * JSON.parse(orc.dataset.item).valor
    }
    total.textContent = `Total: ${valorTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`
}

let addItemOrcamento = (item, qtdCompra = 1) => {
    let ProdAtu = (!!item.dataset) ? JSON.parse(item.dataset.item) : (item)
    orcamentoList.push(ProdAtu)
    orcamentoList[orcamentoList.length - 1].qtdCompra = qtdCompra
    setTimeout(()=> {

        let alterarValor = ()=>{
            orcQtd = JSON.parse(orcamentoCard.dataset.item)
            orcQtd.qtdCompra = orcamentoCard.querySelector('input').value
            orcamentoCard.dataset.item = JSON.stringify(orcQtd)
            orcamentoCard.querySelector('.valor').textContent = (orcamentoCard.querySelector('input').value * JSON.parse(orcamentoCard.dataset.item).valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
            if(Number(orcamentoCard.querySelector('input').max) === Number(orcamentoCard.querySelector('input').value)){
                orcamentoCard.querySelector('.plus').classList.add('disabled')
            }else{
                orcamentoCard.querySelector('.plus').classList.remove('disabled')
            }
            if(Number(orcamentoCard.querySelector('input').min) === Number(orcamentoCard.querySelector('input').value)){
                orcamentoCard.querySelector('.minus').classList.add('disabled')
            }else{
                orcamentoCard.querySelector('.minus').classList.remove('disabled')
            }
            altualizarTotal()
        }

        inventory.querySelector('h5').textContent = orcamentoList.length;
        const orcamentoCard = document.createElement('div');
        orcamentoCard.classList.add('orcamento');
        let novoOrc = ProdAtu
        orcamentoCard.dataset.item = JSON.stringify(novoOrc)
        const orcamentoContent = `
                                 <img src="${novoOrc.src !== '' ? novoOrc.src : "./assets/img/noImg.png"}">
                                 <div class="right">
                                    <h3>${novoOrc.descricao}</h3>
                                    <div class="bottom">
                                        <div>
                                            <div class="input-group">
                                                <button type="button" class="circle minus"><span class="material-symbols-sharp">remove</span></button>
                                                <input class="input-group-field" type="number" name="quantity" value="${qtdCompra}" min="1" max="${novoOrc.quantidade}" oninput="validity.valid ? this.save = value : value = this.save;">
                                                <button type="button" class="circle plus"><span class="material-symbols-sharp">add</span></button>
                                            </div>
                                        </div>
                                        <div class="end">
                                            <span class="valor"></span>
                                            <span class="material-symbols-sharp delete">delete</span>
                                        </div>
                                    </div>
                                 </div>
                                 `
                                 
        orcamentoCard.innerHTML = orcamentoContent;
        orcamentoLocal.appendChild(orcamentoCard);
        alterarValor()

        if(orcamentoList.length > 0){
            inventory.querySelector('h5').classList.add('active')
            boxOrcamento.querySelector('.totalDown').classList.remove('hidden')
        }

        orcamentoCard.querySelector('.minus').addEventListener('click',(el)=>{
            if(orcamentoCard.querySelector('input').min < orcamentoCard.querySelector('input').value){
                orcamentoCard.querySelector('input').value = --orcamentoCard.querySelector('input').value
                alterarValor()
            }
        })

        orcamentoCard.querySelector('.plus').addEventListener('click',(el)=>{
            if(Number(orcamentoCard.querySelector('input').max) > Number(orcamentoCard.querySelector('input').value)){
                orcamentoCard.querySelector('input').value = ++orcamentoCard.querySelector('input').value
                alterarValor()
            }
        })

        orcamentoCard.querySelector('input').addEventListener('change',(el)=>{
            if(orcamentoCard.querySelector('input').value > 0){
                alterarValor()
            }
        })

        orcamentoCard.querySelector('.delete').addEventListener('click',el=>{
            let newOrcamento = orcamentoList.filter( item => item.id !== JSON.parse(orcamentoCard.dataset.item).id );
            orcamentoList = newOrcamento;
            orcamentoCard.remove();
            altualizarTotal()
            inventory.querySelector('h5').textContent = orcamentoList.length;
            const cards = boxCards.querySelectorAll('.card')
            
            if(orcamentoList.length < 1){
                boxOrcamento.querySelector('.totalDown').classList.add('hidden')
            }

            for (const card of cards) {
                if(JSON.parse(card.dataset.item).id === JSON.parse(orcamentoCard.dataset.item).id){
                    card.querySelector('button').classList.remove('disabled')
                }
            }
        })

    }, 00);
}

const carts = boxCards.querySelectorAll('button');

for (const cart of carts) {
    cart.addEventListener('click',()=>{
        let clone = cart.offsetParent.cloneNode(true)
        document.querySelector('main').appendChild(clone);
        clone.classList.add('anime')
        cart.classList.add('disabled')
        addItemOrcamento(clone)
        setTimeout(()=> {clone.remove()}, 500);
    })
}

inventory.addEventListener('click',()=>{
    boxOrcamento.classList.add('show')
    document.querySelector('body').classList.add('noScrool')
    boxOrcamento.querySelector('.close').addEventListener('click',()=>{
        boxOrcamento.classList.remove('show')
        document.querySelector('body').classList.remove('noScrool')
    })
})