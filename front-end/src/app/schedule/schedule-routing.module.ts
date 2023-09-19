import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleEditComponent } from './schedule-edit/schedule-edit.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { BookServiceComponent } from './book-service/book-service.component';
import { ScheduleDetailsComponent } from './schedule-details/schedule-details.component';

const routes: Routes = [
    {
        path: 'novo',
        component: BookServiceComponent
    },
    {
        path: 'editar/:id',
        component: ScheduleEditComponent
    },
    {
        path: 'detalhes/:id',
        component: ScheduleDetailsComponent
    }
    ,
    {
        path: '',
        component: ScheduleListComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
