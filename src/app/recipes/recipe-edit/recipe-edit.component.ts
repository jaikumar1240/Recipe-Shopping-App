import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipes.model';
import { recipeService } from '../recipes.services';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editmode = false;
  recipeForm: FormGroup;

  get IngredientControls(){
    return (this.recipeForm.get('ingredient')as FormArray).controls;
  }

  constructor( private route: ActivatedRoute,
               private recipeService: recipeService,
               private router: Router) { }

  ngOnInit(){
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editmode = params['id'] != null;
        this.initForm();
      }
    )
  }
  onSubmit(){
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredient'],
    )
    if(this.editmode){
      this.recipeService.onUpdate(this.id, newRecipe)
    }
    else{
      this.recipeService.onAdd(newRecipe);
    }
    this.onCancel()
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo: this.route});
  }
  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredient')).push(
      new FormGroup({
        'name' : new FormControl(null,Validators.required),
        'amount' : new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }
  onDltIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredient')).removeAt(index);
  }
  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    if(this.editmode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description
      if(recipe['ingredient']){
        for(let Ingredient of recipe.ingredient){
          recipeIngredients.push(
            new FormGroup({
              'name' : new FormControl(Ingredient.name,Validators.required),
              'amount' : new FormControl(Ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'imagePath' : new FormControl(recipeImagePath,Validators.required),
      'description' : new FormControl(recipeDescription, Validators.required),
      'ingredient' : recipeIngredients
    })
  }

}
