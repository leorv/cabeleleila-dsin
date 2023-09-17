import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoutingModule } from './manage-routing.module';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceEditComponent } from './service-edit/service-edit.component';


@NgModule({
  declarations: [
    ServiceListComponent,
    ServiceEditComponent
  ],
  imports: [
    CommonModule,
    ManageRoutingModule
  ]
})
export class ManageModule { }
