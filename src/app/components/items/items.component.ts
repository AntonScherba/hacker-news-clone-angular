import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Page, HackerNewsService } from '../../services/hacker-news.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  page: Page;

  currentPage: number = 0;
  limit: number = 10;

  constructor(
    private itemsService: HackerNewsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        switchMap((params) => {
          this.currentPage = +params.p - 1 || 0;
          this.limit = params.limit || 10;
          return this.itemsService.getItems(this.currentPage, this.limit);
        })
      )
      .subscribe((data: Page) => (this.page = data));
  }

  onPageChange(event: any) {
    this.router.navigate(['items'], {
      queryParams: {
        p: event.pageIndex + 1,
        limit: event.pageSize,
      },
    });
  }
}
