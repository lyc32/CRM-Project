import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {observable, Observable} from "rxjs";
import { Question } from "../model/Question";
import {Account} from "../model/Account";


@Injectable({
  providedIn: 'root'
})
export class QuestionService
{
  constructor(private httpClient:HttpClient)
  { }

  startTestByTestId(uid:number,tid:number):Observable<Question[]>
  {
    return this.httpClient.get<Question[]>('http://localhost:8080/api/v1/user/'+uid+'/startTest/' + tid);
  }

  getQuestionListSnapShot(uid:number):Observable<Question[]>
  {
    return this.httpClient.get<Question[]>('http://localhost:8080/api/v1/user/getQuestionListSnapShot/' + uid);
  }


  getQuestionByTestId(id:number):Observable<Question[]>
  {
    return this.httpClient.get<Question[]>('http://localhost:8080/api/v1/admin/getQuestionListByTestId/' + id);
  }

  searchQuestion(qid:number, question:string, style:string, point:number, topic:string, testName:string):Observable<Question[]>
  {
    const info = {
      qid:qid,
      question: question,
      style:style,
      point:point,
      topic:topic,
      testName:testName
    }
    const params = new HttpParams({
      fromObject: info
    });
    return this.httpClient.post<Question[]>('http://localhost:8080/api/v1/admin/search/question', params);
  }

  searchQuestionNotInThisTest(qid:number, question:string, style:string, point:number, topic:string, testName:string, tid:number):Observable<Question[]>
  {
    const info = {
      qid:qid,
      question: question,
      style:style,
      point:point,
      topic:topic,
      testName:testName
    }
    const params = new HttpParams({
      fromObject: info
    });
    return this.httpClient.post<Question[]>('http://localhost:8080/api/v1/admin/search/question/notInTestId/' + tid, params);
  }

  searchQuestionNotInALLTest(qid:number, question:string, style:string, point:number):Observable<Question[]>
  {
    const info = {
      qid:qid,
      question: question,
      style:style,
      point:point
    }
    const params = new HttpParams({
      fromObject: info
    });
    return this.httpClient.post<Question[]>('http://localhost:8080/api/v1/admin/search/question/notInAllTest', params);
  }

  addNewQuestion(question:Question):Observable<Question>
  {
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const info = {
      question: question.question,
      style   : question.style,
      body    : question.body,
      answer  : question.answer,
      point   : question.point,
      time    : question.time
    }
    // @ts-ignore
    return this.httpClient.post<Question>('http://localhost:8080/api/v1/admin/addNewQuestion', JSON.stringify(info), {headers: httpHeaders});
  }

  addNewQuestionToSet(question:Question, sid:number):Observable<string>
  {
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const info = {
      question: question.question,
      style   : question.style,
      body    : question.body,
      answer  : question.answer,
      point   : question.point,
      time    : question.time
    }
    // @ts-ignore
    return this.httpClient.post<string>('http://localhost:8080/api/v1/admin/addNewQuestionToSet/' + sid, JSON.stringify(info), {headers: httpHeaders, responseType: 'text'});
  }

  addNewQuestionIdToSet(qid:number, sid:number):Observable<string>
  {
    // @ts-ignore
    return this.httpClient.get<string>('http://localhost:8080/api/v1/admin/addQuestion/' + qid + "/toTest/" + sid, {responseType: 'text'});
  }

  removeQuestionFromSet(qid:number, tid:number):Observable<string>
  {
    // @ts-ignore
    return this.httpClient.delete<string>('http://localhost:8080/api/v1/admin/removeQuestion/' + qid + '/fromTest/' + tid, {responseType: 'text'});
  }
  getQuestionById(id:number):Observable<Question>
  {
    return this.httpClient.get<Question>('http://localhost:8080/api/v1/admin/getQuestionById/' + id);
  }

  deleteQuestion(id:number):Observable<string>
  {
    // @ts-ignore
    return this.httpClient.delete<string>('http://localhost:8080/api/v1/admin/deleteQuestionById/' + id, {responseType: 'text'});
  }

  updateQuestion(question:Question):Observable<string>
  {
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const info = {
      id: question.id,
      question: question.question,
      style   : question.style,
      body    : question.body,
      answer  : question.answer,
      point   : question.point,
      time    : question.time
    }// @ts-ignore
    return this.httpClient.put<string>('http://localhost:8080/api/v1/admin/uptateQuestion/' + question.id, JSON.stringify(info), {headers: httpHeaders, responseType: 'text'});
  }
}
