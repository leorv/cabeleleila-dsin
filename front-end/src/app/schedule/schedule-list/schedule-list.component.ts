import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EMPTY, Observable, catchError, map, switchMap, take } from 'rxjs';
import { Service } from 'src/app/models/Service';
import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

@Component({
    selector: 'app-schedule-list',
    templateUrl: './schedule-list.component.html',
    styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent {
    services$: Observable<Service[]> = new Observable<Service[]>();
    userId: number = 0;

    selectedService: number = 0;

    // deleteModal
    modalRef?: BsModalRef;
    message?: string;

    @ViewChild('deleteModal') deleteModal: any;

    constructor(
        private serviceService: ServiceService,
        private userService: UserService,
        private alertModalService: AlertModalService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }


    ngOnInit(): void {
        this.onRefresh();
    }

    onRefresh() {

        this.userId = this.userService.getUserId();
        
        this.services$ = this.serviceService.list().pipe(
            map((services: Service[]) => {
                let userServices: Service[] = [];

                services.forEach(service => {
                    if (service.userId == this.userId) {
                        userServices.push(service);
                    }
                });
                return userServices;
            }),
            
            catchError(error => {
                console.error(error);
                this.handleError();
                return EMPTY;
            })
        );
    }

    handleError() {
        this.alertModalService.showAlertDanger('Erro ao carregar serviços. Tente novamente mais tarde.');
    }

    onEdit(id: number) {
        this.router.navigate(['editar', id], { relativeTo: this.route })
    }

    onDelete(service: Service) {
        const result$ = this.alertModalService.showConfirmModal('Confirmação', 'Quer realmente remover este serviço?');
        result$.asObservable()
            .pipe(
                take(1),
                switchMap(result => result ? this.serviceService.delete(service.id) : EMPTY)
            )
            .subscribe({
                next: success => {
                    this.onRefresh();
                    this.modalRef?.hide();
                },
                error: error => {
                    this.alertModalService.showAlertDanger('Erro ao remover o serviço.');
                    this.modalRef?.hide();
                }
            })
    }

    onDetail(id: number) {
        this.router.navigate(['detalhes', id], { relativeTo: this.route });
    }

    onConfirmDelete() {
        this.serviceService.delete(this.selectedService).subscribe({
            next: success => {
                this.onRefresh();
            },
            error: error => {
                this.alertModalService.showAlertDanger('Erro ao remover o curso.');
            }
        })
    }

    onDeclineDelete() {
        this.modalRef?.hide();
    }
}
