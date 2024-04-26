import { Pipe, PipeTransform } from '@angular/core';
import { DataExtractorService } from '../services/data-extractor.service';

@Pipe({
  name: "field",
  standalone: true
})
export class FieldPipe implements PipeTransform {
  constructor(private dataExtractorService: DataExtractorService) {    
  }

  transform(obj: any, prop: string): any {
    return this.dataExtractorService.getPropertyValue(obj, prop);
  } 
}
