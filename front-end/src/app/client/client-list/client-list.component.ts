import { EMPTY, Observable, catchError, switchMap, take } from 'rxjs';
import { User } from './../../models/User';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit, OnDestroy {
    clients$: Observable<User[]> = new Observable<User[]>();

    selectedClient: number = 0;

    // deleteModal
    modalRef?: BsModalRef;
    message?: string;

    @ViewChild('deleteModal') deleteModal: any;

    constructor(
        private userService: UserService,
        private alertModalService: AlertModalService,
        private router: Router,
        private route: ActivatedRoute,
        private modalService: BsModalService,

    ) { }

    ngOnDestroy(): void {
        
    }

    ngOnInit(): void {
        // this.cursoService.list().subscribe(
        //     dados => this.cursos = dados
        // );
        this.onRefresh();
    }

    onRefresh() {
        this.clients$ = this.userService.list().pipe(
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
            
    }

    handleError() {
        this.alertModalService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');
    }

    onEdit(id: number) {
        this.router.navigate(['editar', id], { relativeTo: this.route })
    }

    onDelete(user: User) {
        if (user.administrator == true) {
            this.alertModalService.showAlertDanger('Não é possível remover o administrador.');
        } else {
            const result$ = this.alertModalService.showConfirmModal('Confirmação', 'Quer realmente remover este cliente?');
            result$.asObservable()
                .pipe(
                    take(1),
                    switchMap(result => result ? this.userService.delete(user.id) : EMPTY)
                )
                .subscribe({
                    next: success => {
                        this.onRefresh();
                        this.modalRef?.hide();
                    },
                    error: error => {
                        this.alertModalService.showAlertDanger('Erro ao remover o cliente.');
                        this.modalRef?.hide();
                    }
                })
        }

        
        
    }

    onConfirmDelete() {
        this.userService.delete(this.selectedClient).subscribe({
            next: success => {
                this.onRefresh();
                // this.modalRef?.hide(); Não precisa mais. É um método do showConfirm.
            },
            error: error => {
                this.alertModalService.showAlertDanger('Erro ao remover o curso.');
                // this.modalRef?.hide();
            }
        })
    }

    onDeclineDelete() {
        this.modalRef?.hide();
    }
}
