import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TodosService } from '../../services/todos.service';
import { FilterEnum } from '../../types/filter.enum';

@Component({
  selector: 'app-todos-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  todosService = inject(TodosService);
  noTodosClass$: Observable<boolean> | undefined;
  activeCount$: Observable<number>;
  itemsLeftText$: Observable<string>;
  filterEnum = FilterEnum;
  filter$: Observable<FilterEnum>;
  
  constructor(){
    this.noTodosClass$ = this.todosService.todos$.pipe(map((todos) => todos.length === 0));
    this.activeCount$ = this.todosService.todos$.pipe(map((todos) => todos.filter(todo => !todo.isCompleted).length));
    this.itemsLeftText$ = this.activeCount$.pipe(map((counter) => `item${counter !== 1 ? 's' : ''} left`)); 
    this.filter$ = this.todosService.filter$;
  }
  
  changeFilter(event: Event,filterName: FilterEnum): void {
    event.preventDefault();
    this.todosService.changeFilter(filterName);    
  }

}
