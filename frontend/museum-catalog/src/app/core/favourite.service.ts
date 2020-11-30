import { Injectable } from '@angular/core';
import { Observable, of, from, Subject } from 'rxjs';
import { Favourite } from './favourite';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { catchError,concatMap} from 'rxjs/operators';

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

  constructor(public userService: UserService,private http: HttpClient) {
    this.favouritesChange.subscribe((value) => {
      this.allFavourites = value
  });
   }

  getFavourites(): Observable<Favourite[]> {
    return from(this.userService.getCurrentUser()).pipe(concatMap(
      res => {
        var url = this.allFavouritesURL.concat(res.email);
        return this.http.get<Favourite[]>(url).pipe(
          catchError(this.handleError<Favourite[]>('getFavourites'))
        );
      }))
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
    return from(this.userService.getCurrentUser()).pipe(concatMap(
      res => {
        var url = this.addFavouriteURL;
        var body = {
          "artifactName": artifactName,
          "email": res.email
          }
        return this.http.put<[]>(url, body,this.httpOptions).pipe(
          catchError(this.handleError<[]>('addFavourite')),
        );
      }))
  }

  deleteFavourite(artifactName): Observable<[]> {
    return from(this.userService.getCurrentUser()).pipe(concatMap(
      res => {
        var url = this.deleteFavouriteURL.concat(res.email + "/" + artifactName);;
        return this.http.delete<[]>(url, this.httpOptions).pipe(
          catchError(this.handleError<[]>('deleteFavourite'))
        );
      }))
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
