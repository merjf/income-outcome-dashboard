import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operation, Point } from '../_models/_models';

const API_URL = 'http://127.0.0.1:5000/';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(API_URL + 'data');
  }

  adjustValues(data: Operation[]): any[]{
    var result: any[] = [];
    for(let i = 0, j = 0; i < data.length; i++){
      if(result.length > 0 && result[j-1][0] == data[i].valueDate){
        result[j-1][1] += data[i].operation;
      } else {
        result.push([data[i].valueDate, data[i].operation]);
        j++;
      }
    }
    return result;
  }
}