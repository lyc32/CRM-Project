import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {observable, Observable} from "rxjs";
import { Question } from "../model/Question";
import { TestResult } from "../model/TestResult";
import {UserAnswer} from "../model/UserAnswer";


@Injectable({
  providedIn: 'root'
})
export class TestResultService
{
  constructor(private httpClient:HttpClient)
  { }

  submitUserAnswers(uid:number, userAnswers:UserAnswer[]):Observable<TestResult>
  {
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<TestResult>('http://localhost:8080/api/v1/user/' + uid + '/submitAnswers', JSON.stringify(userAnswers),{headers: httpHeaders});
  }

  getTestResultByUderId(uid:number):Observable<TestResult[]>
  {
    return this.httpClient.get<TestResult[]>('http://localhost:8080/api/v1/user/' + uid + '/getMyTestResult');
  }
}
