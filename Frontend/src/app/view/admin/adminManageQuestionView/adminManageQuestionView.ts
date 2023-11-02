import { Component } from '@angular/core';
import { TestService } from "../../../service/test-service";
import { QuestionService } from "../../../service/question-service";
import { ActivatedRoute, Router } from "@angular/router";
import { Test } from "src/app/model/Test";
import { Question } from "../../../model/Question";
import { QuestionToTestService } from "../../../service/question-to-test.service"
@Component({
  selector: 'app-admin-manage-question-view',
  templateUrl: './adminManageQuestionView.html',
  styleUrls: ['./adminManageQuestionView.css']
})
export class AdminManageQuestionView {
  questionId: number = -1;
  question: Question = new Question();
  testList: Test[] = new Array();
  test:Test = new Test();
  newQuestion: Question = new Question();
  choiceList: string[] = new Array();

  currentTest: Test = new Test();
  showCreateNewQuestionView: boolean = false;
  showEditQuestionView: boolean = false;
  showAddExitQuesitonView: boolean = false;
  showDeleteQuestionConfirmView: boolean = false;
  showEditTestView:boolean = false;
  showMessageView:boolean = false;
    message:string = '';
    error:string = '';
  constructor(
    private routing: Router,
    private router: ActivatedRoute,
    private testService: TestService,
    private questionService: QuestionService,
    private questionToTestService:QuestionToTestService
  ) {}
  ngOnInit(): void {
    this.questionId = this.router.snapshot.params["qid"];
    this.questionService.getQuestionById(this.questionId).subscribe((data) => {
      this.question = data;
    });
    this.getTestByQuestionId(this.questionId);
  }
  
  
  getTestByQuestionId(qid:number)
  {
    this.testService.getTestByQuestionId(this.questionId).subscribe(
      (data) => {
        if (data != null) {
          this.testList = data;
        }
      },
      (error) => {}
    );
  }
/* Question Features */

  update()
  {
    let newQuestion = (document.getElementById("question") as HTMLInputElement).value;
    let newAnswer = (document.getElementById("answer") as HTMLInputElement).value;
    let newStyle = (document.getElementById("style") as HTMLInputElement).value;
    let newPoint = (document.getElementById("point") as HTMLInputElement).value;

    this.question.question = newQuestion;
    this.question.answer = newAnswer;
    this.question.style = newStyle;
    this.question.point = Number(newPoint);

    this.questionService.updateQuestion(this.question).subscribe(data=>{
      if(data != 'Illegal Request')
      {
        this.questionService.getQuestionById(this.question.id).subscribe(data=>{
          this.question = data;
        })
        this.jumpWindow("Update Question Successful",'');
        this.routing.navigate(['admin/question']);
      }
      else
      {
        this.jumpWindow("Update Question Failed",data);
      }
    })
  }
  delete()
  {
    this.questionService.deleteQuestion(this.questionId)
      .subscribe(
        data=>
        {
          if (data == 'success')
          {
            this.showDeleteQuestionConfirmView = false;
            this.question = new Question();
            this.jumpWindow("Delete Question Successful",'');
            this.routing.navigate(['admin/question']);
          }
          else
          {
            this.showDeleteQuestionConfirmView = false;
            this.jumpWindow("Delete Question Failed",data);
          }
        },
        error =>
        {
          this.showDeleteQuestionConfirmView = false;
          this.jumpWindow("Delete Question Failed",error.message);
        }
      )
  }

  /*Test Features*/
  showCurrentTest(t: Test) {
    this.currentTest = t;
    //this.showCreateNewQuestionView = false;
    this.showEditTestView = true;
    //this.showAddExitQuesitonView = false;
  }
  removeQuestionFromTest(tid:number, pid:number)
  {
    console.log("Delete get called");
    this.questionToTestService.removeQuestionFromTest(tid, pid)
    .subscribe(
      (response: string) => {
        this.getTestByQuestionId(pid);
        console.log('Successfully removed question:', response);
      },
      (error: any) => {
        console.error('Error removing question:', error);
      }
    );
  }
  updateTest()
  {
    let newName = (document.getElementById("currentTestName") as HTMLTextAreaElement).value;
    let newTopic = (document.getElementById("currentTestTopic") as HTMLTextAreaElement).value;
    let newLevel = (document.getElementById("currentTestLevel") as HTMLInputElement).value;

    this.currentTest.name = newName;
    this.currentTest.topic = newTopic;
    this.currentTest.level = Number(newLevel);

    this.testService.updateTest(this.currentTest).subscribe(data=>{
      if(data != 'Illegal Request')
      {
        this.getTestByQuestionId(this.questionId);
        this.jumpWindow("Update Question Successful",'');
      }
      else
      {
        this.jumpWindow("Update Question Failed",data);
      }
    })
  }
  /*View conditions*/
  showCreateQuestion() {
    this.showCreateNewQuestionView = true;
    this.showEditQuestionView = false;
    this.showAddExitQuesitonView = false;
  }

  showDeleteQuestionConfirm(q: Question) {
    this.question = q;
    this.showDeleteQuestionConfirmView = true;
  }
  closeDeleteQuestionConfirm() {
    this.question = new Question();
    this.showDeleteQuestionConfirmView = false;
  }
  getNewQuestionType() {
    this.newQuestion.style = (
      document.getElementById("newQuestionStyle") as HTMLSelectElement
    ).value;
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

  deleteJumpWindow(message:string, error:string)
  {
    this.message = message;
    this.error = error;
    this.showMessageView = true;
    setTimeout(()=>
    {
      this.showMessageView = false;
      // @ts-ignore
      let user:Account = JSON.parse( window.sessionStorage.getItem('MCQuser') );
      window.location.href = user.role + "/test";
    }, 5000);
  }
}
