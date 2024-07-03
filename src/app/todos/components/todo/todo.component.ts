import { Component, Input } from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';

@Component({
  selector: 'app-todos-todo',
  standalone: true,
  imports: [],
  templateUrl: './todo.component.html'
})
export class TodoComponent {
  @Input('todo') todoProps!: TodoInterface;
}
