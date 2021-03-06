import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', redirectTo:'/recipe', pathMatch:'full' },
  { path: 'recipe', loadChildren: './recipes/recipes.module#RecipeModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  { path: 'shopping', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'},
  { path: 'page-not-found', component:PageNotFoundComponent },
  { path: '**', redirectTo:'/page-not-found'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
