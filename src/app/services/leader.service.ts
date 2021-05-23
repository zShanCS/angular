import { Injectable } from '@angular/core';
import { Leader } from "../shared/leader";
import { LEADERS } from "../shared/leaders";
@Injectable({
  providedIn: 'root'
}) 
export class LeaderService {
  leaders:Leader[]=LEADERS;
  constructor() { }

  getLeaders():Promise<Leader[]>{
    return new Promise(resolve=>{
      //set timeout to simulate server delay
      setTimeout(() => {
        resolve(this.leaders)
      }, 2000);
    });
  }
  getLeader(id:string):Promise<Leader>{
    return new Promise(resolve=>{
      //simulate srever delay
      setTimeout(() => {
      resolve(this.leaders.filter((leader)=>(leader.id === id))[0]);
      }, 2000);
    });
  } 
  getFeaturedLeader():Promise<Leader>{
    return new Promise(resolve=>{
      //simulate server delay
      setTimeout(() => {
        resolve(this.leaders.filter(leader=>leader.featured)[0]);
      }, 2000);
    });
  }
}
