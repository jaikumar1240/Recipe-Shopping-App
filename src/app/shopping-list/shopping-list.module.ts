import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppintEditComponent } from "./shoppint-edit/shoppint-edit.component";

@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppintEditComponent
    ],
    imports:[
        FormsModule,
        SharedModule,
        ShoppingListRoutingModule
    ]
})
export class ShoppingListModule{

}