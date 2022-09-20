let valor = 0
const tabela = document.querySelector('table')
const thead = tabela.querySelector('thead')
const tbody = tabela.querySelector('tbody')

for (const orcamento of orcamentos.orcamentos) {
    valor = 0

    for (const produto of orcamento.produtos) {
        valor += produto.valor
    }
    const card = document.createElement('tr')
    card.dataset.item = JSON.stringify(orcamento)
    const cardContent = `
                        <td>${leftPad(orcamento.numero, 6)}</td>
                        <td><span class="${orcamento.status}">${Capitalize(orcamento.status)}</span></td>
                        <td>Produtos</td>
                        <td>${valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
                        <td>
                            <span class="material-symbols-sharp edit" onclick="window.location.href='./editAdd/index.html?p=${orcamento.id}'">edit_square</span>
                            <span class="material-symbols-sharp delet">delete</span>
                        </td>
                        `
    card.innerHTML = cardContent;
    tbody.appendChild(card);
}