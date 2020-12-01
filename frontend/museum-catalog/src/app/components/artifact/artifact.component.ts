import { Component, OnInit } from '@angular/core';
import { ArtifactService } from '../../core/artifact.service';

@Component({
  selector: 'app-artifact',
  templateUrl: './artifact.component.html',
  styleUrls: ['./artifact.component.css']
})
export class ArtifactComponent implements OnInit {

  allArtifacts: string[] = [];

  constructor(private artifactService: ArtifactService) { }

  ngOnInit(): void {
    this.getArtifacts();
  }

  getArtifacts(): void {
    this.artifactService.getArtifacts()
        .subscribe(artifacts => {
          console.log(artifacts)
          for (var i=0;i<artifacts.length;i++) {
            var name = artifacts[i].name;
            this.allArtifacts.push(name);
          }
      });
  }

}
