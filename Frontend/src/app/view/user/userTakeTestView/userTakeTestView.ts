import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Test } from 'src/app/model/Test';
import { TestService } from 'src/app/service/test-service';
import {QuestionService} from "../../../service/question-service";
import { FormBuilder, FormGroup, FormArray, FormControl, AbstractControl, ReactiveFormsModule } from '@angular/forms';

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
  questionForm: FormGroup;
  constructor(private router:ActivatedRoute, private cdRef:ChangeDetectorRef, private testService:TestService, private questionService:QuestionService, private fb: FormBuilder)
  {/*
    let question = {questionId:1, question:"Char* string = 'Hello world';\nprintf(\"%d\", sizeof(string))",
      answers:['A. 4', 'B. 8', 'C. 2', 'D. I don\'t known'], correctAnswer:'D. I don\'t known'}
    let question1 = {questionId:2, question:"How many data type are there in JavaScript)",
      answers:['A. 5', 'B. 7', 'C. 6', 'D. None of the above'], correctAnswer:'D. None of the above'}
    let question2 = {questionId:3, question:"How many data type are there in C++)",
      answers:['A. 3', 'B. 1', 'C. 5', 'D. 10'], correctAnswer:'C. 5'}
      this.questionList = [question,question1,question2,question1] ;
      this.selectedAnswers = new Array(this.questionList.length).fill(null);*/
      this.questionForm = this.fb.group({
        questions: this.fb.array([]),
      });
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
    this.initForm();
  }
  initForm() {
    const questions: (FormControl | FormArray)[] = this.questionList.map((question: { type: string }, index: number) => {
      if (question.type === 'single choice' || question.type === 'text') {
        this.selectedAnswers[index] = '';
        return new FormControl('');
      } else if (question.type === 'multiple choice') {
        this.selectedAnswers[index] = [];
        return this.fb.array([]);
      } else {
        throw new Error(`Unknown question type: ${question.type}`);
      }
    });    
    this.questionForm.setControl('questions', this.fb.array(questions));
  }
  get questionControls() {
    return (this.questionForm.get('questions') as FormArray).controls;
  }
  getFormControl(index: number): FormControl {
    const abstractControl = this.questionControls[index];
    if (abstractControl instanceof FormControl) {
      return abstractControl;
    }
    throw new Error('Not a FormControl');
  }
  
  onCheckboxChange(index: number, event: any) {
    console.log("Checkbox change event captured: ", event);
    const formArray = this.questionControls[index] as FormArray;
    console.log("Initial formArray values: ", formArray.value);
    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    } else {
      let i = 0;
      formArray.controls.forEach((ctrl: AbstractControl) => {
        if (ctrl.value == event.target.value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    console.log("Updated formArray values: ", formArray.value);
  }
  checkAnswer() {
    this.startTest = false;
    this.finishTest = true;
    this.selectedAnswers = this.questionForm.value.questions;
    this.cdRef.detectChanges();
    for (let i = 0; i < this.questionList.length; i++) {
      const correctAnswer = this.questionList[i].correctAnswer;
      const userAnswer = this.selectedAnswers[i];
      console.log("Debug: " + userAnswer);
      if (this.questionList[i].type === 'single choice') {
        if (correctAnswer && userAnswer && correctAnswer.trim().toLowerCase() === userAnswer.trim().toLowerCase()) {
          this.correctAnswersCount++;
        }
      } else if (this.questionList[i].type === 'multiple choice') {
        if (Array.isArray(userAnswer) && Array.isArray(correctAnswer)) {
          const sortedCorrectAnswer = [...correctAnswer].sort();
          const sortedUserAnswer = [...userAnswer].sort();
  
          if (JSON.stringify(sortedCorrectAnswer) === JSON.stringify(sortedUserAnswer)) {
            this.correctAnswersCount++;
          }
        }
      }
    }
  }
  isAnswerCorrect(index: number, correctAnswer: any, questionType: string): boolean {
    const selected = this.selectedAnswers[index];
    if (selected && correctAnswer) {
      if (questionType === 'single choice' || questionType === 'text') {
        return selected.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
      } else if (questionType === 'multiple choice') {
        const sortedCorrectAnswer = [...correctAnswer].sort();
          const sortedUserAnswer = [...selected].sort();
  
          if (JSON.stringify(sortedCorrectAnswer) === JSON.stringify(sortedUserAnswer)) {
            return true;
          }
      }
    }
    return false;
  }
  isArray(value:any):boolean
  {
    return Array.isArray(value);
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
