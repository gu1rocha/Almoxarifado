let genPDF = () => {

    let img = new Image()
    img.src = 'assets/img/escurial.png'

    let doc = new jsPDF('p', 'mm', 'a4', true);
    let pageHeight = doc.internal.pageSize.height

    let changeDateFormat = data => `${data.getDate() < 10 ? `0${data.getDate()}` : data.getDate()}/${(data.getMonth() + 1) < 10 ? `0${data.getMonth() + 1}`: data.getMonth() + 1}/${data.getFullYear()}`
    let changeTimeFormat = data => `${data.getHours()}:${data.getMinutes()}`

    let data = new Date()
    let validade = new Date(new Date().setDate(data.getDate() + 1))

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

    
    doc.rect(7, 25, 195, 30);// Retangulo

    doc.addImage(img, 'JPEG', 8, 25,50,27.5)

    doc.text('Cerâmica Sergipe Indústria e Comercio LTDA',106,30,null,null,'center')

    
    doc.line(165, 25, 165, 55)// vertical
    //doc.line(12, linhaY-5, 202,linhaY-5)// horizontal

    doc.text('Criado em', doc.internal.pageSize.width - 17 / 1.05, 30 ,{align: 'right'})
    
    doc.setFontStyle('normal');
    doc.text(`${data} às ${time}`, doc.internal.pageSize.width - 11 / 1.05, 35 ,{align: 'right'})

    doc.setFontStyle('bold');
    doc.text('Valido até', doc.internal.pageSize.width - 17 / 1.05, 42 ,{align: 'right'})

    doc.setFontStyle('normal');
    doc.text(`${validade} às ${time}`, doc.internal.pageSize.width - 11 / 1.05, 47 ,{align: 'right'})


    addFooters(doc)
    doc.save('Orçamento.pdf');
}