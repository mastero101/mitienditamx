import { SortDirection } from '@angular/material/sort';

export interface PaginatorConfig {
    pageIndex: number;
    pageSize: number;
    itemsPerPage: number[];
}