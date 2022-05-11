export interface INavItem {
    label: string;
    subLabel?: string;
    children?: Array<INavItem>;
    href?: string;
}

export interface ITodoItem {
    id: string;
    text: string;
    completed: boolean;
    timestamp: number;
}

