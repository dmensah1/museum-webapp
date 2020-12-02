import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Favourite } from '../models/favourite';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  allFavourites: string[] = [];

  private allFavouritesURL = 'favourites/';
  private addFavouriteURL = 'addNewFavourite';
  private deleteFavouriteURL = 'deleteFavourite/';

  favouritesChange: Subject<string[]> = new Subject<string[]>();

  constructor(private http: HttpClient) {
    this.favouritesChange.subscribe((value) => {
      this.allFavourites = value
  });
   }

  getFavourites(): Observable<Favourite[]> {
    var url = this.allFavouritesURL.concat(localStorage.getItem('email'));
        return this.http.get<Favourite[]>(url).pipe(
          catchError(this.handleError<Favourite[]>('getFavourites'))
        );
  }

  updateFavouritesList(){
    this.getFavourites()
        .subscribe(favourites => {
          this.allFavourites = [];
          for (var i=0;i<favourites.length;i++) {
            var name = favourites[i].artifactName;
            this.allFavourites.push(name);
          }
          this.favouritesChange.next(this.allFavourites);
          console.log(this.allFavourites)
      });
  }

  addFavourite(artifactName): Observable<[]> {
    var url = this.addFavouriteURL;
        var body = {
          "artifactName": artifactName,
          "email": localStorage.getItem('email')
          }
        return this.http.put<[]>(url, body,this.httpOptions).pipe(
          catchError(this.handleError<[]>('addFavourite')),
        );
    
  }

  deleteFavourite(artifactName): Observable<[]> {
    var url = this.deleteFavouriteURL.concat(localStorage.getItem('email') + "/" + artifactName);;
        return this.http.delete<[]>(url, this.httpOptions).pipe(
          catchError(this.handleError<[]>('deleteFavourite'))
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
