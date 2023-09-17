import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud-service.service';
import { Service } from '../models/Service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService extends CrudService<Service> {

    constructor(protected override http: HttpClient) {
        super(http, `${environment.API}Service`);
    }
}
