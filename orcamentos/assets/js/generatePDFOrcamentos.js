let DownloadOrcamento = (orcamento) => {
    let doc = new jsPDF('p', 'mm', 'a4', true);
    let pageHeight = doc.internal.pageSize.height

    let changeDateFormat = data => `${data.getDate() < 10 ? `0${data.getDate()}` : data.getDate()}/${(data.getMonth() + 1) < 10 ? `0${data.getMonth() + 1}`: data.getMonth() + 1}/${data.getFullYear()}`
    let changeTimeFormat = data => `${data.getHours() < 10 ? `0${data.getHours()}` : data.getHours()}:${data.getMinutes() < 10 ? `0${data.getMinutes()}` : data.getMinutes()}
                                    `
    let InsertTextoComQuebra = (texto, max, x, y) => doc.text(doc.splitTextToSize(texto, max), x, y)

    let data = new Date(orcamento.dataCreat)
    let validade = new Date(data.setDate(data.getDate() + 1))

    validade = changeDateFormat(validade)

    let time = changeTimeFormat(data)

    data = changeDateFormat(data)

    const addFooters = doc => {
        const pageCount = doc.internal.getNumberOfPages()
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i)
            
            doc.setFont('helvetica', 'italic')
            doc.setFontSize(8)
            doc.setFontStyle('bold');
            doc.text('Página ' + String(i) + ' de ' + String(pageCount), doc.internal.pageSize.width / 1.05, 293, {align: 'right'})
        }           
    }

    doc.page=1;
    
    doc.setFontSize(10)
    doc.setFont('times');
    doc.setFontStyle('bold');

    
    doc.rect(7, 25, 195, 30);

    let img = new Image()
    img.src = './../assets/img/escurial.png'
    doc.addImage(img, 'PNG', 9, 35, 34, 9.605)

    let imgItem = new Image()

    doc.setFontSize(14)
    doc.text('Cerâmica Sergipe Indústria e Comercio LTDA',106, 41, null, null,'center')

    doc.setFontSize(10)
    
    doc.line(168, 25, 168, 55)

    doc.text('Criado em', doc.internal.pageSize.width - 17 / 1.05, 30 ,{align: 'right'})
    
    doc.setFontStyle('normal');
    doc.text(`${data} às ${time}`, doc.internal.pageSize.width - 11 / 1.05, 35 ,{align: 'right'})

    doc.setFontStyle('bold');
    doc.text('Valido até', doc.internal.pageSize.width - 17 / 1.05, 42 ,{align: 'right'})

    doc.setFontStyle('normal');
    doc.text(`${validade} às ${time}`, doc.internal.pageSize.width - 11 / 1.05, 47 ,{align: 'right'})

    let y = 70

    doc.setFillColor(220,220,220);
    doc.rect(7, y-4.8, 195, 6.75, 'F');
    doc.setTextColor(0, 0, 0);

    doc.line(7, y-5, 202, y-5)

    doc.line(7, y-5, 7, y+2)
    doc.text("IMAGEM", 9.5, y)

    doc.line(26.5, y-5, 26.5, y+2)
    doc.text("DESCRIÇÃO", 70, y)

    doc.line(132, y-5, 132, y+2)
    doc.text("QTD", doc.internal.pageSize.width - 70 / 1.05, y, {align: 'right'})

    doc.line(147, y-5, 147, y+2)
    doc.text("VALOR UNIT.", doc.internal.pageSize.width - 39 / 1.05, y, {align: 'right'})

    doc.line(177, y-5, 177, y+2)
    doc.text("TOTAL", doc.internal.pageSize.width - 15.5 / 1.05, y, {align: 'right'})

    doc.line(202, y-5, 202, y+2)
    doc.line(7, y+2, 202, y+2)
    
    y += 5

    let valorTotalPDF = 0
    
    async function showProdtosOrcamento(produtos){
        for (const newProduto of produtos) {
            let item = ConsultarProdutosBd(newProduto.id)
    
            imgItem = await asyncImageLoader(item.src !== '' ? item.src : "./../assets/img/noImg.png") 
    
            let proporcao = 0
            if(imgItem.naturalHeight > imgItem.naturalWidth){
                proporcao = (15*imgItem.naturalWidth) / imgItem.naturalHeight
                doc.addImage(imgItem, 'JPEG', 16.75 - (proporcao/2), y, proporcao, 15, undefined, 'FAST')
            }else{
                proporcao = (15*imgItem.naturalHeight) / imgItem.naturalWidth
                doc.addImage(imgItem, 'JPEG', 9.25, y + 7 - (proporcao/2), 15, proporcao, undefined, 'FAST')
            }
    
            InsertTextoComQuebra(item.descricao, 100, 28, y+5)
    
            doc.text(
                (newProduto.quantidade).toLocaleString(), doc.internal.pageSize.width - 70 / 1.05, y+5, {align: 'right'}
            )
    
            doc.text(
                (item.valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}),
                doc.internal.pageSize.width - 41 / 1.05, y+5, {align: 'right'}
            )
    
            doc.text(
                (newProduto.quantidade * item.valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}),
                doc.internal.pageSize.width - 11 / 1.05, y+5, {align: 'right'}
            ) 
            valorTotalPDF += newProduto.quantidade * item.valor
    
            doc.line(7, y-3, 7, y+17)
            doc.line(26.5, y-3, 26.5, y+17)
            doc.line(132, y-3, 132, y+17)
            doc.line(147, y-3, 147, y+17)
            doc.line(177, y-3, 177, y+17)
            doc.line(202, y-3, 202, y+17)
            
            doc.line(7, y+17, 202, y+17)
    
            if(y > 250){
                y = 0;
                doc.addPage();
                doc.line(7, y+17, 202, y+17)
            }
    
            y += 20
        }
    }

    async function carregarDados (){

        await showProdtosOrcamento(orcamento.produtos)
        
        doc.setFillColor(180,180,180);
        doc.rect(7, y-2.7, 195, 6.4, 'F');
        doc.setTextColor(0, 0, 0);
        
        doc.line(7, y-3, 202, y-3)
        doc.line(7, y-3, 7, y+4)
        doc.line(177, y-3, 177, y+4)
    
        doc.text('TOTAL',90, y+1.5,null,null,'center')
    
        doc.text(
            (valorTotalPDF).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}),
            doc.internal.pageSize.width - 11 / 1.05, y+1.5, {align: 'right'}
        )
    
        doc.line(202, y-3, 202, y+4)
        doc.line(7, y+4, 202, y+4)
    
        addFooters(doc)
        doc.save(`Orcamento ${leftPad(orcamento.numero,6)}`);
    }
    carregarDados()
}