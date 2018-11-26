let entrar = document.getElementById("entrar");
let bot = document.getElementById("bot");
let amigoDiv = document.getElementById("lista");
let bot_text = document.getElementById("bot_text");
let chat = document.getElementById("chat");

if (localStorage.getItem("usuario") === null) {
    bot.disabled = true;
    bot.style.opacity = 0.3;

    entrar.innerHTML = "Entrar";
    entrar.addEventListener("click", function () {
        document.getElementById("openModal").style.display = "block";
        let logar = document.getElementById("logar");

        logar.addEventListener("click", function () {
            let id = document.getElementById("logar_inp").value;
            if (id == 1) {
                if (typeof (Storage) !== "undefined") {
                    localStorage.setItem("usuario", "Jackson Maia");
                    localStorage.setItem("id", "1");
                } else {
                    document.getElementById("spanUser").innerHTML = "Sorry, your browser does not support Web Storage...";
                }
            } else {
                event.preventDefault();
                document.getElementById("spanError").innerHTML = "Id do usuário inválido";
            }
            document.getElementById("openModal").style.display = "none";
            bot.disabled = false;
            bot.style.opacity = 1;

        });
    });

} else {
    entrar.innerHTML = "Sair";
    let user = document.getElementById("user");
    console.log(user);
    user.innerHTML = localStorage.getItem("usuario");
    let img = document.getElementById("img_user");
    img.src = "user.png";
    document.getElementById("entrar").addEventListener("click", function () {
        entrar.innerHTML = "Entrar";

        localStorage.removeItem("usuario");
        document.getElementById("lista").innerHTML = "";
        let chat = document.getElementById("chat");
    });
}
let url = "http://rest.learncode.academy/api/jackson/grupos";

function criarGrupos(groupName, groupId) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4) {
            getItems();
        }
    }
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    let person = { "groupName": groupName, "groupID": groupId };
    let grupos = JSON.stringify(person);
    xhttp.send(grupos);
}

bot.addEventListener("click", function (e) {
    console.log("clicando");
    let id_group = document.getElementById("id");
    let nome_group = document.getElementById("nome");
    e.preventDefault();
    if (nome_group.value != "" && id_group.value != "") {
        criarGrupos(nome_group.value, id_group.value);
        nome_group.value = "";
        id_group.value = "";
    }
});

function criarItemGrupoLista(groupName, groupID) {
    console.log(groupName);

    console.log(groupID);


    let lista = document.getElementById("lista");

    let amigo = document.createElement("div");
    amigo.classList.add("amigo");

    let amigo_parte1 = document.createElement("div");
    amigo_parte1.classList.add("amigo-parte1");

    let img = document.createElement("img");
    img.src = "user.png";

    let amigo_parte2 = document.createElement("div");
    amigo_parte2.classList.add("amigo-parte2");

    let label = document.createElement("label");
    label.classList.add("nome");
    label.innerHTML = groupName;

    amigo_parte1.appendChild(img);
    amigo_parte2.appendChild(label);
    amigo.appendChild(amigo_parte1);
    amigo.appendChild(amigo_parte2);
    lista.appendChild(amigo);

    amigo.addEventListener("click", function (event) {
        event.preventDefault();
        let name_top_grop = document.getElementById("name_top_grop");
        name_top_grop.innerHTML = groupName;

        let icon = document.getElementById("icon");
        icon.src = "user.png";

        let text = document.getElementById("text");
        text.disabled = false;

        bot_text.disabled = false;

        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4) {
                let parsed_body = JSON.parse(xhttp.responseText);
                chat.innerHTML = "";
                for (let i = 0; i < parsed_body.length; i++) {
                    criarConversa(parsed_body[i].groupID);
                }
            }
        }
        xhttp.open("GET", url, true);
        xhttp.send();

        
    });
    bot_text.addEventListener('click', function (e) {
        criarMensagens(groupID);
    });
}
function criarMensagens(groupID) {
    let text = document.getElementById("text");
    if (text.value != "") {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4) {
                atualizarConversa(groupID);
                
            }
        }
        xhttp.open("POST", url + groupID, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        let person = { "userName": localStorage.getItem("usuario"), "message": text.value };
        let body = JSON.stringify(person);
        xhttp.send(body);
        text.value = "";
    }
}

function atualizarConversa(groupID){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4) {
            // let parsed_body = JSON.parse(xhttp.responseText);
            chat.innerHTML = "";
            criarConversa(groupID);
            // for (let i = 0; i < parsed_body.length; i++) {
                
            // }
        }
    }
    xhttp.open("GET", url + groupID, true);
    xhttp.send();
}

function criarConversa(groupID) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4) {
            let parsed_body = JSON.parse(xhttp.responseText);
            chat.innerHTML = "";
            for (let i = 0; i < parsed_body.length; i++) {
                let dialogo = document.createElement("div");
                dialogo.classList.add("dialogo");
                let usuario = document.createElement("h4");
                let mensagem = document.createElement("p");

                usuario.innerHTML = parsed_body[i].userName;
                mensagem.innerHTML = parsed_body[i].message;
                
                dialogo.appendChild(usuario);
                dialogo.appendChild(mensagem);
                chat.appendChild(dialogo);
            }
        }
    }
    xhttp.open("GET", url + groupID, true);
    xhttp.send();


}

function getItems() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4) {
            let parsed_body = JSON.parse(xhttp.responseText);
            amigoDiv.innerHTML = "";
            for (let i = 0; i < parsed_body.length; i++) {
                criarItemGrupoLista(parsed_body[i].groupName, parsed_body[i].groupID);
            }
        }
    }
    xhttp.open("GET", url, true);
    xhttp.send();
}

getItems();
