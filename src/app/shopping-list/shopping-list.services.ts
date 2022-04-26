import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class shoppingService{
  [x: string]: any;
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
   private ingredients: Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('Orange', 7),
      ];
    
    getIngredients(){
        return this.ingredients.slice();
    }
    getIngredient(index){
      return this.ingredients[index];
    }
    addIngerdient(ingredient: Ingredient){
        this.ingredients.push(ingredient)
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    addIngredients(ingredients: Ingredient[]){
        // for( let ingredient of this.ingredients){
        //     this.addIngerdient(ingredient);
        // }
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    updateIngredient(index: number, newIngredient: Ingredient){
      this.ingredients[index]= newIngredient;
      this.ingredientsChanged.next(this.ingredients.slice());
    }
    deleteIngredient(index:number){
      this.ingredients.splice(index,1);
      this.ingredientsChanged.next(this.ingredients.slice());
    }

}