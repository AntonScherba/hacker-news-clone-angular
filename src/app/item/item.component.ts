import { Component, OnInit } from '@angular/core';

import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { Comment, ItemsService } from '../services/items.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  treeControl = new NestedTreeControl<Comment>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<Comment>();

  constructor(
    private itemsService: ItemsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.itemsService
      .getItemById(this.activatedRoute.snapshot.params.id)
      .subscribe((data: any) => {
        this.dataSource.data = data.children;
      });
  }

  hasChild = (_: number, node: Comment) =>
    !!node.children && node.children.length > 0;
}
