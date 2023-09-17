import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientEditComponent } from './client-edit/client-edit.component';



@NgModule({
  declarations: [
    ClientListComponent,
    ClientEditComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ClientModule { }
