import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { shoppingService } from "../shopping-list/shopping-list.services";
import { Recipe } from "./recipes.model";
@Injectable()
export class recipeService{
  recipeChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        // new Recipe('Meat Masala',
        //  'How to make a Meat Masala',
        //   '../assets/Meat.jpg',
        //   [new Ingredient('Meat', 1),
        //   new Ingredient('chilly',2)]),
        // new Recipe('Burger',
        //  'How to make a burger',
        //   '../assets/Burger.jpg',
        //   [new Ingredient('Bun', 3),
        //   new Ingredient('veggies',5)])
      ];
      constructor( private shoppingservice: shoppingService){}
      getRecipes(){
         return this.recipes.slice();
      }
      getRecipe(index: number){
        return this.recipes[index];
      }
      addtoShoppingList(ingredient: Ingredient[]){
        this.shoppingservice.addIngredients(ingredient);
      }
      onAdd(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
      }
      onUpdate(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
      }
      onDeleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());
      }
      setRecipe(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
      }
}