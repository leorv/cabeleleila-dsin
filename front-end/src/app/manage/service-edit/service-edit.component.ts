import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Location } from '@angular/common';
import { ServiceService } from 'src/app/services/service.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Service } from 'src/app/models/Service';

@Component({
    selector: 'app-service-edit',
    templateUrl: './service-edit.component.html',
    styleUrls: ['./service-edit.component.css']
})
export class ServiceEditComponent implements OnInit {
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


    constructor(
        private formBuilder: FormBuilder,
        private serviceService: ServiceService,
        private modal: AlertModalService,
        private location: Location,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.params
            .pipe(
                map((params: any) => {
                    const id: number = params['id'];
                    return id;
                }),
                switchMap((id: number) => this.serviceService.getByid(id))
            )
            .subscribe((service: Service) => {
                this.updateForm(service)
            });
    }


    updateForm(service: Service) {
        const scheduleDateString: string = service.scheduledDate.toString();
        console.log(scheduleDateString);
        this.form.patchValue({
            id: service.id,
            name: service.name,
            price: service.price,
            requestDate: service.requestDate,
            scheduledDate: scheduleDateString,
            status: service.status,
            userId: service.userId
        });
        console.log(service.scheduledDate);
        // this.form.controls['id'].setValue(service.id);
        this.form.controls['name'].disable();
        // this.form.controls['lastname'].setValue(service.lastname);
        // this.form.controls['email'].setValue(service.email);
        // this.form.controls['password'].setValue(service.password);
    }

    hasError(campo: string) {
        return this.form.get(campo)?.errors;
    }

    onSubmit() {
        this.submitted = true;
        console.log(this.form.value);

        this.form.get('name')?.enable();

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
        console.log('onCancel');
        this.location.back();
    }
}
