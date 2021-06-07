import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Page, ItemsService } from '../services/items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  page: Page;

  currentPage: number;

  constructor(
    private itemsService: ItemsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        switchMap((params) => {
          this.currentPage = +params.p - 1 || 0;
          return this.itemsService.getItems(this.currentPage);
        })
      )
      .pipe()
      .subscribe((data: Page) => (this.page = data));

    // this.itemsService.getItems(0).subscribe((response: Page) => {
    //   this.page = response;
    // });
  }

  onClick(event: any) {
    this.router.navigate(['items'], {
      queryParams: {
        p: event + 1,
      },
    });
    console.log(event);
  }
}
