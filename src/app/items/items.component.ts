import { Component, OnInit } from '@angular/core';
import { Items, ItemsService } from '../services/items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  items: Items[] = [];

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    this.itemsService.getItems().subscribe((response: any) => {
      this.items = response.hits;
      console.log(this.items);
    });
  }
}
