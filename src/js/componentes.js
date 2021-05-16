// Refere referencias en el html.

import { Todo } from "../classes/todo.class";
import { todoList } from "../index"

const divTodoList = document.querySelector(".todo-list");
const txtInpunt = document.querySelector(".new-todo");
const btnBorrar = document.querySelector(".clear-completed");
const ulFiltros = document.querySelector(".filters");
const anchorFiltros = document.querySelectorAll(".filtro");


export const crearTodoHtml = (todo) => {
    const htmlTodo = `
     <li class="${(todo._completado) ? 'completed' : ''}" data-id="${todo._id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${(todo._completado) ? 'checked' : ''}>
			<label>${todo._tarea}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li> `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;
}

// eventos

txtInpunt.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && txtInpunt.value.length > 0) {
        const nuevoTodo = new Todo(txtInpunt.value);
        todoList.nuevoTodo(nuevoTodo);
        console.log(todoList);

        crearTodoHtml(nuevoTodo);
        txtInpunt.value = '';

    }

});

divTodoList.addEventListener('click', (event) => {
    const nombreElemento = (event.target.localName); //input label boton
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if (nombreElemento.includes('input')) {
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }

});

btnBorrar.addEventListener('click', () => {
    todoList.eliminarCompletados();

    for (let i = divTodoList.children.length - 1; i >= 0; i--) {

        const elemento = divTodoList.children[i];
        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }

});

ulFiltros.addEventListener('click', (event) => {
    
    const filtro= event.target.text;
    if(!filtro){return;}

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children){
        
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        switch(filtro){
            case 'Pendientes':
                if (completado){
                    elemento.classList.add('hidden');
                }
            break;
            case 'Completados':
                if (!completado){
                    elemento.classList.add('hidden');
                }
            break;

        }

    }

});