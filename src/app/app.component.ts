// @ts-nocheck

import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStateChangeEvent, GridDataResult, PageSizeItem, PageChangeEvent  } from '@progress/kendo-angular-grid';
import { State, process } from "@progress/kendo-data-query";
import { Observable } from 'rxjs';
import { EditService } from './shared/edit.service';
import { map } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'NSFKendoPOC';

  data:any[]=[];


  constructor(){    
  }

  ngOnInit(): void {
    
    fetch('https://jsonplaceholder.typicode.com/todos')
  .then(response => response.json())
  .then(json => this.data=json)
    console.log(this.data)
  }




  
}
