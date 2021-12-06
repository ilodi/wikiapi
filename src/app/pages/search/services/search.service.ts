import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pluck } from 'rxjs';
import { environment } from 'src/environments/environment';

interface WikiResponse {
  query: {
    search: Article[];
  };
}

export interface Article {
  ns: number;
  pageid: string;
  size: number;
  snippet: string;
  timestamp: Date;
  title: string;
  wordcount: number;
}

@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(private readonly http: HttpClient) {}

  search(term: string): Observable<Article[]> {
    const params = {
      action: 'query',
      format: 'json',
      list: 'search',
      origin: '*',
      srlimit: 8,
      srsearch: term,
      utf8: 1,
    };
    return this.http
      .get<WikiResponse>(environment.api, { params })
      .pipe(pluck('query', 'search'));
  }
}
