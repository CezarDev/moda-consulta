const URL_SIGEC = "https://meucartao.sescms.com.br/SiGec/verificarCPF/cpf";
const URL_PACTO = "https://vendas.online.sistemapacto.com.br/planos?un=1&k=9fe5efa91ec0625b18d8f4cf8eddf95f&ct=15";
const URL_API = 'http://hmldashboard.sescms.com.br/api/ClientelaZW/';


var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())
    /*
    app.get('/products/:id', function (req, res, next) {
      res.json({msg: 'This is CORS-enabled for all origins!'})
    })

    app.listen(80, function () {
      console.log('CORS-enabled web server listening on port 80')
    })
    */

document.getElementById('matricula').onclick = function() {
    Swal.fire({
        title: 'Por favor insira seu CPF',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: false,
        confirmButtonText: 'Consultar',
        showLoaderOnConfirm: true,
        preConfirm: (cpf) => {
            return app.get(URL_API + cpf)
                .then(response => {

                    if (response.status == 200) {
                        console.log(response.json())
                        return window.open(URL_PACTO);
                    }

                    if (response.status == 202) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Hum...',
                            text: 'Existem pendências em aberto !',
                            footer: false,
                            confirmButtonText: 'Ok'
                        })
                    }

                    if (response.status == 204) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Não encontrado',
                            text: 'Voçê será redirecionado para fazer seu cadastro',
                            footer: false,
                            confirmButtonText: 'Ok'
                        }).then((result) => {
                            if (result.isConfirmed)
                                return window.open(URL_SIGEC)
                        })
                    }

                    if (response.status == 409) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Hum...',
                            text: 'Seu Cadastro deve ser atualizado',
                            footer: false,
                            confirmButtonText: 'Ok'
                        })
                    }

                    if (!response.ok) {
                        throw new Error(response.statusText)
                    }
                })
                .catch(error => {
                    Swal.showValidationMessage(
                        //`"CPF Inválido: ${error}`
                        "CPF Inválido"
                    )
                })
        },
        allowOutsideClick: () => !Swal.isLoading()
    })
}