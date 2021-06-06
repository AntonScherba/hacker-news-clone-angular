import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface Items {
  objectID: number;
  title: string;
  url: string;
  author: string;
  points: number;
  num_comments: number;
}

export interface Hits {
  hits: Items[];
  page: number;
  nbHits: number;
  nbPages: number;
  hitsPerPage: number;
}

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getItems() {
    return this.http.get(this.url + 'search?tags=front_page');
  }
}
