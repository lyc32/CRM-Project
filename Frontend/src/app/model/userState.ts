import {UserAnswer} from "./UserAnswer";

export class UserState
{
  tid:number = -1;
  currentQuestionIndex:number = -1;
  userAnswerList:UserAnswer[] = new Array();
  startTime:number = -1;
  totalTime:number = -1;
}
