import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-search',
  template: `
    <div class="form">
      <form>
        <div class="form--field">
          <input type="text" [formControl]="inputSearch" placeholder="Search" />
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  inputSearch = new FormControl('');
  //chields send data to father
  @Output() submitted = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    this.onChange();
  }
  onChange(): void {
    this.inputSearch.valueChanges
      .pipe(
        //one by one
        map((search: string) => search.trim()),
        //time to emit
        debounceTime(350),
        //no emit it, if it's equals
        distinctUntilChanged(),
        //filter empty value
        filter((search: string) => search !== ''),

        tap((search: string) => this.submitted.emit(search))
      )
      .subscribe();
    //  this.inputSearch.valueChanges
    //    .pipe(tap((res) => this.submitted.emit(res)))
    //    .subscribe();
  }
}
