import {Component, OnInit} from '@angular/core';
import {TestService} from "../../../service/test-service";
import {QuestionService} from "../../../service/question-service";
import { ActivatedRoute } from '@angular/router';
import { Test } from 'src/app/model/Test';
import {Question} from "../../../model/Question";
import _default from "chart.js/dist/core/core.interaction";
import dataset = _default.modes.dataset;

@Component({
  selector: 'app-admin-manage-test-view',
  templateUrl: './adminManageTestView.html',
  styleUrls: ['./adminManageTestView.css']
})
export class AdminManageTestView implements OnInit
{
    testId:number = -1;
    test:Test = new Test();
    questionList:Question[] = new Array();

    newQuestion:Question = new Question();
    choiceList:string[] = new Array();

    currentQuestion:Question = new Question();
    currentChoiceList:string[] = new Array();
    currentAnswerList:string[] = new Array();

    showCreateNewQuestionView:boolean = false;
    showEditQuestionView:boolean = false;
    showAddExistQuesitonView:boolean = false;
    showDeleteConfirmView:boolean = false;

    showRemoveQuestionConfirmView:boolean = false;
    showDeleteQuestionConfirmView:boolean = false;


    showMessageView:boolean = false;
    message:string = '';
    error:string = '';

    constructor(private router:ActivatedRoute, private testService:TestService, private questionService:QuestionService)
    {

    }


    ngOnInit(): void
    {
      this.testId = this.router.snapshot.params['tid'];
      this.testService.getTestById(this.testId)
        .subscribe(
          data=>{
            if(data != null)
            {
              this.test = data;
              this.getQuestionList();
            }
            else
            {

            }
          },
          error => {

          }
        )
    }


  getQuestionList()
  {
    this.questionService.getQuestionByTestId(this.testId)
      .subscribe(
        data =>
        {
          this.questionList = data
          this.currentQuestion = this.questionList[0];
        },
        error =>
        {

        }
      )
  }


  showExistQuesiton()
  {
    this.showAddExistQuesitonView  =true;
    this.showCreateNewQuestionView = false;
    this.showEditQuestionView      = false;
  }
  closeExistQuestion()
  {
    this.showAddExistQuesitonView  =false;
  }

  addQuestionIdToSet()
  {
    let qid = (document.getElementById("questionId") as HTMLInputElement).value;
    this.questionService.addNewQuestionIdToSet(Number(qid), this.testId)
      .subscribe(
        data=>
        {
          if (data == 'success')
          {
            this.showEditQuestionView = false;
            this.currentQuestion = new Question();
            this.getQuestionList();
            this.jumpWindow("Add Question To Test Successful",'');
          }
          else
          {
            this.showEditQuestionView  = false;
            this.jumpWindow("Add Question To Test Failed",data);
          }
        },
        error =>
        {
          this.showEditQuestionView  = false;
          this.jumpWindow("Add Question To Test Failed",error.message);
        }
      )
  }

/************************** REMOVE QUESTION ***************************/

  showRemoveQuestionConfirm(q:Question)
  {
    this.currentQuestion = q;
    this.showRemoveQuestionConfirmView = true;
  }

  closeRemoveQuestionConfirm()
  {
    this.currentQuestion = new Question();
    this.showRemoveQuestionConfirmView = false;
  }

  remove()
  {
    this.questionService.removeQuestionFromSet(this.currentQuestion.id, this.testId)
      .subscribe(
        data=>
        {
          if (data == 'success')
          {
            this.showRemoveQuestionConfirmView = false;
            this.currentQuestion = new Question();
            this.getQuestionList();
            this.jumpWindow("Remove Question Successful",'');
          }
          else
          {
            this.showRemoveQuestionConfirmView = false;
            this.jumpWindow("Remove Question Failed",data);
          }
        },
        error =>
        {
          this.showRemoveQuestionConfirmView = false;
          this.jumpWindow("Remove Question Failed",error.message);
        }
      )
  }

/************************** DELETE QUESTION ***************************/

showDeleteQuestionConfirm(q:Question)
{
  this.currentQuestion = q;
  this.showDeleteQuestionConfirmView = true;
}

