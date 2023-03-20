export interface IDate {
    year: number;
    month: IMonth
    day : number;
    hour: number;
    minute: number;
    second: number;
}

export type IMonth = 'jan' | 'feb' | 'mar' | 'apr' | 'may' | 'jun' | 'jul' | 'aug' | 'sep' | 'oct' | 'nov' | 'dec';