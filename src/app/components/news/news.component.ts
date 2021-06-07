import { Component, Input } from '@angular/core';
import { News } from 'src/app/models/news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent {
  @Input() id: number;
  @Input() title: string;
  @Input() url: string;
  @Input() author: string;
  @Input() points: number;
  @Input() commentsNum: number;
  @Input() isHideCommentNum: boolean = false;
}
