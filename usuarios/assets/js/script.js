const tabela = document.querySelector('table')
const tbody = tabela.querySelector('tbody')

createLoading(document.querySelector('body')).creat()
usuarios.usuarios.forEach(item => {
    const tr = document.createElement('tr')
    tr.dataset.item = JSON.stringify(item)
    const trContent = `
                        <td>${item.user.nome}</td>
                        <td>${item.user.email}</td>
                        <td><label class="switch"><input type="checkbox" ${item.resources.includes('dashboard') ? 'checked' : ''} ><span class="slider round"></span></label></td>
                        <td><label class="switch"><input type="checkbox" ${item.resources.includes('orcamentos') ? 'checked' : ''} ><span class="slider round"></span></label></td>
                        <td><label class="switch"><input type="checkbox" ${item.resources.includes('pedidos') ? 'checked' : ''} ><span class="slider round"></span></label></td>
                        <td><label class="switch"><input type="checkbox" ${item.resources.includes('produtos') ? 'checked' : ''} ><span class="slider round"></span></label></td>
                        <td><label class="switch"><input type="checkbox" ${item.resources.includes('configuracoes') ? 'checked' : ''} ><span class="slider round"></span></label></td>
                        <td><label class="switch"><input type="checkbox" ${item.resources.includes('usuarios') ? 'checked' : ''} ><span class="slider round"></span></label></td>
                        <td></td>
                        `
    tr.innerHTML = trContent;
    tbody.appendChild(tr);
})
createLoading(document.querySelector('body')).remove()