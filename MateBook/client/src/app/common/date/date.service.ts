import { Injectable } from "@angular/core";
import { IDate, IMonth } from "src/app/interface/IDate";


@Injectable()
export class DateService {

    formatDate(date: string): IDate {
        let separated: string[] = date.split('T');
        let day = separated[0].split('-');
        let hour = separated[1].split(':');
        let formatedDate: IDate = {
            year: Number(day[0]),
            month: this.getMonthName(Number(day[1])),
            day: Number(day[2]),
            hour: Number(hour[0]),
            minute: Number(hour[1]),
            second: Number(hour[2])
        }
        return formatedDate;
    }

    getMonthName(month: number): IMonth {
        if (month === 1){
            return 'jan';
        } else if (month === 2){
            return 'feb';
        } else if (month === 3){
            return 'mar';
        } else if (month === 4){
            return 'apr';
        } else if (month === 5){
            return 'may';
        } else if (month === 6){
            return 'jun';
        } else if (month === 7){
            return 'jul';
        } else if (month === 8){
            return 'aug';
        } else if (month === 9){
            return 'sep';
        } else if (month === 10){
            return 'oct';
        } else if (month === 11){
            return 'nov';
        } else {
            return 'dec';
        }
    }
}