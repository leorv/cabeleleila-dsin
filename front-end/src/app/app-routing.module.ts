import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: 'agenda',
        loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule)
    },
    {
        path: 'gerenciar',
        loadChildren: () => import('./manage/manage.module').then(m => m.ManageModule)
    },
    {
        path: 'clientes',
        loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
