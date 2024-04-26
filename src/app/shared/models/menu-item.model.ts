export interface MenuItem {
    id: number;
    title: string;
    isActive: boolean;    
    route: string | null,
    isAdmin: boolean;
    icon?: string;
    children?: MenuItem[];
    queryParams?: string[] | null;
}