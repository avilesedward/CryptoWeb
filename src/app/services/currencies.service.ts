import { Injectable , inject} from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CurrencyMin } from './../models/currencyMin.model';
import { Currency } from './../models/currency.model';


@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  URL: String = 'https://localhost:7196/';
  obs!: Observable<CurrencyMin[]>;

  currencies: CurrencyMin[]=[];
  http = inject(HttpClient);

  public getCurrencies(start: number, limit: number): Observable<CurrencyMin[]>  {
    return this.http.get<CurrencyMin[]>(`${this.URL}currency/getcurrencies/?start=${start}&limit=${limit}`);
  }

  public getCurrency(id: string): Observable<Currency>  {
    return this.http.get<Currency>(`${this.URL}currency/GetCurrency/?id=${id}`);
  }
}
