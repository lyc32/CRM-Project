import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Test } from 'src/app/model/Test';
import { TestService } from 'src/app/service/test-service';
import {QuestionService} from "../../../service/question-service";
import {UserState} from "../../../model/userState";
import {Account} from "../../../model/Account";
import {JavaScriptOptimizerPlugin} from "@angular-devkit/build-angular/src/webpack/plugins";
import { UserAnswer } from 'src/app/model/UserAnswer';
import {Interval} from "chart.js/dist/scales/scale.time";
import {TestResultService} from "../../../service/test-result-service";
import {TestResult} from "../../../model/TestResult";

@Component({
  selector: 'app-user-question-list-view',
  templateUrl: './userTakeTestView.html',
  styleUrls: ['./userTakeTestView.css']
})
export class UserTakeTestView implements OnInit
{
  // @ts-ignore
  webSocket: WebSocket;

  user:Account = new Account();
  userState:UserState = new UserState();

  message:string = '';
  error:string = '';
  showMessageView:boolean = false;
  showLoadingView:boolean = false;
  finishTest:boolean = false;
  testResult:TestResult = new TestResult();
  result:string = ''

  startTest:boolean = false;
  currentQuestion:any = null;
  currentQuestionIndex:number = -1;
  currentQuestionChoices:string[] = new Array();
  currentAnswersList:string[] = new Array();
  currentAnswersString:string = '';

  questionList:any = [];
  indexList:number[] = [];

  correctAnswersCount:number = 0;
  setId:number = -1;

  // Timer var
  remainingTime: number = 0; // 20 minutes in seconds
  timerInterval: any;
  minutes: number = 0;
  seconds: number = 0;

  websocketSendMessageInterval:any;
  websocketReconnectInterval  :any;


  constructor(private router:ActivatedRoute, private testService:TestService, private questionService:QuestionService, private testResultService:TestResultService)
  {
  }

  ngOnInit(): void
  {
    this.setId = this.router.snapshot.params['tid'];
    // @ts-ignore
    this.user = JSON.parse( window.sessionStorage.getItem('MCQuser') );
    // @ts-ignore
    this.userState = JSON.parse( window.sessionStorage.getItem('MCQtestState') );
    console.log(this.userState);
    if(this.userState != null)
    {
      if(this.userState.tid != this.setId)
      {
        window.location.href = "user/myTest/" + this.userState.tid;
      }
      else
      {
        this.questionService.getQuestionListSnapShot(this.user.id)
          .subscribe(
            data=>
            {
              this.questionList = data;
              this.indexList = new Array(data.length);
              for(let i = 0; i < data.length; i++)
              {
                this.indexList[i] = i + 1;
              }
              this.startTest = true;
              this.currentQuestionIndex = this.userState.currentQuestionIndex;
              this.currentQuestion = this.questionList[this.currentQuestionIndex];
              this.remainingTime = this.userState.totalTime - parseInt(((new Date().getTime() - this.userState.startTime)/1000).toString());
              console.log(this.questionList);
              this.showQuestion();
              this.updateDisplay();
              this.startTimer();
              this.setWebSocketServer();
              this.webSocketSendTimeStamp();
            }
          )
      }
    }
    else
    {
      this.userState = new UserState();
    }
  }


  startButton()
  {
    this.questionService.startTestByTestId(this.user.id, this.setId).subscribe(data=>
      {
        this.questionList = data
        this.indexList = new Array(data.length);
        for(let i = 0; i < data.length; i++)
        {
          this.remainingTime = this.remainingTime + data[i].time*60;
          this.indexList[i] = i + 1;
        }
        console.log(this.questionList);
        console.log(this.remainingTime);
        this.startTest = true;
        this.currentQuestionIndex = 0;
        this.currentQuestion = this.questionList[0];
        this.showQuestion();
        this.updateDisplay();
        this.startTimer();
        this.userState.tid = this.setId;
        this.userState.startTime = (new Date()).getTime();
        this.userState.currentQuestionIndex = 0;
        this.userState.userAnswerList = new Array(data.length);
        this.userState.totalTime = this.remainingTime;
        window.sessionStorage.setItem("MCQtestState", JSON.stringify(this.userState));

        this.setWebSocketServer();
        this.webSocketSendTimeStamp();

      }
    );
  }

