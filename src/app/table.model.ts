type ClickedBy = "user" | "computer";

export enum ColorCell {
    Red = '#F6546A',
    Blue = '#8889EC',
    Yellow = '#F6E054',
    Green = '#20DAA5',
    White = '#FFFFFF'
}

export interface TableCell {
    color: string | null;
    clickedBy?: ClickedBy;
}

export interface TableScore {
    text_header: string;
    text: string;
}

export type Table = TableCell[][]