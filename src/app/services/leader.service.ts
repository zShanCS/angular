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
    return Promise.resolve(this.leaders);
  }
  getLeader(id:string):Promise<Leader>{
    return Promise.resolve(this.leaders.filter((leader)=>(leader.id === id))[0]);
  } 
  getFeaturedLeader():Promise<Leader>{
    return Promise.resolve(this.leaders.filter(leader=>leader.featured)[0]);
  }
}
