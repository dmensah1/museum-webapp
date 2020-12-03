import { Component, OnInit } from '@angular/core';
import { ArtifactService } from '../../core/artifact.service';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-curator',
  templateUrl: './curator.component.html',
  styleUrls: ['./curator.component.css']
})
export class CuratorComponent implements OnInit {
  allArtifacts: string[] = [];

  artifacts: Object;
  url = "http://localhost:3000/artifacts";

  constructor(private artifactService: ArtifactService, private http: HttpClient) { }

  ngOnInit(): void {
    // this.getArtifacts();

    this.http.get(this.url).subscribe(data => {
      this.artifacts = data;
      console.log(this.artifacts);
    });
  }

  // getArtifacts(): void {
  //   this.artifactService.getArtifacts()
  //     .subscribe(artifacts => {
  //       console.log(artifacts)
  //       for (var i = 0; i < artifacts.length; i++) {
  //         var name = artifacts[i].name;
  //         this.allArtifacts.push(name);
  //       }
  //     });
  // }

  newArtifact(artifact): void {
    const newArtifact = {
      "name": artifact.name,
      "description": artifact.description,
      "country": artifact.country,
      "theme": artifact.theme,
      "timePeriod": artifact.timePeriod
    }

    console.log(newArtifact)

    // this.http.put("addnewArtifactourite", this.list).subscribe((res: Response) => {
    //   console.log(res);
    // })

    this.http.post("http://localhost:3000/addArtifact", newArtifact).subscribe(
      response => {
        console.log(response);
      },
      error => console.log(error)
    );
  }

}
