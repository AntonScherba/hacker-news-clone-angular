import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemsComponent } from './items/items.component';

const routes: Routes = [
  {
    path: '',
    component: ItemsComponent,
  },
  {
    path: 'item',
    loadChildren: () => import('./item/item.module').then((m) => m.ItemModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
