import { Injectable } from '@angular/core';
import { Leader } from "../shared/leader";
import { LEADERS } from "../shared/leaders";
@Injectable({
  providedIn: 'root'
}) 
export class LeaderService {
  leaders:Leader[]=LEADERS;
  constructor() { }

  getLeaders():Leader[]{
    return this.leaders;
  }
  getLeader(id:string):Leader{
    return this.leaders.filter((leader)=>(leader.id === id))[0];
  } 
  getFeaturedLeader():Leader{
    return this.leaders.filter(leader=>leader.featured)[0];
  }
}
