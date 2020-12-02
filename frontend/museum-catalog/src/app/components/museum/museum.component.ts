import { Component, OnInit } from '@angular/core';
import { MuseumService } from 'src/app/services/museum.service';
import { Museum } from './museum.model';

@Component({
    selector: 'app-museum',
    templateUrl: './museum.component.html',
    styleUrls: ['./museum.component.scss']
})
export class MuseumComponent implements OnInit{
    museums: Museum[];

    constructor(private museumService: MuseumService) {}

    ngOnInit() {
        this.museumService.getMuseums().subscribe((response: Museum[]) => {
            this.museums = response;
            console.log(this.museums);
        });
    }

    purchaseTicket(id) {
        console.log(id);
    }
}