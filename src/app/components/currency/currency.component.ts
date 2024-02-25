import { Component, Input, Output,EventEmitter,inject} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { CurrencyMin } from '../../models/currencyMin.model';
import { Currency } from '../../models/currency.model';

import { CurrenciesService} from './../../services/currencies.service';

import localeEs from '@angular/common/locales/es';
import {registerLocaleData} from '@angular/common';
registerLocaleData(localeEs,'es');

@Component({
  selector: 'app-currency',
  standalone: true,
  imports: [],
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.css'
})
export class CurrencyComponent {

  @Input() currency!: CurrencyMin;
  @Output() currencySelEvent = new EventEmitter<CurrencyMin>();

  constructor( public currenciesService: CurrenciesService){
  }

  newCurrency!: Currency;
  http = inject(HttpClient);

  pipe = new DatePipe('es-US','-5' );
  changedDate = this.pipe.transform(new Date(), 'd MMMM YYYY, h:mm a') ;

  ngOnInit(){
    this.GetCurrency();
  }

  returnCurrencies(){
    this.currency.id='';
    this.currencySelEvent.emit(this.currency);
  }

  GetCurrency(){
      this.currenciesService.getCurrency(this.currency.id)
      .subscribe((data) => {
        this.newCurrency = data;
   });
  }

}
