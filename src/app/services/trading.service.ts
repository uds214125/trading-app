import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TradingService{

    constructor(private http: HttpClient) {
    }

    getDaywiseTrades(){
      return this.http.get(`${env.BASE_URL}${env.RESOURCES.TRADE.GET}?daywise=1`)
        .pipe(map((res)=>{
            return res;
        })
      );
    }

}