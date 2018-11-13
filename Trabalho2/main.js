
let url = "http://rest.learncode.academy/api/jackson/grupos";
let xhttp1 = new XMLHttpRequest();
xhttp1.onreadystatechange = function () {
    if (xhttp1.readyState == 4) {
    }
}
xhttp1.open("POST", url, true);
xhttp1.setRequestHeader("Content-type", "application/json");
let grupos = {
    groupName: "Grupo da família!",
    groupID: "grupoFamilia",
    usuarios: [
        {
            userName: "victor03",
            message: "Tudo bem?"
        },
        {
            userName: "Pereira",
            message: "Tudo sim"
        }

    ]
}

xhttp1.send(JSON.stringify(grupos));
function criarItemGrupoLista(groupName, groupID) {

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
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4) {
                let parsed_body = JSON.parse(xhttp.responseText);

                for (let i = 0; i < parsed_body.length; i++) {
                    criarConversas(parsed_body[i].groupID, parsed_body[i].usuarios);
                }
            }
        }
        xhttp.open("GET", url, true);
        xhttp.send();
    });
}
function criarConversas(groupID, usuarios) {
    var chat = document.getElementById("chat");
    //chat.innerHTML = "";
    for (let i = 0; i < usuarios.length; i++) {
        var dialogo = document.createElement("div");
        dialogo.classList.add("dialogo");
        let usuario = document.createElement("h4");
        let mensagem = document.createElement("p");
        usuario.innerHTML = usuarios[i].userName;
        mensagem.innerHTML = usuarios[i].message;
        dialogo.appendChild(usuario);
        dialogo.appendChild(mensagem);
        chat.appendChild(dialogo);
    }

}
function getItems() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4) {
            let parsed_body = JSON.parse(xhttp.responseText);
            for (let i = 0; i < parsed_body.length; i++) {
                criarItemGrupoLista(parsed_body[i].groupName, parsed_body[i].groupID);
            }
        }
    }
    xhttp.open("GET", url, true);
    xhttp.send();
}
getItems();
