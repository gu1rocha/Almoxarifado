let genPDF = () => {
    var doc = new jsPDF('p', 'mm', 'a4', true);
    var pageHeight = doc.internal.pageSize.height;

    const addFooters = doc => {
        const pageCount = doc.internal.getNumberOfPages()
      
        
        for (var i = 1; i <= pageCount; i++) {
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
        doc.text('UNIVERSIDADE FEDERAL DE SERGIPE',106,30,null,null,'center')

    
    doc.save('Orçamento.pdf');
}