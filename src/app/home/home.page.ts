import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

interface Task {
  title: string;
  description: string;
  done: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tasks: Task[] = [];
  newTask: Task = { title: '', description: '', done: false };
  titleError: string = '';
  descriptionError: string = '';

  constructor(private cd: ChangeDetectorRef) {}

  addTask() {
    if (this.validateForm()) {
      this.tasks.push({ ...this.newTask });
      console.log('Matriz de tareas después de agregar:', this.tasks);
      this.resetForm();
    }
  }

  /*ngOnInit() {
  console.log('Componente inicializado. Tareas actuales:', this.tasks);
 }*/

  validateForm(): boolean {
    let isValid = true;

    if (this.newTask.title.length < 3) {
      this.titleError = 'El campo Titulo es obligatorio y debe tener un minimo de 3 caracteres';
      isValid = false;
    } else {
      this.titleError = '';
    }

    if (this.newTask.description.length < 10) {
      this.descriptionError = 'El campo Descripcion es obligatorio y debe tener un minimo de 10 caracteres';
      isValid = false;
    } else {
      this.descriptionError = '';
    }

    return isValid;
  }

  resetForm() {
    this.newTask = { title: '', description: '', done: false };
    this.titleError = '';
    this.descriptionError = '';
  }

  toggleTaskStatus(task: Task) {
    task.done = !task.done;
    console.log('Tarea actualizada:', task);
    console.log('Matriz de tareas actualizadas:', this.tasks);
    this.cd.detectChanges();
  }
}