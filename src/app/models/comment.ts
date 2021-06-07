export interface Comment {
  id: number;
  author: string;
  title: string;
  text: string;
  url: string;
  points: number;
  children: Comment[];
}
