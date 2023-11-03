import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {observable, Observable} from "rxjs";
import { Account } from "../model/Account";
import { Test } from "../model/Test";
import {Question} from "../model/Question";


@Injectable({
  providedIn: 'root'
})
export class TestService
{
  constructor(private httpClient:HttpClient)
  { }

  getAllActiveTest():Observable<Test[]>
  {
    return this.httpClient.get<Test[]>('http://localhost:8080/api/v1/user/getAllTest');
  }

  getAllTest():Observable<Test[]>
  {
    return this.httpClient.get<Test[]>('http://localhost:8080/api/v1/admin/getAllTest');
  }

  getTestById(id:number):Observable<Test>
  {
    return this.httpClient.get<Test>('http://localhost:8080/api/v1/admin/getTestById/' + id);
  }
  getTestByQuestionId(id:number):Observable<Test[]>
  {
    return this.httpClient.get<Test[]>('http://localhost:8080/api/v1/admin/getTestByQuestionId/'+ id);
  }

  getTestWithoutQuestionId(id:number):Observable<Test[]>
  {
    return this.httpClient.get<Test[]>('http://localhost:8080/api/v1/admin/getTestWithoutQuestionId/'+ id);
  }

  addNewTest(test:Test):Observable<Test>
  {
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const info = {
      topic: test.topic,
      name : test.name,
      level: test.level,
      state: test.state
    }
    // @ts-ignore
    return this.httpClient.post<Test>('http://localhost:8080/api/v1/admin/addNewTest', JSON.stringify(info), {headers: httpHeaders});
  }

  addNewSetToQuestion(test:Test, qid:number):Observable<string>
  {
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const info = {
      topic: test.topic,
      name : test.name,
      level: test.level,
      state: test.state
    }
    // @ts-ignore
    return this.httpClient.post<string>('http://localhost:8080/api/v1/admin/addNewTestToQuestion/' + qid, JSON.stringify(info), {headers: httpHeaders, responseType: 'text'});
  }

  deleteTest(id:number):Observable<string>
  {
    // @ts-ignore
    return this.httpClient.delete<string>('http://localhost:8080/api/v1/admin/deleteTestById/' + id, {responseType: 'text'});
  }

  updateTest(test:Test):Observable<string>
  {
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const info = {
      id   : test.id,
      topic: test.topic,
      name : test.name,
      level: test.level,
      state: test.state
    }
    // @ts-ignore
    return this.httpClient.put<string>('http://localhost:8080/api/v1/admin/uptateTest/' + test.id, JSON.stringify(info), {headers: httpHeaders, responseType: 'text'});
  }
}
