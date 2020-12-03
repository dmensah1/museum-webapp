import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router"
import { ArtifactService } from '../../core/artifact.service';

@Component({
  selector: 'app-update-artifact',
  templateUrl: './update-artifact.component.html',
  styleUrls: ['./update-artifact.component.css']
})
export class UpdateArtifactComponent implements OnInit {

  artifactNo: number;
  artifact: any;
  data: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private artifactService: ArtifactService) { }

  ngOnInit(): void {
    this.artifactNo = this.route.snapshot.params.id
    console.log(this.artifactNo)

    this.updateArtifact();
  }

  updateArtifact(): void {
    this.artifactService.getArtifactById(this.artifactNo).subscribe(res => {
      this.data = res[0];
      this.artifact = this.data;
      console.log(this.artifact)
    })
  }

  updateInfo(artifact): void {
    const newArtifact = {
      "artifactNo": artifact.artifactNo,
      "name": artifact.name,
      "description": artifact.description,
      "country": artifact.country,
      "theme": artifact.theme,
      "timePeriod": artifact.timePeriod
    }

    console.log(newArtifact)

    this.http.post("http://localhost:3000/updateArtifact/" + newArtifact.artifactNo, newArtifact).subscribe(
      response => {
        console.log(response);
      },
      error => console.log(error)
    );
  }
}