  updateDisplay()
  {
    this.minutes = Math.floor(this.remainingTime / 60);
    this.seconds = this.remainingTime % 60;
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.remainingTime > 0)
      {
        this.remainingTime--;
        this.updateDisplay();
      }
      else
      {
        this.submit();
      }
    }, 1000);
  }

  setWebSocketServer(): void
  {
    this.webSocket = new WebSocket('ws://' + document.domain + ':8080/websocket/' + 1);

    this.webSocket.onopen = () =>
    {
      console.log('[WebSocket] [Open]');
      // @ts-ignore
      document.getElementById('webSocketMessage').innerHTML = "Online";
    };

    // when Client receive a message from server
    this.webSocket.onmessage = event =>
    {
      console.log('[WebSocket] System Time:' + event.data);
      // @ts-ignore
      document.getElementById('webSocketMessage').innerHTML = "Online";
    };

    // when get an error
    this.webSocket.onerror = event =>
    {
      console.log('[WebSocket] [ERROR]:' + event);
      if(this.webSocket != null)
      {
        // @ts-ignore
        document.getElementById('webSocketMessage').innerHTML = "Offline";
        this.websocketReconnectInterval =  setInterval( () =>  {this.webSocketReOpen()}, 30000);
      }
    };

    // when backend closed
    this.webSocket.onclose = event =>
    {
      console.log('[WebSocket] [Close]:' + event);
      if(this.webSocket != null)
      {
        // @ts-ignore
        document.getElementById('webSocketMessage').innerHTML = "Offline";
        this.websocketReconnectInterval =  setInterval( () =>  {this.webSocketReOpen()}, 30000);
      }
    };
  }

  webSocketSendTimeStamp()
  {
    this.websocketSendMessageInterval = setInterval(() =>  {
      this.webSocket.send(this.getCurrentTime())
    }, 30000);
  }

  webSocketReOpen()
  {
    console.log('[WebSocket] [Re-Open]');
    this.webSocket.close();
    this.webSocket = new WebSocket('ws://' + document.domain + ':8080/websocket/' + 1);
    this.webSocket.onopen = () =>
    {
      console.log('[WebSocket] [Re-Open]');
      clearInterval(this.websocketReconnectInterval);
    };

    // when Client receive a message from server
    this.webSocket.onmessage = event =>
    {
      console.log('[WebSocket] System Time:' + event.data);
      // @ts-ignore
      document.getElementById('webSocketMessage').innerHTML = "Online";
    };

    // when get an error
    this.webSocket.onerror = event =>
    {
      console.log('[WebSocket] [ERROR]:' + event);
      if(this.webSocket != null)
      {
        // @ts-ignore
        document.getElementById('webSocketMessage').innerHTML = "Offline";
        this.websocketReconnectInterval =  setInterval( () =>  {this.webSocketReOpen()}, 30000);
      }
    };

    // when backend closed
    this.webSocket.onclose = event =>
    {
      console.log('[WebSocket] [Close]:' + event);
      if(this.webSocket != null)
      {
        // @ts-ignore
        document.getElementById('webSocketMessage').innerHTML = "Offline";
        this.websocketReconnectInterval =  setInterval( () =>  {this.webSocketReOpen()}, 30000);
      }
    };

  }

  jumpQuestion(i:number)
  {
    this.autoSave();
    this.currentQuestionIndex = i -1;
    this.currentQuestion = this.questionList[this.currentQuestionIndex];
    this.showQuestion();
    this.userState.currentQuestionIndex = this.currentQuestionIndex;
    window.sessionStorage.setItem("MCQtestState", JSON.stringify(this.userState));
  }

  nextButton()
  {
    this.autoSave();
    this.currentQuestionIndex++;
    if(this.currentQuestionIndex >= this.questionList.length)
    {
      this.currentQuestionIndex = this.questionList.length - 1;
    }
    this.currentQuestion = this.questionList[this.currentQuestionIndex];
    this.showQuestion();
    this.userState.currentQuestionIndex = this.currentQuestionIndex;
    window.sessionStorage.setItem("MCQtestState", JSON.stringify(this.userState));
  }

  previousButton()
  {
    this.autoSave();
    this.currentQuestionIndex--;
    if(this.currentQuestionIndex <= -1)
    {
      this.currentQuestionIndex = 0;
    }
    this.currentQuestion = this.questionList[this.currentQuestionIndex];
    this.showQuestion();
    this.userState.currentQuestionIndex = this.currentQuestionIndex;
    window.sessionStorage.setItem("MCQtestState", JSON.stringify(this.userState));
  }

  showQuestion()
  {
    if(this.currentQuestion.style != 'Short Answer')
    {
      this.currentQuestionChoices = JSON.parse(atob(this.currentQuestion.body));
    }
    if(this.userState.userAnswerList[this.currentQuestionIndex] != null)
    {
      if(this.currentQuestion.style != 'Short Answer')
      {
        this.currentAnswersList = JSON.parse(atob(this.userState.userAnswerList[this.currentQuestionIndex].userAnswer));
      }
      else
      {
        this.currentAnswersString = this.userState.userAnswerList[this.currentQuestionIndex].userAnswer;
      }
    }
    else
    {
      this.currentAnswersString = '';
      this.currentAnswersList = new Array();
    }
  }

  isAnswer(index:number):boolean
  {
    for(let i =0; i < this.currentAnswersList.length; i++)
    {
      if(this.currentQuestionChoices[index] == this.currentAnswersList[i])
      {
        return true;
      }
    }
    return false;
  }

  autoSave()
  {
    if(this.currentQuestion.style != 'Short Answer')
    {
      let answer:string[] = new Array();
      for(let i=0; i < this.currentQuestionChoices.length; i++)
      {
        if((document.getElementById("selectedChoice" + i) as HTMLInputElement).checked == true)
        {
          // @ts-ignore
          answer.push(this.currentQuestionChoices[i]);
        }
      }
      this.userState.userAnswerList[this.currentQuestionIndex] = new UserAnswer();
      this.userState.userAnswerList[this.currentQuestionIndex].qid = this.currentQuestion.id;
      this.userState.userAnswerList[this.currentQuestionIndex].userAnswer = btoa(JSON.stringify(answer));
    }
    else
    {
      this.userState.userAnswerList[this.currentQuestionIndex] = new UserAnswer();
      this.userState.userAnswerList[this.currentQuestionIndex].qid = this.currentQuestion.id;
      this.userState.userAnswerList[this.currentQuestionIndex].userAnswer = (document.getElementById("currentAnswer") as HTMLTextAreaElement).value
    }
    window.sessionStorage.setItem("MCQtestState", JSON.stringify(this.userState));
  }

  submit()
  {
    this.webSocket.send(this.getCurrentTime());
    this.webSocket.close();
    clearInterval(this.websocketSendMessageInterval);
    clearInterval(this.websocketReconnectInterval);
    // @ts-ignore
    this.webSocket = null;
    window.sessionStorage.removeItem("MCQtestState");
    this.jumpWindow("You Answer Has Already Submitted", '');
    this.showLoadingView = true;

    this.testResultService.submitUserAnswers(this.user.id, this.userState.userAnswerList)
      .subscribe(
        data =>
      {
        if(data != null)
        {
          this.testResult = data;
          if(this.testResult.points/ this.testResult.totalPoints >= 0.7)
          {
            this.result = "You Pass The Test"
            this.user.level = data.testLevel;
            window.sessionStorage.setItem("MCQuser", JSON.stringify(this.user));
          }
          else
          {
            this.result = "You Cannot Pass the Test"
          }
          this.finishTest = true;
          this.showLoadingView = false;
          console.log(data)
        }
        else
        {
          console.log("Error");
          this.result = "There Is Something Wrong with Server Side. Please Connect Admin."
          this.finishTest = true;
          this.showLoadingView = false;
        }
      }
        ,
          error =>
          {
            console.log(error.message)
            this.result = "There Is Something Wrong to Connect Server. Please Connect Admin."
            this.finishTest = true;
            this.showLoadingView = false;
          });


  }

/***************************** Massage View *****************************/
  jumpWindow(message:string, error:string)
  {
    this.message = message;
    this.error = error;
    this.showMessageView = true;
    setTimeout(()=>
    {
      this.showMessageView = false;
    }, 5000);
  }


  getCurrentTime():string
  {
    var date   = new Date();//当前时间
    var month  = this.zeroFill(date.getMonth() + 1);//月
    var day    = this.zeroFill(date.getDate());//日
    var hour   = this.zeroFill(date.getHours());//时
    var minute = this.zeroFill(date.getMinutes());//分
    var second = this.zeroFill(date.getSeconds());//秒

    var curTime = date.getFullYear() + "-" + month + "-" + day
      + " " + hour + ":" + minute + ":" + second;

    return curTime;
  }
  zeroFill(i:number):string
  {
    if (i >= 0 && i <= 9) {
      return "0" + i;
    }
    else
    {
      return i.toString();
    }
  }

}
