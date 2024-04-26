import { SortDirection } from '@angular/material/sort';
import { PaginatorConfig } from './paginator-config.model';

export interface SortConfig extends PaginatorConfig {
    sortProperty: string;
    sortDirection: SortDirection;
}