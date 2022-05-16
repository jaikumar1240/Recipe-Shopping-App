import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { recipeService } from "./recipes/recipes.services";
import { DataStorageService } from "./shared/data-storage.service";
import { RecipesResolverService } from "./shared/recipes-resolver.service";
import { shoppingService } from "./shopping-list/shopping-list.services";

@NgModule({
    providers: [
        shoppingService, 
        recipeService, 
        DataStorageService, 
        RecipesResolverService, 
        {provide: 
            HTTP_INTERCEPTORS, 
            useClass: 
            AuthInterceptorService, 
            multi: true
        }],
})
export class CoreModule{

}