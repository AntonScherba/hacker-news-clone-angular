import { News } from './news';

export interface Page {
  hits: News[];
  page: number;
  nbHits: number;
  nbPages: number;
  hitsPerPage: number;
}
