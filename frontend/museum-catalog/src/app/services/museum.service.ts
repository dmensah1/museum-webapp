import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MuseumService {

    private museums: [] = [];

    constructor(private http: HttpClient, private router: Router) {}

    getMuseums() {
        this.museums = [];
        return this.http.get("http://localhost:3000/museum");
        
    }
}