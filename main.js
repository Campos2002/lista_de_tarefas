// CAPTURAS DE ELEMENTOS HTML  ------------------------------------//

const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

// CAPTURA DE EVENTOS ---------------------------------------------//

// CAPTURA TECLA ENTER //
inputTarefa.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});

btnTarefa.addEventListener('click', function () {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});

// APAGA TEREFA //
document.addEventListener('click', function (e) {
    const element = e.target;
    if (element.classList.contains('apagar')) {
        element.parentElement.remove();
        salvaTarefas();
    };
});

// FUNÇÕES --------------------------------------------------------//

function criaLista() {
    const li = document.createElement('li');
    return li;
};

function limpaTextoImput() {
    inputTarefa.value = '';
    inputTarefa.focus();
};

function criaBotaoApagar(li) {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'x';
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'Excluir tarefa');
    li.appendChild(botaoApagar);
};

function criaTarefa(textoInput) {
    const li = criaLista();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaTextoImput();
    criaBotaoApagar(li);
    salvaTarefas();
};

function salvaTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('x', '').trim();
        listaDeTarefas.push(tarefaTexto);
    };

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
};

function retornaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    };
};

retornaTarefasSalvas();