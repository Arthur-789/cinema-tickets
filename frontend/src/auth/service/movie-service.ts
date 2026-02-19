import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieModel } from '../../app/core/models/movie.model';
import { SessionModel } from '../../app/core/models/session.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {

  private apiUrl = 'http://localhost:3000/filmes';

  constructor(private http: HttpClient) {}

  getMovieById(id: number): Observable<MovieModel> {
    return this.http.get<MovieModel>(`${this.apiUrl}/${id}`);
  }

  getSessionsByMovieId(movieId: number): Observable<SessionModel[]> {
    return this.http.get<SessionModel[]>(`http://localhost:3000/sessoes?filmeId=${movieId}?_expand=sala`);
  }
}
