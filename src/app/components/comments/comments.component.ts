import { Component, OnInit } from '@angular/core';

import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { Comment, HackerNewsService } from '../../services/hacker-news.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  treeControl = new NestedTreeControl<Comment>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<Comment>();

  constructor(
    private itemsService: HackerNewsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.itemsService
      .getItemById(this.activatedRoute.snapshot.params.id)
      .subscribe((data: any) => {
        this.dataSource.data = data.children;
      });
  }

  hasChild = (_: number, node: Comment) => {
    console.log(node.children);
    return !!node.children && node.children.length > 0;
  };
}
