import { Component, OnInit } from '@angular/core';

import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { HackerNewsService } from '../../services/hacker-news.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-item',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  treeControl = new NestedTreeControl<any>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<any>();

  comments: Comment;

  constructor(
    private itemsService: HackerNewsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.itemsService
      .getComments(this.activatedRoute.snapshot.params.id)
      .subscribe((data: any) => {
        // this.dataSource.data = data.children;
        this.comments = data;
      });
  }

  hasChild = (_: number, node: Comment) =>
    !!node.children && node.children.length > 0;
}
