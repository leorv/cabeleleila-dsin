import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { BookServiceComponent } from './book-service/book-service.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ScheduleEditComponent } from './schedule-edit/schedule-edit.component';
import { ScheduleDetailsComponent } from './schedule-details/schedule-details.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [
    BookServiceComponent,
    ScheduleListComponent,
    ScheduleEditComponent,
    ScheduleDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ScheduleRoutingModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class ScheduleModule { }
