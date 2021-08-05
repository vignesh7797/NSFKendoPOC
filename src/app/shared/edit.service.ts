import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map } from "rxjs/operators";

const CREATE_ACTION ="create";
const UPDATE_ACTION ="update";
const REMOVE_ACTION ="destroy";

@Injectable({
  providedIn: 'root'
})
export class EditService extends BehaviorSubject<any[]>{

  constructor(private http:HttpClient) {
    super([]);
   }

   private data:any[]=[];

   public read(){
     if(this.data.length){
       return super.next(this.data);
     }

     this.fetch().pipe(tap(data =>{
      // console.log(data);
      this.data =data;
    }
    )).subscribe(data =>{
      super.next(data);
    });
   }

   public save(data:any, isNew?:boolean){
     const action = isNew ? CREATE_ACTION : UPDATE_ACTION;

     this.reset();

     this.fetch(action, data).subscribe(
       ()=>this.read(),
       ()=> this.read()
     );
   }

   public remove(data:any){
     this.reset();

     this.fetch(REMOVE_ACTION, data).subscribe(
      ()=>this.read(),
      ()=> this.read()
     );
   }

   public resetItem(dataItem:any){
     if(!dataItem){
       return;
     }

     const originalData = this.data.find(
       item => item.id===dataItem.id
     );

     Object.assign(originalData, dataItem);

     super.next(this.data);
   }

   private reset(){
     this.data =[];
   }

   private fetch(action:string='', data?:any):Observable<any[]>{
      return this.http.get(`https://jsonplaceholder.typicode.com/todos?${this.serializeModels(data)}`).pipe(map(res => <any[]> res))
   }

   private serializeModels(data?: any): string {
    return data ? `&models=${JSON.stringify([data])}` : "";
  }
  
}
