import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { TodosService } from '../../services/todos.service';
import { FilterEnum } from '../../types/filter.enum';
import { TodoInterface } from '../../types/todo.interface';
import { TodoComponent } from "../todo/todo.component";

@Component({
    selector: 'app-todos-main',
    standalone: true,
    templateUrl: './main.component.html',
    imports: [CommonModule, TodoComponent]
})
export class MainComponent {
  todosService = inject(TodosService);
  visibleTodos$: Observable<TodoInterface[]> | undefined;
  noTodoClass$: Observable<boolean> | undefined;
  isAllTodosSelected$: Observable<boolean>;
  isEditingId: string | null = null;

  constructor() {
    this.noTodoClass$ = this.todosService.todos$.pipe(map((todos) => todos.length === 0));
    this.isAllTodosSelected$ = this.todosService.todos$.pipe(map((todos) => todos.every(todo => todo.isCompleted)));
    this.visibleTodos$ = combineLatest(
      this.todosService.todos$, 
      this.todosService.filter$
    ).pipe(
      map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
        if(filter === FilterEnum.active){
          return todos.filter(todo => !todo.isCompleted);
        }
        else if (filter === FilterEnum.completed){
          return todos.filter(todo => todo.isCompleted)
        }        
        return todos;
      }));
  }

  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.todosService.toggleAll(target.checked);
  }

  setEditingId(editingId: string|null): void {
    this.isEditingId = editingId;
  }
}
