import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService implements OnInit {

  project = new BehaviorSubject<Project[]>([]);
  proArr:any=[];

  constructor() {
    for(let i=1; i<=25; i++){

    let pro:Project ={
      id:i,
      name:this.makeRandom(7,'qwertyuiopasdfghjklzxcvbnm'),
      gender:this.makeRandom(1,'MF'),
      phone:+this.makeRandom(10, '0123456789'),
      proj_name:(i%2==0)?this.makeRandom(5,'qwertyuiopasdfghjklzxcvbnm') +' '+ this.makeRandom(7,'qwertyuiopasdfghjklzxcvbnm') : this.makeRandom(10,'qwertyuiopasdfghjklzxcvbnm'),
      target:+this.makeRandom(2,'0123456789'),
      budget:(i%2==0)? +this.makeRandom(4, '0123456789') : +this.makeRandom(5, '0123456789')
    };

    this.proArr.push(pro);

  }

    
   
    console.log(this.proArr)

    this.project.next(this.proArr);
   }

  ngOnInit() {
    
  }

  getProject(){
    return this.project.asObservable();
  }

  makeRandom(length:number, possible:string){
    let text = '';
    for(let x=0; x<length; x++){
      text +=possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return text

  }

}
