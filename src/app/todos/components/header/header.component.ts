import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todos-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  text: string = '';
  todosService = inject(TodosService);

  
  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.text = target.value;  
  }

  addTodo(): void {
    this.todosService.addTodo(this.text);
    this.text = '';
  }
}
