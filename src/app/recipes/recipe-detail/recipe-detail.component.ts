import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipes.model';
import { recipeService } from '../recipes.services';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor( private recipeservice: recipeService,
                private route: ActivatedRoute,
                private router: Router) { }

  ngOnInit(){
    this.route.params
    .subscribe(
      (params: Params) =>{
        this.id = +params['id'];
        this.recipe = this.recipeservice.getRecipe(this.id);
      }
    )
  }
  onAddtoShopping(){
    this.recipeservice.addtoShoppingList(this.recipe.ingredient);
  }
  editRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
  onDeleteRecipe(index){
    this.recipeservice.onDeleteRecipe(index);
    this.router.navigate(['./recipe']);
  }

}
