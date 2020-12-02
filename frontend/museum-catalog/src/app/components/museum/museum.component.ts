import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MuseumService } from 'src/app/services/museum.service';
import { Museum } from './museum.model';

@Component({
    selector: 'app-museum',
    templateUrl: './museum.component.html',
    styleUrls: ['./museum.component.scss']
})
export class MuseumComponent implements OnInit{
    museums: Museum[];
    visitorId;
    ticketPurchased = false;

    constructor(private museumService: MuseumService, private authService: AuthService) {}

    ngOnInit() {
        let email = localStorage.getItem('email');
        
        this.museumService.getMuseums().subscribe((response: Museum[]) => {
            this.museums = response;
        });

        this.authService.getUser(email).subscribe(resp => {
            this.visitorId = resp[0].visitorNo;
            this.museumService.getUsersTickets(this.visitorId).subscribe(resp => {
                console.log(resp); //resp is array of tickets the certain user has
            });
        });
    }

    purchaseTicket(museumId) {
        let email = localStorage.getItem('email');

        this.authService.getUser(email).subscribe(resp => {
            this.visitorId = resp[0].visitorNo;
            this.museumService.newTicket(this.visitorId, museumId).subscribe(resp => {
                //console.log(resp);
                this.ticketPurchased = true;
            });
        });
    }
}