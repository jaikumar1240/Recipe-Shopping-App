import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoaderComponent } from "./loader/loader.component";

@NgModule({
    declarations: [
        DropdownDirective,
        AlertComponent,
        LoaderComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DropdownDirective,
        AlertComponent,
        LoaderComponent,
        CommonModule
    ],
    entryComponents: [
        AlertComponent
    ]
})
export class SharedModule{

}