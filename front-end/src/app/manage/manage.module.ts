import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoutingModule } from './manage-routing.module';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceEditComponent } from './service-edit/service-edit.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
    declarations: [
        ServiceListComponent,
        ServiceEditComponent
    ],
    imports: [
        CommonModule,
        BsDatepickerModule.forRoot(),
        ReactiveFormsModule,
        ManageRoutingModule
    ]
})
export class ManageModule { }
