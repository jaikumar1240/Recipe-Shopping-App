import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../recipes/recipes.model';
import { recipeService } from '../recipes/recipes.services';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor( private dataStorageService: DataStorageService,
                private recipeService: recipeService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const recipe = this.recipeService.getRecipes();
    if(recipe.length == 0){
      return this.dataStorageService.fetchRecipe();
    }
    else{
      return recipe;
    }
  }
}
