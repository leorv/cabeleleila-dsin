import { Component } from '@angular/core';

import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Service } from 'src/app/models/Service';

@Component({
  selector: 'app-schedule-details',
  templateUrl: './schedule-details.component.html',
  styleUrls: ['./schedule-details.component.css']
})
export class ScheduleDetailsComponent {
    service: Service = {} as Service;

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
                this.service = service;
            });
    }

    back() {
        this.location.back();
    }
}
