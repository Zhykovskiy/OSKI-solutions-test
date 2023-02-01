import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  readonly baseUrl = "https://localhost:7035/api";

  constructor(private _http: HttpClient) { 

  }

  getTests() {
    return this._http.get(this.baseUrl + '/Test');
  }

  getTestById(id: number) {
    return this._http.get(this.baseUrl + '/Test/' + id);
  }

  getAnswers(ids: number[]) {
    return this._http.post(this.baseUrl + '/Test/answers', ids);
  }
}
