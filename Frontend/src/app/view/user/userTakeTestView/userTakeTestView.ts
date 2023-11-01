import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Test } from 'src/app/model/Test';
import { TestService } from 'src/app/service/test-service';
import {QuestionService} from "../../../service/question-service";

@Component({
  selector: 'app-user-question-list-view',
  templateUrl: './userTakeTestView.html',
  styleUrls: ['./userTakeTestView.css']
})
export class UserTakeTestView implements OnInit
{
  // @ts-ignore
  webSocket: WebSocket;
  startTest:boolean = false;
  currentQuestion:any = null;
  currentQuestionIndex:number = -1;
  questionList:any = [];
  selectedAnswers: any[] = [];
  correctAnswersCount:number = 0;
  setId:number = -1;
  currentTest: Test = new Test;
  // Timer var
  remainingTime: number = 20 * 60; // 20 minutes in seconds
  timerInterval: any;
  minutes: number = 0;
  seconds: number = 0;
  finishTest:boolean = false;

  constructor(private router:ActivatedRoute, private cdRef:ChangeDetectorRef, private testService:TestService, private questionService:QuestionService)
  {/*
    let question = {questionId:1, question:"Char* string = 'Hello world';\nprintf(\"%d\", sizeof(string))",
      answers:['A. 4', 'B. 8', 'C. 2', 'D. I don\'t known'], correctAnswer:'D. I don\'t known'}
    let question1 = {questionId:2, question:"How many data type are there in JavaScript)",
      answers:['A. 5', 'B. 7', 'C. 6', 'D. None of the above'], correctAnswer:'D. None of the above'}
    let question2 = {questionId:3, question:"How many data type are there in C++)",
      answers:['A. 3', 'B. 1', 'C. 5', 'D. 10'], correctAnswer:'C. 5'}
      this.questionList = [question,question1,question2,question1] ;
      this.selectedAnswers = new Array(this.questionList.length).fill(null);*/
  }

  ngOnInit(): void
  {
    this.setId = this.router.snapshot.params['tid'];
    this.testService.getTestById(this.setId).subscribe((data:Test)=>{
      this.currentTest = data;
    });
    this.questionService.getQuestionByTestId(this.setId).subscribe(data=>
    {
      this.questionList = data
      for(let i = 0; i < data.length; i++)
      {
        this.remainingTime = this.remainingTime + data[i].time*60;
      }
    }
    );

  }

  startButton()
  {
    this.startTest = true;
    this.currentQuestionIndex = 0;
    this.currentQuestion = this.questionList[0];
    this.updateDisplay();
    this.startTimer();
    this.setWebSocketServer();
  }
  nextButton()
  {
    this.currentQuestionIndex++;
    if(this.currentQuestionIndex >= this.questionList.length)
    {
      this.currentQuestionIndex = this.questionList.length - 1;
    }
    this.currentQuestion = this.questionList[this.currentQuestionIndex];
    //this.cdRef.detectChanges();
  }

  previousButton()
  {
    this.currentQuestionIndex--;
    if(this.currentQuestionIndex <= -1)
    {
      this.currentQuestionIndex = 0;
    }
    this.currentQuestion = this.questionList[this.currentQuestionIndex];
    //this.cdRef.detectChanges();
  }
  captureAnswer(event: any, questionIndex: number)
  {
    this.selectedAnswers[questionIndex] = event.target.value;
    //this.cdRef.detectChanges();
  }
  checkAnswer()
  {
    this.startTest = false;
    this.finishTest = true;
    this.cdRef.detectChanges();
    for (let i = 0; i < this.questionList.length; i++)
    {
      const correctAnswer:string = this.questionList[i].correctAnswer;
      console.log(correctAnswer);
      if (correctAnswer && this.selectedAnswers[i] && correctAnswer.trim().toLowerCase() === this.selectedAnswers[i].trim().toLowerCase()) {
        this.correctAnswersCount++;
      }
    }
  }
  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
        this.updateDisplay();
      } else {
        clearInterval(this.timerInterval);
        // Logic when timer reaches 0, e.g., submit test automatically
      }
    }, 1000);
  }
  updateDisplay()
  {
    this.minutes = Math.floor(this.remainingTime / 60);
    this.seconds = this.remainingTime % 60;
  }
  ngOnDestroy()
  {
    clearInterval(this.timerInterval); // Clear the interval when component is destroyed
  }


  setWebSocketServer(): void
  {
    this.webSocket = new WebSocket('ws://' + document.domain + ':8080/websocket/' + 1);
    this.webSocket.onopen = () => { console.log('WebSocket Open'); };
    this.webSocket.onmessage = event =>
    {
      console.log('System Time:' + event.data);
    };

    setInterval(() =>
    {
      this.webSocket.send("client Time:")
    }, 30000);
  }

  onBeforeUnload(): void
  {
    this.webSocket.close();
  }

}
