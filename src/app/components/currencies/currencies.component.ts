import { Component, Input, Output, inject , EventEmitter,LOCALE_ID} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CurrencyMin } from '../../models/currencyMin.model';

import { CurrenciesService} from './../../services/currencies.service';

import localeEs from '@angular/common/locales/es';
import {registerLocaleData} from '@angular/common';
registerLocaleData(localeEs,'es');

@Component({
  selector: 'app-currencies',
  standalone: true,
  imports: [],
  templateUrl: './currencies.component.html',
  styleUrl: './currencies.component.css'
})
export class CurrenciesComponent {
  @Input() start: number=0;
  @Input() limit: number=10;
  @Input() currencies: CurrencyMin[]=[];

  @Output() currencySelEvent = new EventEmitter<CurrencyMin>();
  @Output() startEvent = new EventEmitter<number>();

  http = inject(HttpClient);
  numPages: number = 0;

  pipe = new DatePipe('es-US','-5' );
  changedDate = this.pipe.transform(new Date(), 'd MMMM YYYY, h:mm a') ;
  
  constructor( public currenciesService: CurrenciesService){

  }
   ngOnInit(){
    this.GetCurrencies();
  }

  selCurrency(cur: CurrencyMin){
    this.currencySelEvent.emit(cur);
  }

  GetCurrencies(){
    if(this.start>=this.currencies.length){
      
      this.currenciesService.getCurrencies(this.start,this.limit)
      .subscribe((data) => {
        data.forEach(element => {
          this.currencies.push(element);
        });
      });
      this.numPages++;
    }
  }

  GetNextCurrencies(){
    this.start += this.limit;
    this.startEvent.emit(this.start);
    this.GetCurrencies();
  }

  GetPreviousCurrencies(){
    if(this.start>=this.limit){
      this.start -= this.limit;
      this.startEvent.emit(this.start);
      this.GetCurrencies();
    }
  }
}
