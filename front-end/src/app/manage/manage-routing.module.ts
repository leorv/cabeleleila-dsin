import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceEditComponent } from './service-edit/service-edit.component';

const routes: Routes = [
    {
        path: 'editar/:id',
        component: ServiceEditComponent
    },
    {
        path: '',
        component: ServiceListComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
