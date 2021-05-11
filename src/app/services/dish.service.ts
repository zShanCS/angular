import { Injectable } from '@angular/core';
import { Dish } from "../shared/dish";
import { DISHES } from "../shared/dishes";
@Injectable({
  providedIn: 'root'
})
export class DishService {
  dish:Dish[];
  constructor() { }
  getDishes(): Dish[]{
    return this.dish = DISHES;
  } 
}
