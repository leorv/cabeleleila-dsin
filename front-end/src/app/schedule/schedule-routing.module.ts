import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleEditComponent } from './schedule-edit/schedule-edit.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { BookServiceComponent } from './book-service/book-service.component';

const routes: Routes = [
    {
        path: 'marcar',
        component: BookServiceComponent
    },
    {
        path: 'editar/:id',
        component: ScheduleEditComponent
    },
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
