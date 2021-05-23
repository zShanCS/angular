import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { Leader } from '../shared/leader';
import { DishService } from '../services/dish.service';
import { LeaderService } from '../services/leader.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    dish: Dish;
  promotion: Promotion; 
  featuredLeader:Leader;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderService:LeaderService) { }

  ngOnInit() {
    console.log('home created');
    
    this.dishservice.getFeaturedDish().subscribe(dish=>this.dish=dish);
    this.promotionservice.getFeaturedPromotion().subscribe(promotion=>this.promotion=promotion);
    this.leaderService.getFeaturedLeader().subscribe(featuredLeader=>this.featuredLeader = featuredLeader);
  }

}
