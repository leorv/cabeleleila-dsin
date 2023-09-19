import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EMPTY, Observable, catchError, switchMap, take } from 'rxjs';
import { Service } from 'src/app/models/Service';
import { User } from 'src/app/models/User';
import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

@Component({
    selector: 'app-service-list',
    templateUrl: './service-list.component.html',
    styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent {
    services$: Observable<Service[]> = new Observable<Service[]>();
    users: User[] = [];

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
        private modalService: BsModalService,
    ) { }

    ngOnDestroy(): void {

    }

    ngOnInit(): void {
        this.onRefresh();
    }

    onRefresh() {
        this.services$ = this.serviceService.list().pipe(
            // map(),
            // tap(), a lógica do erro é legal deixarmos por último, para ele pegar qualquer erro que ocorre aqui antes.
            // switchMap()
            catchError(error => {
                console.error(error);
                // this.error$.next(true);
                this.handleError();
                return EMPTY;
                // return of(); // isso aqui daria o mesmo resultado dali de cima.
            })
        );
        this.userService.list().subscribe(users => {
            this.users = users;
        });
    }

    client(id: number) : string {
        const user: User | undefined = this.users.find(user => user.id == id);
        if (user) {
            return user.name;
        }
        return '';
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
