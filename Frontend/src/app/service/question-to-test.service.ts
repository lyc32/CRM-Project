import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {observable, Observable} from "rxjs";
import { Question } from "../model/Question";
@Injectable({
  providedIn: 'root'
})
export class QuestionToTestService {

  constructor(private httpClient:HttpClient) {}
  removeQuestionFromTest(tid:number, pid:number): Observable<string>
  {
    const url = `http://localhost:8080/api/v1/admin/removeQuestionFromTest/QuestionId/${pid}/testId/${tid}`;
    const options = { responseType: 'text' as 'json' };
    return this.httpClient.delete<string>(url, options);
  }
}
