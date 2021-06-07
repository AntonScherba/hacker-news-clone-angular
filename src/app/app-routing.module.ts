import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from './components/mainPage/mainPage.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'items',
  },
  {
    path: 'items',
    component: MainPageComponent,
  },
  {
    path: 'item',
    loadChildren: () =>
      import('./components/comments/comments.module').then(
        (m) => m.CommentsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
