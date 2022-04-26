import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { shoppingService } from './shopping-list.services';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  
  @Input() isActive;
  @Input() num;
  ingredients: Ingredient[];
  private igChangeSub : Subscription;

  constructor( private shoppingservice: shoppingService) { }
  
  ngOnInit(){
    this.ingredients = this.shoppingservice.getIngredients();
    this.igChangeSub = this.shoppingservice.ingredientsChanged
    .subscribe(
      (ingredients: Ingredient[])=>{
        this.ingredients = ingredients;
      }
    )
  }

  ngOnDestroy(){
    this.igChangeSub.unsubscribe();
  }
  onEditItem(index: number){
    this.shoppingservice.startedEditing.next(index);
  }
  
}
