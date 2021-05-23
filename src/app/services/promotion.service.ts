import { Injectable } from '@angular/core';

import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }
  
  getPromotions(): Promise<Promotion[]> {
    return new Promise(resolve=>{
      //server delay simulation
      setTimeout(() => {
        resolve(PROMOTIONS);
      }, 2000);
    });
  }

  getPromotion(id: string): Promise<Promotion> {
    return new Promise(resolve=>{
      //simulate server delay
      setTimeout(() => {
        resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]); 
      }, 2000);
    });
  }

  getFeaturedPromotion(): Promise<Promotion> {
    return new Promise(resolve=>{
      //simulate server delay
      setTimeout(() => {
        resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);        
      }, 2000);
    });
  }
}
