import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {CurrenciesComponent} from './components/currencies/currencies.component';
import {CurrencyComponent} from './components/currency/currency.component';
import { CurrencyMin } from './models/currencyMin.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    HeaderComponent,
    CurrenciesComponent,
    CurrencyComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CryptoWeb';
  currencies: CurrencyMin[]=[];
  currencySel!: CurrencyMin;
  start: number=0;

  getCurrencySelect(cur: CurrencyMin){
    this.currencySel = cur;
  }

  setStart(_start : number){
    this.start = _start;
  }

  showCurrencies(){
    this.currencySel.id= '';
  }
  
}
