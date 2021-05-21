window.addEventListener('keydown', closeModal);


function openLogin(){
    const modalDiv = document.createElement('div');
    const articleMod = document.querySelector('#login');
    articleMod.appendChild(modalDiv);
    articleMod.classList.remove('hide');
    articleMod.classList.add('modale');
    document.body.classList.add('no-scroll');
    window.addEventListener('click', closeModal);
}

function openSignIn(){
    const modalDiv = document.createElement('div');
    const articleMod = document.querySelector('#signin');
    articleMod.appendChild(modalDiv);
    articleMod.classList.remove('hide');
    articleMod.classList.add('modale');
    document.body.classList.add('no-scroll');
    window.addEventListener('click', closeModal);
}

function closeModal(event){
    
    if(event.keyCode == 27 || event.target.className == 'modale'){
        const modale = document.querySelector('.modale');
        modale.classList.remove('modale');
        modale.classList.add('hide');
        document.body.classList.remove('no-scroll');
    }
}

function checkForm(){
    const errore = document.createElement('h6');
    const allow = document.querySelector("input[name='allow[]'");
    document.getElementById('registrati').disabled = 
        !allow.checked || 
        Object.keys(formStatus).length !== 7 ||
        Object.values(formStatus).includes(false);

    if(document.getElementById('registrati').disabled){
        errore.textContent = 'Compila tutti i campi.';
        allow.appendChild(errore);
    } else {
        errore.textContent = 'Tutti i campi compilati correttamente.';
        allow.appendChild(errore);
    }

}

function checkName(event){
    const input = event.currentTarget;
   
    if(formStatus[input.name] = input.value.length > 0){
        input.classList.remove('texterror');
    } else {
        input.value = 'Inserire Nome';
        input.parentNode.classList.add('texterror');
    }

    checkForm();
}

function checkSurname(event){
    const input = event.currentTarget;
   
    if(formStatus[input.name] = input.value.length > 0){
        input.classList.remove('texterror');
    } else {
        input.value = 'Inserire Cognome';
        input.parentNode.classList.add('texterror');
    }

    checkForm();
}

function checkUsername(event){
    const input = event.currentTarget;
    console.log(input);
    if(!/^([a-zA-Z0-9\.\_\-])+$/.test(input.value)){
        input.parentNode.classList.add('texterror');
        input.value = 'caratteri non ammessi';
        formStatus.username = false;
        checkForm();
    } else {
        fetch("checkUsername.php?q=" + encodeURIComponent(input.value)).then(fetchResponse).then(jsonCheckUsername);

    }
}

function fetchResponse(response){
    if(!response.ok) return null;
    return response.json();
}

function jsonCheckUsername(json){
    if (formStatus.username = !json.exists){
        document.forms['signin'].querySelector("input[name='username']").parentNode.classList.remove('texterror');
    } else {
        document.forms['signin'].querySelector("input[name='username']").parentNode.classList.add('texterror');
        document.forms['signin'].querySelector("input[name='username']").value = 'Già in uso';
    }
    checkForm();

}

function checkEmail(event){
     const input = event.currentTarget;
   
    if(!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(input.value)){
        input.parentNode.classList.add('texterror');
        input.value = 'caratteri non ammessi';
        formStatus.email = false;
        checkForm();
    } else {
        fetch("checkEmail.php?q=" + encodeURIComponent(String(input.value).toLowerCase())).then(fetchResponse).then(jsonCheckEmail);
    }

    checkForm();
}

function jsonCheckEmail(json){
    if (formStatus.email = !json.exists){
        document.forms['signin'].querySelector("input[name='email']").parentNode.classList.remove('texterror');
    } else {
        document.forms['signin'].querySelector("input[name='email']").parentNode.classList.add('texterror');
        document.forms['signin'].querySelector("input[name='email']").value = 'Già in uso';
    }

    checkForm();
}

function checkPassword(event){
     const input = event.currentTarget;
   
    if(formStatus[input.name] = input.value.length >= 8){
        input.classList.remove('texterror');
    } else {
        input.parentNode.classList.add('texterror');
    }

    checkForm();
}

function checkConfirmPass(event){
    const input = event.currentTarget;
    const password = document.forms['signin'].querySelector("input[name='password']").value;
    
    formStatus[input.name] = input.value === password;
    
    if((formStatus[input.name]) ){
        input.parentNode.classList.remove('texterror');
    } else {
        input.parentNode.classList.add('texterror');
    }

    checkForm();
}

const formStatus = {'upload' : true};
//checkForm();
document.forms['signin'].querySelector("input[name='name']").addEventListener('blur', checkName);
document.forms['signin'].querySelector("input[name='surname']").addEventListener('blur', checkSurname);
document.forms['signin'].querySelector("input[name='email']").addEventListener('blur', checkEmail);
document.forms['signin'].querySelector("input[name='username']").addEventListener('blur', checkUsername);
document.forms['signin'].querySelector("input[name='password']").addEventListener('blur', checkPassword);
document.forms['signin'].querySelector("input[name='password_confirm']").addEventListener('blur', checkConfirmPass);
document.forms['signin'].querySelector("input[name='allow[]']").addEventListener('change', checkForm);

//ospite

