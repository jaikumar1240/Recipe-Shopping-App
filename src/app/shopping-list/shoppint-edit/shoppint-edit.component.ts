import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { shoppingService } from '../shopping-list.services';

@Component({
  selector: 'app-shoppint-edit',
  templateUrl: './shoppint-edit.component.html',
  styleUrls: ['./shoppint-edit.component.scss']
})
export class ShoppintEditComponent implements OnInit, OnDestroy{
  @ViewChild('f') slform: NgForm;
  subscription: Subscription;
  editingMode = false;
  editedItemIndex :number; 
  editedItem: Ingredient;
  constructor( private shoppingservice: shoppingService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingservice.startedEditing
    .subscribe(
      (index:number) =>{
        this.editedItemIndex = index;
        this.editingMode = true;
        this.editedItem = this.shoppingservice.getIngredient(index);
        this.slform.setValue({
          name : this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editingMode){
      this.shoppingservice.updateIngredient(this.editedItemIndex, newIngredient)
    }
    else{
      this.shoppingservice.addIngerdient(newIngredient);
    }
    this.slform.reset();
    this.editingMode = false; 
  }
  onDelete(){
    this.shoppingservice.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  onClear(){
    this.slform.reset();
    this.editingMode = false;
  }

}
