import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientEditComponent } from './client-edit/client-edit.component';

const routes: Routes = [
    {
        path: 'editar/:id',
        component: ClientEditComponent
    },
    {
        path: '',
        component: ClientListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRoutingModule { }
