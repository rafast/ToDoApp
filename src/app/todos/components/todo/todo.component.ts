import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { TodoInterface } from '../../types/todo.interface';

@Component({
  selector: 'app-todos-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit, OnChanges{
  @Input('todo') todoProps!: TodoInterface;
  @Input('isEditing') isEditingProps!: boolean;
  @Output('setEditingId') setEditingIdEvent: EventEmitter<
    string | null
  > = new EventEmitter();

  @ViewChild('inputText') textInput!: ElementRef; 

  todoService = inject(TodosService);
  editingText: string = '';

  ngOnInit(): void {
    this.editingText = this.todoProps.text;
  }

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
        if(changes['isEditingProps']?.currentValue){
          this.textInput.nativeElement.focus();
        }
      }, 0);    
  }
  
  setTodoInEditMode() {
    this.setEditingIdEvent.emit(this.todoProps.id);
  }


  changeTodo() {
    this.todoService.changeTodo(this.todoProps.id, this.editingText);
    this.setEditingIdEvent.emit(null);
    
  }
  changeText(event: Event): void {  
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
  }

  removeTodo(): void {
    this.todoService.removeTodo(this.todoProps.id);
  }

  toggleTodo(): void {
    this.todoService.toggleTodo(this.todoProps.id);
    
  }
}
