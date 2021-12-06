import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Article, SearchService } from './pages/search/services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //create observable
  articles$!: Observable<Article[]>;
  constructor(private readonly _searchSvc: SearchService) {}
  onSearch(term: string): void {
    console.log(term);
    this.articles$ = this._searchSvc.search(term);
  }
}
