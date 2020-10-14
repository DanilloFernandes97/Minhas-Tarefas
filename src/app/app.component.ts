import { Todo } from './../models/todo.model';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTimes, faPlusCircle, faSave, faTrashAlt, faCheckCircle, faUndoAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // Ícones
  faTimes = faTimes;  
  faPlusCircle = faPlusCircle;
  faSave = faSave;
  faTrashAlt = faTrashAlt;
  faCheckCircle = faCheckCircle;
  faUndoAlt = faUndoAlt;  
  //

  public mode: String = 'list';
  //public mode: String = 'add';
  public todos: Todo[] = [];
  public title: String = 'Minhas tarefas';
  public formGroup: FormGroup; // instancia de forms da tela.

  constructor(private formBuilder: FormBuilder) {
    // Criando as validações dos inputs do form.
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });
    /* this.todos.push(new Todo(1, 'Passear com o cachorro', false));
     this.todos.push(new Todo(2, 'Ir ao supermercado', false));
     this.todos.push(new Todo(3, 'Cortar o cabelo', true)); */
  }

  ngOnInit(): void {
    this.load();
  }

  clear(): void {
    this.formGroup.reset();
  }

  add(): void {
    // Assim também da certo de recuperar o campo "title": this.formGroup.value => {title: 'Título'}
    const title = this.formGroup.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear();
  }

  remove(todo: Todo): void {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.save();
    }
  }

  markAsDone(todo: Todo): void {
    todo.done = true;
    this.save();
  }

  markAsUndone(todo: Todo) {
    todo.done = false;
    this.save();
  }

  save(): void {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode = 'list';
  }

  load(): void {
    const storageData = JSON.parse(localStorage.getItem('todos'));
    if (storageData) {
      this.todos = storageData;
    } else {
      this.todos = [];
    }
  }

  changeMode(mode: String): void {
    this.mode = mode;
  }

}
