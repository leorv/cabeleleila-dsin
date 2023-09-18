import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { delay, Observable, take, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CrudService<T extends { id: number }> {

    constructor(
        protected http: HttpClient,
        @Inject(String) private API_URL: string
    ) { }

    get headers() {
        return new HttpHeaders().set('content-type', 'application/json');
    }

    list() {
        return this.http.get<T[]>(this.API_URL)
            .pipe(
                delay(500),
                tap(console.log)
            );
    }

    getByid(id: number): Observable<T> {
        return this.http.get<T>(`${this.API_URL}/${id}`);
    }

    private create(record: T) {
        return this.http.post(this.API_URL, record);
    }

    private update(record: T) {
        return this.http.put(`${this.API_URL}/${record['id']}`, record);
    }

    save(record: T) {
        if (record['id']) {
            return this.update(record);
        }
        return this.create(record);
    }

    delete(id: number): Observable<T> {
        return this.http.delete<T>(`${this.API_URL}/${id}`);
    }

}