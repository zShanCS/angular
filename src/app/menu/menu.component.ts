import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { expand, flyInOut } from "../animations/app.animate";
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display:block;'
  },
  animations: [
    flyInOut(), expand()
  ]
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  errMess: string;
  constructor(
    private dishService: DishService,
    @Inject('BaseURL') public BaseURL: string
  ) {
    console.log('menu created');

  }

  ngOnInit(): void {
    console.log('menu initialized');

    this.dishService.getDishes().subscribe(dishes => {
      this.dishes = dishes;
      console.log(dishes);
    },
      errMess => this.errMess = <any>errMess
    );
  }
}
