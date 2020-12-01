import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { Favourite } from './favourite';
import { HttpClient} from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import { UserService } from './user.service';
import { from } from 'rxjs';
import { concatMap, delay, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  private allFavourites = 'favourites/';

  constructor(public userService: UserService,private http: HttpClient) { }

  getFavourites(): Observable<Favourite[]> {
    return from(this.userService.getCurrentUser()).pipe(concatMap(
      res => {
        var url = this.allFavourites.concat(res.email);
        return this.http.get<Favourite[]>(url).pipe(
          catchError(this.handleError<Favourite[]>('getFavourites'))
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
