let Dadoslogin = sessionStorage.getItem('login')

let ConsoltarBaseUsuario = ()=>{
    let test = {user:false, senha: false}
    usuarios.usuarios.forEach(usuario =>{
        
        if(usuario.user.nome === user.usuario || usuario.user.email === user.usuario){
            test.user = true
        }
        if(usuario.senha === user.senha){
            test.senha = true
        }
    })
    return test
}

let VerificarErro = (valor, local, erro) => !valor ? local.innerText = erro : ''

let ConsoltarBaseUsuarioResources = (Dadoslogin)=>{
    for (const usuario of usuarios.usuarios) {
        if((usuario.user.nome === Dadoslogin.usuario || usuario.user.email === Dadoslogin.usuario)&&(usuario.senha === Dadoslogin.senha)){
            return [usuario.resources,usuario.user.nome]
        }
    }
}

let GetHTML = (url, method, callback, params = null)=>{
    let obj;
    try { 
        obj = new XMLHttpRequest();  
    }catch(e){   
        try {     
            obj = new ActiveXObject("Msxml2.XMLHTTP");     
        } catch(e) {     
            try { 
            obj = new ActiveXObject("Microsoft.XMLHTTP");       
            } catch(e) {       
            console.log("Your browser does not support Ajax.");       
            return false;       
            }     
        }   
    }
    obj.open(method, url, true);
    obj.setRequestHeader("Content-Type", "text/html");
    obj.onreadystatechange = function() {
        if(obj.readyState == 4) {
            callback(obj);
        } 
    }
    obj.send(JSON.stringify(params));
    return obj; 
}

let Capitalize = str => {
	if (typeof str !== 'string') {
		return '';
	}
    str = str.split(" ")
    let newStr = ''
    for (let [i,nome] of str.entries()) {
        nome = nome.charAt(0).toUpperCase() + nome.substr(1)
        newStr += i === 0 ? nome : " "+nome
    }
	return newStr
}