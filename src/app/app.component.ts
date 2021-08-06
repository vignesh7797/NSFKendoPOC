import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStateChangeEvent, GridDataResult, PageSizeItem, PageChangeEvent  } from '@progress/kendo-angular-grid';
import { State, process } from "@progress/kendo-data-query";
import { EditService } from './shared/edit.service';
import { ProjectService } from './shared/project.service';
import { Project } from './shared/project';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const newFormGroup = (dataItem:any) => new FormGroup({
  'id':new FormControl(dataItem.id, Validators.min(1)),
  'name':new FormControl(dataItem.name, Validators.required),
  'gender':new FormControl(dataItem.gender, Validators.required),
  'phone':new FormControl(dataItem.phone, Validators.required),
  'budget': new FormControl(dataItem.budget, Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,5}')])),
  'proj_name':new FormControl(dataItem.proj_name, Validators.required),
  'target':new FormControl(dataItem.target, [Validators.required, Validators.pattern('^[0-9]{1,3}'),Validators.max(100)])
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'NSFKendoPOC';

  data:any[]=[];

  data2:any ;

  public gridState:State ={
    sort:[],
    skip:0,
    take:10
  };

   formGroup:FormGroup = newFormGroup({});

   
   editRowIndex:number | undefined;


  constructor(private projectService:ProjectService, private editService:EditService){
    

    // setTimeout(()=>{
    //   this.projectService.getProject().subscribe(pro =>{
    //     console.log(pro);
    //     this.data2 =pro;
    //   });
    // },1000)
  }

  ngOnInit(): void {
    
    fetch('https://jsonplaceholder.typicode.com/todos')
  .then(response => response.json())
  .then(json => this.data=json)
    console.log(this.data)

    this.data2 = this.editService.pipe(map((data:any) => process(data, this.gridState)))
    
  }

  onStateChange(state:State){
    this.gridState = state;
    this.editService.read();
  }

  addHandler({sender}:any){
    this.closeEditor(sender);

    this.formGroup = newFormGroup({
      'id':0,
      'name':'',
      'gender':'',
      'phone':0,
      'budget': 0,
      'proj_name':'',
      'target':0
    })
  }

  editHandler({sender, rowIndex, dataItem}:any){
    this.closeEditor(sender);

    this.formGroup = new FormGroup({
      'id':new FormControl(dataItem.id, Validators.min(1)),
      'name':new FormControl(dataItem.name, Validators.required),
      'gender':new FormControl(dataItem.gender, Validators.required),
      'phone':new FormControl(dataItem.phone, Validators.required),
      'budget': new FormControl(dataItem.budget, Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,5}')])),
      'proj_name':new FormControl(dataItem.proj_name, Validators.required),
      'target':new FormControl(dataItem.target, [Validators.required, Validators.pattern('^[0-9]{1,3}'),Validators.max(100)])
    });

    this.editRowIndex = rowIndex;

    sender.editEow(rowIndex, this.formGroup);
  }

  cancelHandler({sender, rowIndex}:any){
    this.closeEditor(sender, rowIndex);
  }

  saveHandler({sender, rowIndex, formGroup, isNew}:any){
    const project:Project = formGroup.value;

    this.editService?.save(project, isNew);

    sender.closeRow(rowIndex);
  }

  removeHandler({dataItem}:any){
    this.editService?.remove(dataItem);
  }

  closeEditor(grid:any, rowIndex=this.editRowIndex){
      grid.closeRow(rowIndex);
      this.editRowIndex = undefined;
      this.formGroup.reset();
  }


  
}
