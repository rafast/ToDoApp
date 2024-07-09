import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterEnum } from '../types/filter.enum';
import { TodoInterface } from '../types/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodosService {          
  todos$ = new BehaviorSubject<TodoInterface[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);

  constructor() { }

  addTodo(text: string): void {
    const newToDo: TodoInterface = {
      text,
      isCompleted: false,
      id: Math.random().toString().slice(2,16),
    };
    const updatedTodos = [...this.todos$.getValue(), newToDo];
    this.todos$.next(updatedTodos);
  }

  toggleAll(isCompleted: boolean) {
    const updatedTodos = this.todos$.getValue().map((todo) => {
      return {
        ...todo,
        isCompleted
      }  
    });    
    this.todos$.next(updatedTodos);
  }

  changeFilter(filterName: FilterEnum) {
    this.filter$.next(filterName);
  }

  removeTodo(id: string): void {
    const updatedTodos = this.todos$
      .getValue()
      .filter(todo => todo.id !== id);
       
    this.todos$.next(updatedTodos);
  }

  toggleTodo(id: string) {
    const updatedTodos = this.todos$.getValue().map((todo) => {
      if(todo.id === id){
        return{
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }      
      return todo;
    });    
    this.todos$.next(updatedTodos);
  }

  changeTodo(id: string, text: string): void {
    const updatedTodos = this.todos$.getValue().map((todo) => {
      if(todo.id === id){
        return{
          ...todo,
          text,
        };
      }      
      return todo;
    });    
    this.todos$.next(updatedTodos);
  }
}
