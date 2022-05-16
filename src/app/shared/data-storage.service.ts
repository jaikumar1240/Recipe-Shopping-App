import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipes.model';
import { recipeService } from '../recipes/recipes.services';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  ngOnInit(): void {
    
  }
  constructor(private http: HttpClient,
              private recipeServies: recipeService,
              private authService: AuthService) { }
  storeRecipe(){
    const recipes = this.recipeServies.getRecipes();
    return this.http.put('https://recipe-app-f70b6-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe(response=>{
    })
  }
  fetchRecipe(){
    
    return this.http.get<Recipe[]>('https://recipe-app-f70b6-default-rtdb.firebaseio.com/recipes.json',
    // {
    //   params: new HttpParams().set('auth', user.token)
    // }
      ).pipe(
      map(res=>{
        return res.map(recipe => {
          return {...recipe, ingredients: recipe.ingredient ? recipe.ingredient : []
          };
        })
      }),
      tap(recipes=>{
        this.recipeServies.setRecipe(recipes);
      })
    )
  }
}
