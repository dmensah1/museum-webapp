import { Component, OnInit } from '@angular/core';
import { ArtifactService } from '../../core/artifact.service';
import { FavouriteService } from '../../core/favourite.service';

@Component({
  selector: 'app-artifact',
  templateUrl: './artifact.component.html',
  styleUrls: ['./artifact.component.css']
})
export class ArtifactComponent implements OnInit {

  allArtifacts: string[] = [];

  constructor(private artifactService: ArtifactService,private favouriteService: FavouriteService) { }

  ngOnInit(): void {
    this.getArtifacts();
  }

  getArtifacts(): void {
    this.artifactService.getArtifacts()
        .subscribe(artifacts => {
          for (var i=0;i<artifacts.length;i++) {
            var name = artifacts[i].name;
            this.allArtifacts.push(name);
          }
      });
  }

  addToFavourites(artifactName){
    console.log(artifactName)
    this.favouriteService.addFavourite(artifactName)
    .subscribe(artifacts => {
      this.favouriteService.updateFavouritesList();
  });
  }

}
