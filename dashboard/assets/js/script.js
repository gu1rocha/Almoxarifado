const chart = document.querySelector("#chart").getContext('2d');

new Chart(chart, {
    type: 'line',
    data:{
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Agu', 'Set', 'Out', 'Nov', 'Dez'],
        datasets:[
            {
                label: 'BTC',
                data: [7791,351,1853,6930,7093,1804,509,3194,2936,7593,9468,1313],
                borderColor: 'red',
                borderWidth: 2
            },
            {
                label: 'EHT',
                data: [9438,3795,653,1832,7653,1653,8460,9058,6547,2539,515,8813],
                borderColor: 'blue',
                borderWidth: 2
            },
            {
                label: 'EHT',
                data: [9353,9919,6609,1610,3261,2926,8488,6066,49,3914,3227,8493],
                borderColor: 'green',
                borderWidth: 2
            }
        ],
        options:{
            responsive: true
        }
    }
})