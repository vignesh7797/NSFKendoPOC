import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientJsonpModule, HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';

import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from "@progress/kendo-angular-inputs"
import { EditService } from './shared/edit.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GridModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ButtonModule,
    BrowserAnimationsModule,
    InputsModule
  ],
  providers: [EditService],
  bootstrap: [AppComponent]
})
export class AppModule { }
