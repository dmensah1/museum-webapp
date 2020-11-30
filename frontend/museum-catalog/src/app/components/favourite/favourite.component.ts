import { Component, OnInit } from '@angular/core';
import { FavouriteService } from '../../core/favourite.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {

  allFavourites: string[];

  constructor(private favouriteService: FavouriteService) {
    this.allFavourites = favouriteService.allFavourites;
    this.favouriteService.favouritesChange.subscribe(value => this.allFavourites = value);
   }

  ngOnInit(): void {
    this.getFavourites()
  }

  getFavourites(): void {
    this.favouriteService.getFavourites()
        .subscribe(favourites => {
          console.log(favourites)
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
