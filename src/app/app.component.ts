import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { LoadingService } from './services/loading.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'hacker-news-clone-angular';
  isLoading: boolean = true;

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.listenToLoading();
  }

  // Listen to the loadingSub property in the LoadingService class. This drives the
  // display of the loading spinner.
  listenToLoading(): void {
    this.loadingService.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .pipe(untilDestroyed(this))
      .subscribe((loading) => {
        this.isLoading = loading;
      });
  }
}
