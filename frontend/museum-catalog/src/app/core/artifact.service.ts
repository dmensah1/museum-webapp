import { Injectable } from '@angular/core';
import { Artifact } from './artifact';
import { Observable, of} from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArtifactService {
  private allArtifacts = 'artifacts';

  constructor(private http: HttpClient) { }

  getArtifacts(): Observable<Artifact[]> {
    return this.http.get<Artifact[]>(this.allArtifacts).pipe(
      catchError(this.handleError<Artifact[]>('getArtifacts'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
