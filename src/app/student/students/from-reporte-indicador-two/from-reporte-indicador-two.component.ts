import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
const ELEMENT_DAT: PeriodicElement1[] = [
  {position: 'Enero',position1: 'tickets', name: 1, weight: 1.0079, symbol: 1,total:19,ecommerce:1,sigma:1,sispoc:1,totalS:3},
  {position: 'Enero',position1: 'Hrs Usadas', name: 1, weight: 1.0079, symbol: 1,total:19,ecommerce:1,sigma:1,sispoc:1,totalS:3},
  {position: 'Febrero',position1: 'tickets', name: 1, weight: 4.0026, symbol: 1,total:19,ecommerce:1,sigma:1,sispoc:1,totalS:3},
  {position: 'Febrero',position1: 'Hrs Usadas', name: 1, weight: 6.941, symbol: 1,total:19,ecommerce:1,sigma:1,sispoc:1,totalS:3},
  // {position: 4,position1: 7, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  // {position: 5,position1: 6, name: 'Boron', weight: 10.811, symbol: 'B'},
  // {position: 6,position1: 5, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  // {position: 7,position1: 4, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  // {position: 8,position1: 3, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  // {position: 9,position1: 2, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  // {position: 10,position1: 1, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
export interface PeriodicElement1 {
  name: number;
  position: string;
  position1: string;
  weight: number;
  symbol: number;
  total: number;
  ecommerce: number;
  sigma: number;
  sispoc: number;
  totalS: number;
}
@Component({
  selector: 'app-from-reporte-indicador-two',
  templateUrl: './from-reporte-indicador-two.component.html',
  styleUrls: ['./from-reporte-indicador-two.component.sass']
})
export class FromReporteIndicadorTwoComponent implements OnInit {
  displayedColumns: string[] = ['positionA','position1', 'name', 'weight', 'symbol','total'
,'ecommerce','sigma','sispoc','totalS'];
  dataSource = ELEMENT_DAT;
  spans = [];
  conteo =4;
  constructor() {
    this.cacheSpan('positionA', d => d.position);
   }
   cacheSpan(key, accessor) {
    for (let i = 0; i < ELEMENT_DAT.length;) {
      let currentValue = accessor(ELEMENT_DAT[i]);
      let count = 1;

      // Iterate through the remaining rows to see how many match
      // the current value as retrieved through the accessor.
      for (let j = i + 1; j < ELEMENT_DAT.length; j++) {        
        if (currentValue != accessor(ELEMENT_DAT[j])) {
          break;
        }

        count++;
      } 

      if (!this.spans[i]) {
        this.spans[i] = {};
      }

      // Store the number of similar values that were found (the span)
      // and skip i to the next unique row.
      this.spans[i][key] = count;
      i += count;
    }
  }
  getRowSpan(col, index) {
    return this.spans[index] && this.spans[index][col];
    //return this.spans[col] && this.spans[col][index];
  }
  
  ngOnInit(): void {
  }
  

}

