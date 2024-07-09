import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { MainComponent } from "../main/main.component";

@Component({
    selector: 'app-todos',
    standalone: true,
    templateUrl: './todos.component.html',
    imports: [HeaderComponent, MainComponent, FooterComponent]
})
export class TodosComponent {

}
