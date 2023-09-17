import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { BookServiceComponent } from './book-service/book-service.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ScheduleEditComponent } from './schedule-edit/schedule-edit.component';


@NgModule({
  declarations: [
    BookServiceComponent,
    ScheduleListComponent,
    ScheduleEditComponent
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule
  ]
})
export class ScheduleModule { }
