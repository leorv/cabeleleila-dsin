import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Location } from '@angular/common';
import { map, switchMap } from 'rxjs';
import { User } from 'src/app/models/User';

@Component({
    selector: 'app-new-user',
    templateUrl: './new-user.component.html',
    styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
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
        const user: User = { id: 0, name: '', lastname: '', email: '', password: '', administrator: false, services: [] };
        this.updateForm(user);

    }


    updateForm(user: User) {
        this.form.patchValue({
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            password: user.password
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
