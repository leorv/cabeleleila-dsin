import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, switchMap, take } from 'rxjs';
import { Service } from 'src/app/models/Service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-book-service',
    templateUrl: './book-service.component.html',
    styleUrls: ['./book-service.component.css']
})
export class BookServiceComponent implements OnInit {
    form: FormGroup = new FormGroup({
        id: new FormControl(),
        name: new FormControl(),
        price: new FormControl(),
        requestDate: new FormControl(),
        scheduledDate: new FormControl(),
        status: new FormControl(),
        userId: new FormControl()
    });
    submitted: boolean = false;
    sameDate: Date = new Date();

    userServices: Service[] = [];

    sameWeeks: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private serviceService: ServiceService,
        private userService: UserService,
        private modal: AlertModalService,
        private location: Location,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.formInit();
        this.serviceService.list().pipe(
            take(1)).subscribe({
                next: (services: Service[]) => {
                    console.log(services);
                    this.userServices = services;
                }
            });
        
        this.form.get('scheduledDate')?.statusChanges.pipe(debounceTime(500))
        .subscribe(() => {
            this.verifyWeek();
        })
    }

    scheduleSameDay() {
        this.form.patchValue({
            scheduledDate: this.sameDate
        });
        this.sameWeeks = false;
    }

    verifyWeek() {
        this.sameWeeks = false;
        const scheduledDate: Date = new Date(this.form.value.scheduledDate);
        console.log('verificando a semana...');
        console.log(this.userServices);
        this.userServices.forEach(service => {
            const dayOfWeek = new Date(service.scheduledDate).getDay();
            const dayOfMonth = new Date(service.scheduledDate).getDate();

            const scheduledDayOfWeek = new Date(scheduledDate).getDay();
            const scheduledDayOfMonth = new Date(scheduledDate).getDate();

            if (dayOfWeek < scheduledDayOfWeek && (scheduledDayOfMonth - dayOfMonth) < 7) {
                this.sameWeeks = true;
                this.sameDate = service.scheduledDate;
                console.log('mesma semana');
            }
            console.log(scheduledDayOfMonth);
            console.log(dayOfMonth);
            console.log((scheduledDayOfMonth - dayOfMonth));
        });        
    }

    formInit() {
        const id = this.userService.getUserId();
        this.form.patchValue({
            id: 0,
            name: '',
            price: '',
            requestDate: new Date(Date.now()),
            scheduledDate: '',
            status: 'PENDENTE',
            userId: id
        });
    }

    hasError(campo: string) {
        return this.form.get(campo)?.errors;
    }

    onSubmit() {
        this.submitted = true;
        console.log(this.form.value);

        if (this.form.valid) {
            console.log('submit');

            let msgSuccess = 'Serviço criado com sucesso!';
            let msgError = 'Erro ao criar serviço.';
            if (this.form.value.id) {
                msgSuccess = 'Serviço atualizado com sucesso!';
                msgError = 'Erro ao atualizar serviço.';
            }

            this.serviceService.save(this.form.value).subscribe({
                next: () => {
                    this.modal.showAlertSuccess(msgSuccess);
                    this.location.back();
                },
                error: () => {
                    this.modal.showAlertDanger(msgError);
                }
            })
        }
    }

    onCancel() {
        this.submitted = false;
        this.form.reset();
        this.location.back();
    }
}


