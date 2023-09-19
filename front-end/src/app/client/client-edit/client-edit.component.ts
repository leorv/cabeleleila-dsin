import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, map, switchMap, take, Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {
    form: FormGroup = new FormGroup({
        id: new FormControl(),
        name: new FormControl(),
        lastname: new FormControl(),
        email: new FormControl(),
        password: new FormControl()
    });
    submitted: boolean = false;
    

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
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
                switchMap((id: number) => this.userService.getByid(id))
            )
            .subscribe((user: User) => {
                this.updateForm(user)
            });
    }


    updateForm(user: User) {
        this.form.patchValue({
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            password: user.password
        });
        // this.form.controls['id'].setValue(user.id);
        // this.form.controls['name'].setValue(user.name);
        // this.form.controls['lastname'].setValue(user.lastname);
        // this.form.controls['email'].setValue(user.email);
        // this.form.controls['password'].setValue(user.password);
    }

    hasError(campo: string) {
        return this.form.get(campo)?.errors;
    }

    onSubmit() {
        this.submitted = true;
        console.log(this.form.value);
        if (this.form.valid) {
            console.log('submit');

            let msgSuccess = 'Cliente criado com sucesso!';
            let msgError = 'Erro ao criar cliente.';
            if (this.form.value.id) {
                msgSuccess = 'Cliente atualizado com sucesso!';
                msgError = 'Erro ao atualizar cliente.';
            }

            this.userService.save(this.form.value).subscribe({
                next: success => {
                    this.modal.showAlertSuccess(msgSuccess);
                    this.location.back();
                },
                error: error => {
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
