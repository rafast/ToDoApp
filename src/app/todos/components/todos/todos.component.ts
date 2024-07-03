import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { MainComponent } from "../main/main.component";

@Component({
    selector: 'app-todos',
    standalone: true,
    templateUrl: './todos.component.html',
    imports: [HeaderComponent, MainComponent]
})
export class TodosComponent {

}
