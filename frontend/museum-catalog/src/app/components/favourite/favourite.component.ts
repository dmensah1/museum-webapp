import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MuseumService } from 'src/app/services/museum.service';
import { FavouriteService } from '../../core/favourite.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {
  visitorId;
  visitorName;
  allFavourites: string[];
  allTickets;

  constructor(private favouriteService: FavouriteService, private authService: AuthService, private museumService: MuseumService) {
    this.allFavourites = favouriteService.allFavourites;
    this.favouriteService.favouritesChange.subscribe(value => this.allFavourites = value);
   }

  ngOnInit() {
    this.getFavourites()

    // retrieves the user's tickets upon page load
    let email = localStorage.getItem('email');
    this.authService.getUser(email).subscribe(resp => {
      this.visitorId = resp[0].visitorNo;
      this.visitorName = resp[0].name;
      this.museumService.getUsersTickets(this.visitorId).subscribe(resp => {
          this.allTickets = resp;
      });
  });
  }

  getFavourites(): void {
    this.favouriteService.getFavourites()
        .subscribe(favourites => {
          //console.log(favourites)
          this.allFavourites = [];
          for (var i=0;i<favourites.length;i++) {
            var name = favourites[i].artifactName;
            this.allFavourites.push(name);
          }
      });
  }

  deleteFavourite(artifactName): void {
    this.favouriteService.deleteFavourite(artifactName)
        .subscribe(favourites => {
          this.favouriteService.updateFavouritesList();
      });
  }
}
