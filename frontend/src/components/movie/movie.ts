import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MovieService } from '../../auth/service/movie-service';
import { MovieModel } from '../../app/core/models/movie.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SessionModel } from '../../app/core/models/session.model';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie.html',
  styleUrl: './movie.css',
})
export class Movie implements OnInit {

  movie?: MovieModel;
  
  sessions: SessionModel[] = [];
  filteredSessions: SessionModel[] = [];
  currentDate: string = new Date().toISOString().split('T')[0];

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const movieId = Number(params.get('id'));

      if (movieId) {
        this.movieService.getMovieById(movieId).subscribe({
          next: (dadosDoFilme) => {
            this.movie = dadosDoFilme;
            console.log('Filme carregado com sucesso:', this.movie);
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error('Erro ao carregar detalhes do filme:', err);
          }
        });

        this.movieService.getSessionsByMovieId(movieId).subscribe({
          next: (dadosDasSessoes) => {
            console.log('Sessões carregadas com sucesso:', dadosDasSessoes);
            this.sessions = dadosDasSessoes;
            this.filterByDate(this.currentDate);
            console.log('Sessões filtradas para a data atual:', this.filteredSessions);
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error('Erro ao carregar sessões do filme:', err);
          }
        });
      }
    })
  }

  filterByDate(evento: any) {
    const selectedDate = typeof evento === 'string' ? evento : evento.target.value;
    this.currentDate = selectedDate;
    this.filteredSessions = this.sessions.filter(sessao => sessao.data === selectedDate);
  }

  getPoster(): string {
    return '/images/' + this.movie?.poster;
  }

  getBackdropImage(): string {
    return '/images/' + this.movie?.backdrop;
  }
}
