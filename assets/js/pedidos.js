let pedidos = {
    pedidos: [
        {
            id: 2,
            numero: 2,
            status: 'cancelado',
            produtos:[
                {
                    id: 309,
                    quantidade: 10
                },
                {
                    id: 53,
                    quantidade: 6
                },
                {
                    id: 74,
                    quantidade: 4
                },
                {
                    id: 15,
                    quantidade: 1
                }
            ],
            dataCreat: '2022-08-04T06:00:00-00:00',
            dataLastAlt : '2022-08-04T06:30:00-00:00',
            alteracoes:[
                {
                    idUser : 3,
                    dataCreat: '2022-08-01T07:00:00-00:00',
                    type: 'creat'
                },{
                    idUser : 3,
                    dataCreat: '2022-08-04T06:30:00-00:00',
                    type: 'cancel',
                    motivo: 'Os produto não são mais necessários'
                }
            ]
        },
        {
            id: 3,
            numero: 3,
            status: 'pendente',
            produtos:[
                {
                    id: 51,
                    quantidade: 1
                },
                {
                    id: 317,
                    quantidade: 27
                },
                {
                    id: 84,
                    quantidade: 2
                },
                {
                    id: 95,
                    quantidade: 7
                },
                {
                    id: 195,
                    quantidade: 7
                },
                {
                    id: 395,
                    quantidade: 7
                },
                {
                    id: 495,
                    quantidade: 7
                },
                {
                    id: 493,
                    quantidade: 7
                }
            ],
            dataCreat: '2022-08-05T06:00:00-00:00',
            dataLastAlt : '2022-08-05T07:00:00-00:00',
            alteracoes:[
                {
                    idUser : 3,
                    dataCreat: '2022-08-05T06:00:00-00:00',
                    type: 'creat'
                }
            ]
        },
        {
            id: 4,
            numero: 4,
            status: 'finalizado',
            produtos:[
                {
                    id: 10,
                    quantidade: 1
                },
                {
                    id: 355,
                    quantidade: 15
                },
                {
                    id: 40,
                    quantidade: 1
                },
                {
                    id: 50,
                    quantidade: 2
                }
            ],
            dataCreat: '2022-08-05T06:00:00-00:00',
            dataLastAlt : '2022-08-05T07:00:00-00:00',
            alteracoes:[
                {
                    idUser : 3,
                    dataCreat: '2022-08-05T06:00:00-00:00',
                    type: 'creat'
                },
                {
                    idUser : 3,
                    dataCreat: '2022-08-05T07:00:00-00:00',
                    type: 'finaly'
                }
            ]
        }
    ]
}