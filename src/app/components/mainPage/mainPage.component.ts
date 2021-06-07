import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Page } from 'src/app/models/page';
import { HackerNewsService } from '../../services/hacker-news.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-items',
  templateUrl: './mainPage.component.html',
  styleUrls: ['./mainPage.component.css'],
})
export class MainPageComponent implements OnInit {
  currentPage: number = 0;
  limit: number = 10;
  page: Page;

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
          return this.itemsService.getPage(this.currentPage, this.limit);
        })
      )
      .pipe(untilDestroyed(this))
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
