const taskInput = document.querySelector('#text');
const formBtn = document.querySelector('#boton');
const form = document.querySelector('#formulario');
const list = document.querySelector('.lista');
const total = document.querySelector('#boton2');
const complete = document.querySelector('#boton3');
const incomplete = document.querySelector('#boton4');

  window.addEventListener('load', () => {
  const contadorGuardado = localStorage.getItem('total');
  if (contadorGuardado) {
    total = JSON.parse(totalLocal);
  }
  actualizarContador();
  });
   
  const renderTasks = () => {
    list.innerHTML = '';
    tasks.forEach(tarea => {
      const li = document.createElement('li');
      li.classList.add('nuevatarea');
      li.id = tarea.id;
      li.innerHTML = `<button class="checknegativo1"><span class="material-symbols-outlined">delete_sweep</span></button>
      <p class="tareas">${tarea.tarea}</p>
      <button class="checkpositivo1"><span class="material-symbols-outlined">verified</span></button>`;

      if (tarea.check){
            li.children[1].classList.add('chequeado');
            }   
      list.append(li)
    });
    actualizarContador();
  }
  
  let tasks = [];

  formBtn.disabled = false;

  form.addEventListener('submit', e => {
    e.preventDefault();
    // // Verificar si las validaciones son verdaderas
    // if (!taskValidation) return;
    // Crear contacto
    const newTask = {
      id: crypto.randomUUID(),
      tarea: taskInput.value,
      check: false,
    }
    // Agregar el contacto al array
    tasks = tasks.concat(newTask);
    // Guardar en el navegador
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    form.reset();
    actualizarContador();
  });

  
list.addEventListener('click', e => {
  const deleteBtn = e.target.closest('.checknegativo1');
  const checkBtn = e.target.closest('.checkpositivo1');
  
  // Eliminar
  if (deleteBtn) {
    const id = deleteBtn.parentElement.id;
    tasks = tasks.filter(task => {
      if (task.id !== id) {
        return task;
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    actualizarContador();
    }

    if(checkBtn){
      const li = checkBtn.parentElement;
      
      tasks = tasks.map(task =>{
        if(task.id === li.id){
          return{...task, check: !task.check};
        }else{
          return task;
        }
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    }
  });
    
  const actualizarContador = () => {
    const totalTareas = tasks.length;
    total.innerHTML = `Total: ${totalTareas}`;
    localStorage.setItem('boton2', totalTareas);
    
    
    const tareasCompletas = document.querySelectorAll('.chequeado').length;
    complete.innerHTML = `Completadas: ${tareasCompletas}`;
    localStorage.setItem('boton3', tareasCompletas);

    const tareasIncompletas = totalTareas - tareasCompletas;
    incomplete.innerHTML = `Incompletas: ${tareasIncompletas}`;
    localStorage.setItem('boton4', tareasIncompletas);
  
  }

    

(() => {
  const tasksLocal = localStorage.getItem('tasks');

  if (tasksLocal) {
    const tasksArray = JSON.parse(tasksLocal);
    tasks = tasksArray;

    renderTasks();
  }
})();
