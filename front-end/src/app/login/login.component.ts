import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    user: User;
    returnUrl!: string;
    mensagem: string = '';
    ativarSpinner: boolean = false;


    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private userService: UserService
    ) {
        this.user = {id: 0, name: '', lastname: '', email: '', password: '', administrator: false, services: []};
    }

    ngOnInit() {
        this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
    }

    entrar() {
        this.ativarSpinner = true;

        this.userService.userVerify(this.user)
            .subscribe({
                next: user => {
                    // var userReturn: User = user;
                    // localStorage.setItem('authenticated_user', JSON.stringify(userReturn));
                    // localStorage.setItem('user-email', userReturn.email);
                    // O método abaixo já faz o acima.
                    this.userService.user = user;

                    if (this.returnUrl == null) {
                        this.router.navigate(['/']);
                    } else {
                        this.router.navigate([this.returnUrl]);
                    }
                },
                error: err => {
                    this.mensagem = err.error;
                    this.ativarSpinner = false;
                }
            });

    }
}