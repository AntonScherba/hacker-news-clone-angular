import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface News {
  objectID: number;
  title: string;
  url: string;
  author: string;
  points: number;
  num_comments: number;
}

export interface Page {
  hits: News[];
  page: number;
  nbHits: number;
  nbPages: number;
  hitsPerPage: number;
}

export interface Comment {
  id: number;
  created_at: Date;
  author: string;
  title: string;
  text?: string;
  url: string;
  points: number;
  parent_id?: null;
  children?: Comment[];
}

@Injectable({
  providedIn: 'root',
})
export class HackerNewsService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getItems(page: number, limit: number) {
    let url = `${this.baseUrl}search?tags=front_page&page=${page}&hitsPerPage=${limit}`;
    return this.http.get(url);
  }

  public getItemById(id: number) {
    let url = `${this.baseUrl}items/${id}`;
    return this.http.get(url);
  }
}
