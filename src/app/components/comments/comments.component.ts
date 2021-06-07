import { Component, OnInit } from '@angular/core';

import { NestedTreeControl } from '@angular/cdk/tree';

import { HackerNewsService } from '../../services/hacker-news.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/comment';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-item',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  treeControl = new NestedTreeControl<Comment>((node) => node.children);
  comments: Comment;

  constructor(
    private itemsService: HackerNewsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.itemsService
      .getComments(this.activatedRoute.snapshot.params.id)
      .pipe(untilDestroyed(this))
      .subscribe((data: any) => {
        this.comments = data;
      });
  }

  hasChild = (_: number, node: Comment) =>
    !!node.children && node.children.length > 0;
}
