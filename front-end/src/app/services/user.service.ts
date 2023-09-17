import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud-service.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<User> {

    private _user!: User | null;
    apiURL: string = environment.API;

    constructor(protected override http: HttpClient) {
        super(http, `${environment.API}User`);
    }

    get user(): User | null {
        return this._user;
    }
    set user(value) {
        this._user = value;
        localStorage.setItem('authenticated_user', JSON.stringify(value));
    }

    authenticated_user(): boolean {
        return this._user != null && this._user.email != '' && this._user.password != '';
    }

    admin_user(): boolean | undefined {
        return this.authenticated_user() && this.user?.administrator;
    }

    session_clear() {
        localStorage.setItem('authenticated_user', '');
        this._user = null;
    }

    userVerify(user: User): Observable<User> {
        return this.http.post<User>(`${this.apiURL}User/VerificarUsuario`, JSON.stringify(user), { headers: this.headers });
    }


}
