import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class UtilsService {
    constructor() { }

    // Temporal sort while back is completed
    dynamicSort(property: string) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a: any, b: any) {
            /* next line works with strings and numbers, 
             * and you may want to customize it to your needs
             */
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }  

    hasSubArray(arrayToFilter:any[], subArray:any[]) {
        return subArray.every((i => v => i = arrayToFilter.indexOf(v, i) + 1)(0));
    }
}