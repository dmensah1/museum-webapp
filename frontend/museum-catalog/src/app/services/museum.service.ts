import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { dateTime } from 'node-datetime';

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

    newTicket(visitorId, museumId) {
        return this.http.post("http://localhost:3000/newTicket", {visitorNo: visitorId, museumNo: museumId, admissionPrice: 10});
    }

    getUsersTickets(visitorId) {
        return this.http.get(`http://localhost:3000/getUserTickets/${visitorId}`);
    }
}