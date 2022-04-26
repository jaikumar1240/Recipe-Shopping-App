import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Recipe } from '../recipes.model';
import { recipeService } from '../recipes.services';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy{
  recipes: Recipe[];
  subscription: Subscription;
  constructor( private recipeService: recipeService,
                private router: Router,
                private route: ActivatedRoute) {}

  ngOnInit(){
    this.subscription = this.recipeService.recipeChanged
    .subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes; 
      }
    )
    this.recipes = this.recipeService.getRecipes();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  newRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
