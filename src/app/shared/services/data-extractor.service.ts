import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataExtractorService {
  constructor() { }
  getPropertyValue(obj: any, prop: string): any {
    let currentProp = prop.split(".");
    if (currentProp.length == 1) {
      return obj && obj.hasOwnProperty(prop) ? obj[prop] : undefined;
    }
    let remainingProps = currentProp.filter((val, i) => i !== 0).join(".");
    let properties = [currentProp[0], remainingProps];
    for (let index = 0; index < properties.length; index++) {
      if (!obj.hasOwnProperty(`${properties[index]}`)) {
        return undefined;
      }
      const element = this.getPropertyValue(
        obj[properties[index]],
        properties[index + 1]
      );
      return element;
    }
  }
}
