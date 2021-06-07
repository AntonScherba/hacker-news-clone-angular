import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root',
})
export class HackerNewsService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getPage(page: number, limit: number): Observable<Page> {
    const url = `${this.baseUrl}search?tags=front_page&page=${page}&hitsPerPage=${limit}`;
    return this.http.get<Page>(url);
  }

  public getComments(id: number): Observable<Comment> {
    const url = `${this.baseUrl}items/${id}`;
    return this.http.get<Comment>(url);
  }
}
