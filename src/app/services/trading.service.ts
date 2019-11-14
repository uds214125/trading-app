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

    getDatewiseTrades(max_limit){
      return this.http.get(`${env.BASE_URL}${env.RESOURCES.TRADE.GET}?datewise=1&limit=${max_limit}`)
        .pipe(map((res)=>{
            return res;
        })
      );
    }

}