  closeDeleteQuestionConfirm()
  {
    this.currentQuestion = new Question();
    this.showDeleteQuestionConfirmView = false;
  }

  delete()
  {
    this.questionService.deleteQuestion(this.currentQuestion.id)
      .subscribe(
        data=>
        {
          if (data == 'success')
          {
            this.showDeleteQuestionConfirmView = false;
            this.currentQuestion = new Question();
            this.getQuestionList();
            this.jumpWindow("Delete Question Successful",'');
          }
          else
          {
            this.showRemoveQuestionConfirmView = false;
            this.jumpWindow("Delete Question Failed",data);
          }
        },
        error =>
        {
          this.showRemoveQuestionConfirmView = false;
          this.jumpWindow("Delete Question Failed",error.message);
        }
      )
  }

/************************** UPDATE QUESTION ***************************/
  showCurrentQuestion(q:Question)
  {
    this.currentQuestion = q;
    if(q.style != 'Short Answer')
    {
      this.currentChoiceList = JSON.parse(atob(q.body));
      this.currentAnswerList = JSON.parse(atob(q.answer));
    }
    this.showCreateNewQuestionView = false;
    this.showEditQuestionView      = true;
    this.showAddExistQuesitonView  = false;
  }

  addCurrentChoice()
  {
    this.currentChoiceList.push(this.choiceList.length.toString());
  }

  removeCurrentChoice(i:number)
  {
    this.currentChoiceList.splice(i, 1);;
  }

  isAnswer(index:number):boolean
  {
    for(let i =0; i < this.currentAnswerList.length; i++)
    {
      if(this.currentChoiceList[index] == this.currentAnswerList[i])
      {
        return true;
      }
    }
    return false;
  }

  autoSaveCurrentChoice(i:number)
  {
    this.currentChoiceList[i] = (document.getElementById('currentChoice' + i) as HTMLInputElement).value;
  }

  update()
  {
    this.currentQuestion.question = (document.getElementById("currentQuestion") as HTMLTextAreaElement).value;
    this.currentQuestion.point = parseInt((document.getElementById("currentPoint") as HTMLInputElement).value);
    if(this.currentQuestion.style == 'Short Answer')
    {
      this.currentQuestion.body = ''
      this.currentQuestion.answer = (document.getElementById("currentAnswer") as HTMLTextAreaElement).value;
    }
    else
    {
      let answer:string[] = new Array();
      for(let i=0; i<this.currentChoiceList.length; i++)
      {
        if((document.getElementById("selectedCurrentChoice" + i) as HTMLInputElement).checked == true)
        {
          answer.push(this.currentChoiceList[i]);
        }
      }
      this.currentQuestion.body = btoa(JSON.stringify(this.currentChoiceList))
      this.currentQuestion.answer = btoa(JSON.stringify(answer))
    }

    this.questionService.updateQuestion(this.currentQuestion)
      .subscribe(
        data=>
        {
          if (data == 'success')
          {
            this.currentQuestion = new Question();
            this.showEditQuestionView = false;
            this.jumpWindow("Update Question Successful", '');
          }
          else
          {
            this.jumpWindow("Update Question Successful", data);
          }
        },
        error =>
        {
          this.jumpWindow("Update Question Successful", error.message);
        }
      )
  }


/***************************** ADD QUESTION ******************************/
  showCreateQuestion()
  {
      this.showCreateNewQuestionView = true;
      this.showEditQuestionView = false;
      this.showAddExistQuesitonView = false;
    }

  getNewQuestionType()
  {
    this.newQuestion.style = (document.getElementById('newQuestionStyle') as HTMLSelectElement).value
  }

