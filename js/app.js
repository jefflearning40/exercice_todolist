// Tableau pour stocker les tâches
let todos = [];

// Charger les tâches depuis localStorage
function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
        updateDisplay();
    }
}

// Sauvegarder les tâches dans localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Ajouter une tâche
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const input = document.querySelector('input[name="title"]');
    const title = input.value.trim();
    if (title) {
        const newTodo = {
            id: Date.now(),
            title: title,
            done: false
        };
        todos.push(newTodo);
        saveTodos();
        input.value = '';
        updateDisplay();
    }
});

// Mettre à jour l'affichage des tâches
function updateDisplay() {
    const list = document.querySelector('ul');
    list.innerHTML = '';
    const filter = document.querySelector('.btn-group button.active').dataset.filter;

    todos.filter(todo => {
        if (filter === 'all') return true;
        if (filter === 'todo') return !todo.done;
        if (filter === 'done') return todo.done;
    }).forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo list-group-item d-flex align-items-center justify-content-between';
        li.innerHTML = `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="todo-${todo.id}" ${todo.done ? 'checked' : ''}>
                <label class="form-check-label ms-2 ${todo.done ? 'text-decoration-line-through' : ''}" for="todo-${todo.id}">
                    ${todo.title}
                </label>
            </div>
            <button class="btn btn-danger btn-sm" aria-label="Supprimer">
                <i class="bi-trash"></i>
            </button>
        `;
        list.appendChild(li);
    });
}

// Gérer la tâche cochée
document.querySelector('ul').addEventListener('change', function(event) {
    if (event.target.type === 'checkbox') {
        const id = parseInt(event.target.id.split('-')[1]);
        const todo = todos.find(todo => todo.id === id);
        if (todo) {
            todo.done = event.target.checked;
            saveTodos();
            updateDisplay();
        }
    }
});

// Supprimer une tâche
document.querySelector('ul').addEventListener('click', function(event) {
    if (event.target.closest('button')) {
        const li = event.target.closest('li');
        const id = parseInt(li.querySelector('input').id.split('-')[1]);
        todos = todos.filter(todo => todo.id !== id);
        saveTodos();
        updateDisplay();
    }
});

// Gérer les filtres
document.querySelectorAll('.btn-group button').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.btn-group button').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        updateDisplay();
    });
});

// Charger les tâches au chargement de la page
document.addEventListener('DOMContentLoaded', loadTodos);

    document.addEventListener('DOMContentLoaded', function() {
    // Sélectionnez tous les boutons de suppression
    const deleteButtons = document.querySelectorAll('.btn-danger');

    // Ajoutez un écouteur d'événement à chaque bouton de suppression
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            // Stockez le bouton de suppression cliqué
            const deleteButton = this;
            // Affichez le modal de confirmation
            const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
            deleteModal.show();

            // Gérez l'événement de confirmation de suppression
            document.getElementById('confirmDelete').addEventListener('click', function() {
                // Supprimez la tâche
                deleteButton.closest('.todo').remove();
                // Fermez le modal
                deleteModal.hide();
            });
        });
    });
});

