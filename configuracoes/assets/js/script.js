let ConsoltarBaseUsuarioConfig = (Dadoslogin)=>{
    for (const usuario of usuarios.usuarios) {
        if((usuario.user.nome === Dadoslogin.usuario || usuario.user.email === Dadoslogin.usuario)&&(usuario.senha === Dadoslogin.senha)){
            return [usuario.user.nome, usuario.user.email, usuario.senha]
        }
    }
}

let dadosConfig = ConsoltarBaseUsuarioConfig(JSON.parse(Dadoslogin))

document.getElementById('nomeConf').value = dadosConfig[0]
document.getElementById('emailConf').value = dadosConfig[1]
document.getElementById('senhaConf').value = dadosConfig[2]

document.querySelector('form').querySelector('span').addEventListener('click',()=>ShowHidePassword(document.querySelector('.input.senha')))