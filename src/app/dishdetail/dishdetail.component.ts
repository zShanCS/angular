import { Component, OnInit } from '@angular/core';
import { Dish } from "../shared/dish";
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
    dish: Dish;
    dishIds: string[];
    prev:string;
    next:string;
  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds=>this.dishIds = dishIds);

    this.route.params.pipe(
        switchMap((params:Params) =>
           this.dishservice.getDish(params['id'])))
           .subscribe(dish=>{this.dish = dish; this.setPrevNext(dish.id)});
  }

  goBack(): void {
    this.location.back();
  }
  setPrevNext(id:string){
    const index = this.dishIds.indexOf(id); 
    const length = this.dishIds.length;
    this.prev = this.dishIds[(length + index -1) % length];
    this.next = this.dishIds[(length + index +1) % length];
  }


}