  removeQuestionType()
  {
    this.newQuestion.style = '';
  }

  addChoice()
  {
    this.choiceList.push(this.choiceList.length.toString());
  }

  removeChoice(i:number)
  {
    this.choiceList.splice(i, 1);;
  }

  autoSaveChoice(i:number)
  {
    console.log(i);
    this.choiceList[i] = (document.getElementById('choice' + i) as HTMLInputElement).value;
    console.log(this.choiceList);
  }

  submit() //TODO
  {
    this.newQuestion.question = (document.getElementById("newQuestion") as HTMLTextAreaElement).value;
    this.newQuestion.point = parseInt((document.getElementById("newPoint") as HTMLInputElement).value);
    if(this.newQuestion.style == 'Short Answer')
    {
      this.newQuestion.body = ''
      this.newQuestion.answer = (document.getElementById("newAnswer") as HTMLTextAreaElement).value;
    }
    else
    {
      let answer:string[] = new Array();
      for(let i=0; i<this.choiceList.length; i++)
      {
        if((document.getElementById("selectedChoice" + i) as HTMLInputElement).checked == true)
        {
          answer.push(this.choiceList[i]);
        }
      }
      this.newQuestion.body = btoa(JSON.stringify(this.choiceList))
      this.newQuestion.answer = btoa(JSON.stringify(answer))
    }

    this.questionService.addNewQuestionToSet(this.newQuestion, this.testId)
      .subscribe(
        data=>
        {
          if (data == 'success')
          {
            this.newQuestion = new Question();
            this.getQuestionList();
            this.jumpWindow("Add Question Successful",'');
          }
          else
          {
            this.jumpWindow("Add Question Failed",data);
          }
        },
        error =>
        {
          this.jumpWindow("Add Question Failed",error.message);
        }
      )
  }

/***************************** DELETE TEST ******************************/
  showDeleteConfirm()
  {
    this.showDeleteConfirmView = true;
  }

  closeDeleteConfirm()
  {
    this.showDeleteConfirmView = false;
  }

  deleteTest()
  {
    this.testService.deleteTest(this.test.id)
      .subscribe(
        data   =>
        {
          console.log(data)
          if(data == 'success')
          {
            this.showDeleteConfirmView = false;
            this.deleteJumpWindow("Delete Test Successful", '');
          }
          else
          {
            this.showDeleteConfirmView = false;
            this.jumpWindow("Delete Test Failed", data);
          }
        },
        error =>
        {
          this.showDeleteConfirmView = false;
          this.jumpWindow("Delete Test Failed", error.message);
        }
      )
  }

/***************************** UPDATE TEST ******************************/
  updateTest()
  {
    // @ts-ignore
    document.getElementById("topic").removeAttribute('style');
    // @ts-ignore
    document.getElementById("name").removeAttribute('style');
    // @ts-ignore
    document.getElementById("level").removeAttribute('style');

    this.test.topic = (document.getElementById("topic") as HTMLInputElement).value;
    let level = (document.getElementById("level") as HTMLInputElement).value;
    this.test.name = (document.getElementById("name") as HTMLInputElement).value;
    if (this.test.topic == '') {
      // @ts-ignore
      document.getElementById("topic").style.borderColor = 'red'
    } else if (this.test.name == '') {
      // @ts-ignore
      document.getElementById("name").style.borderColor = 'red'
    } else if (level == '') {
      // @ts-ignore
      document.getElementById("level").style.borderColor = 'red'
    }
    else
    {
      this.test.level = parseInt(level);
      this.testService.updateTest(this.test)
        .subscribe(
          data   =>
          {
            if(data == 'success')
            {
              this.jumpWindow("Update Test Successful", '');
            }
            else
            {
              this.jumpWindow("Update Test Failed", data);
            }
          },
          error =>
          {
            this.jumpWindow("Update Test Failed", error.message);
          }
        )
    }
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
