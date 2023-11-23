import {Component, OnInit} from '@angular/core';
import {TestService} from "../../../service/test-service";
import {QuestionService} from "../../../service/question-service";
import { ActivatedRoute } from '@angular/router';
import { Test } from 'src/app/model/Test';
import {Question} from "../../../model/Question";
import _default from "chart.js/dist/core/core.interaction";
import dataset = _default.modes.dataset;
import {Account} from "../../../model/Account";

@Component({
  selector: 'app-admin-manage-test-view',
  templateUrl: './adminManageTestView.html',
  styleUrls: ['./adminManageTestView.css']
})
export class AdminManageTestView implements OnInit
{
    user:Account = new Account();
    testId:number = -1;
    test:Test = new Test();
    questionList:Question[] = new Array();
    searchQuestionList:Question[] = new Array();
    newQuestion:Question = new Question();
    choiceList:string[] = new Array();
    currentQuestion:Question = new Question();
    currentChoiceList:string[] = new Array();
    currentAnswerList:string[] = new Array();
    chosedExitQuestion:Question = new Question();
    qid:string = '';
    question:string = '';
    style:string = '';
    point:string = '';
    topic:string = '';
    testName:string = '';
    checkbox:boolean = false;


    showCreateNewQuestionView:boolean = false;
    showEditQuestionView:boolean = false;
    showAddExistQuesitonView:boolean = false;
    showExistCurrentQuestionView:boolean = false;
    showDeleteConfirmView:boolean = false;
    showRemoveQuestionConfirmView:boolean = false;
    showDeleteQuestionConfirmView:boolean = false;

    switch_on:string = "input";


    showMessageView:boolean = false;
    message:string = '';
    error:string = '';

    constructor(private router:ActivatedRoute, private testService:TestService, private questionService:QuestionService)
    {

    }


    ngOnInit(): void //TODO add Error=>{}
    {
      // @ts-ignore
      this.user = JSON.parse( window.sessionStorage.getItem('MCQuser') );
      this.testId = this.router.snapshot.params['tid'];
      this.testService.getTestById(this.testId)
        .subscribe(
          data=>{
            if(data != null)
            {
              this.test = data;
              if(this.test.state == 'active')
              {
                this.switch_on = 'input checked';
              }
              else
              {
                this.switch_on = 'input';
              }
              this.getQuestionList();
            }
          }
        )
    }

  swithcButton()
  {
    if(this.switch_on == "input")
    {
      this.switch_on = "input checked";
    }
    else
    {
      this.switch_on = "input";
    }
  }

  getQuestionList() //TODO add Error=>{}
  {
    this.questionService.getQuestionByTestId(this.testId)
      .subscribe(
        data =>
        {
          this.questionList = data
          this.currentQuestion = this.questionList[0];
        }
      )
  }

  openQuestionView(id:number)
  {
    window.open(this.user.role + "/question/" + id);
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
    let check:boolean = true;
    // @ts-ignore
    document.getElementById("currentQuestion").removeAttribute('style');
    // @ts-ignore
    document.getElementById("currentPoint"   ).removeAttribute('style');
    // @ts-ignore
    document.getElementById("currentTime"    ).removeAttribute('style');
    // @ts-ignore
    document.getElementById("currentAnswer"  ).removeAttribute('style');

    this.currentQuestion.question = (document.getElementById("currentQuestion") as HTMLTextAreaElement).value;
    let point = (document.getElementById("currentPoint") as HTMLInputElement).value;
    let time  = (document.getElementById("currentTime" ) as HTMLInputElement).value;
    if(this.currentQuestion.question == '')
    {
      // @ts-ignore
      document.getElementById("currentQuestion").style.borderColor = 'red';
      check = false;
    }
    else if(point == '' || point == '-1')
    {
      // @ts-ignore
      document.getElementById("currentPoint").style.borderColor = 'red'
      check = false;
    }
    else if(time == '' || time == '-1')
    {
      // @ts-ignore
      document.getElementById("currentTime").style.borderColor = 'red'
      check = false;
    }

    if(this.currentQuestion.style == 'Short Answer')
    {
      this.currentQuestion.body = ''
      this.currentQuestion.answer = (document.getElementById("currentAnswer") as HTMLTextAreaElement).value;
      if(this.currentQuestion.answer == '')
      {
        // @ts-ignore
        document.getElementById("currentAnswer").style.borderColor = 'red'
        check = false;
      }
    }
    else
    {
      // @ts-ignore
      document.getElementById("currentBody"    ).removeAttribute('style');
      if(this.currentChoiceList.length == 0)
      {
        // @ts-ignore
        document.getElementById("currentBody").style.color = 'red';
        check = false;
      }
      else
      {
        this.currentQuestion.body = btoa(JSON.stringify(this.currentChoiceList))

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

        if(answer.length == 0)
        {
          // @ts-ignore
          document.getElementById("currentAnswer").style.color = 'red';
          check = false;
        }
        else
        {
          this.currentQuestion.answer = btoa(JSON.stringify(answer))
        }
      }
    }

    if(check)
    {
      this.currentQuestion.point = parseInt(point);
      this.currentQuestion.time  = parseInt(time );
      this.questionService.updateQuestion(this.currentQuestion)
        .subscribe(
          data=>
          {
            if (data == 'success')
            {
              this.currentQuestion = new Question();
              if(this.showEditQuestionView == true)
              {
                this.showEditQuestionView = false;
              }
              if(this.showExistCurrentQuestionView == true)
              {
                this.reSearch();
                this.showExistCurrentQuestionView = false;
              }
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
  }

/***************************** ADD QUESTION ******************************/
  showCreateQuestion()
  {
      this.showCreateNewQuestionView = true;
      this.showEditQuestionView = false;
      this.showAddExistQuesitonView = false;
      this.newQuestion = new Question();
      this.choiceList = new Array();
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

  submit()
  {
    let check:boolean = true;
    // @ts-ignore
    document.getElementById("newQuestion").removeAttribute('style');
    // @ts-ignore
    document.getElementById("newPoint"   ).removeAttribute('style');
    // @ts-ignore
    document.getElementById("newTime"    ).removeAttribute('style');
    // @ts-ignore
    document.getElementById("newAnswer"  ).removeAttribute('style');

    this.newQuestion.question = (document.getElementById("newQuestion") as HTMLTextAreaElement).value;
    let point = (document.getElementById("newPoint") as HTMLInputElement).value;
    let time  = (document.getElementById("newTime" ) as HTMLInputElement).value;
    if(this.newQuestion.question == '')
    {
      // @ts-ignore
      document.getElementById("newQuestion").style.borderColor = 'red';
      check = false;
    }
    else if(point == '' || point == '-1')
    {
      // @ts-ignore
      document.getElementById("newPoint").style.borderColor = 'red'
      check = false;
    }
    else if(time == '' || time == '-1')
    {
      // @ts-ignore
      document.getElementById("newTime").style.borderColor = 'red'
      check = false;
    }

    if(this.newQuestion.style == 'Short Answer')
    {
      this.newQuestion.body = ''
      this.newQuestion.answer = (document.getElementById("newAnswer") as HTMLTextAreaElement).value;
      if(this.newQuestion.answer == '')
      {
        // @ts-ignore
        document.getElementById("newAnswer").style.borderColor = 'red'
        check = false;
      }
    }
    else
    {
      // @ts-ignore
      document.getElementById("newBody"    ).removeAttribute('style');
      if(this.choiceList.length == 0)
      {
        // @ts-ignore
        document.getElementById("newBody").style.color = 'red';
        check = false;
      }
      else
      {
        this.newQuestion.body = btoa(JSON.stringify(this.choiceList))

        let answer: string[] = new Array();
        for (let i = 0; i < this.choiceList.length; i++) {
          if ((document.getElementById("selectedChoice" + i) as HTMLInputElement).checked == true) {
            answer.push(this.choiceList[i]);
          }
        }

        if(answer.length == 0)
        {
          // @ts-ignore
          document.getElementById("newAnswer").style.color = 'red';
          check = false;
        }
        else
        {
          this.newQuestion.answer = btoa(JSON.stringify(answer))
        }
      }
    }

    if(check)
    {
      this.newQuestion.point = parseInt(point);
      this.newQuestion.time  = parseInt(time );

      this.questionService.addNewQuestionToSet(this.newQuestion, this.testId)
        .subscribe(
          data=>
          {
            if (data == 'success')
            {
              this.newQuestion = new Question();
              this.choiceList = new Array();
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
  }

/************************ SHOW EXIST QUESTION ***************************/
  showExistCurrentQuestion(q:Question)
  {
    this.currentQuestion=q;
    if(q.style != 'Short Answer')
    {
      this.currentChoiceList = JSON.parse(atob(q.body));
      this.currentAnswerList = JSON.parse(atob(q.answer));
    }
    this.showExistCurrentQuestionView = true;
  }

  closeExistCurrentQuestion()
  {
    if(this.currentQuestion.style != 'Short Answer')
    {
      this.currentChoiceList = new Array();
      this.currentAnswerList = new Array();
    }
    this.currentQuestion = new Question();
    this.showExistCurrentQuestionView = false;
  }

/************************* ADD EXIST QUESTION ***************************/
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

  search()
  {
    this.checkbox = (document.getElementById("searchCheckBox") as HTMLInputElement).checked;
    if(this.checkbox == true)
    {
      this.searchQuestionNotInALLTest();
    }
    else
    {
      this.searchQuestionNotInThisTest();
    }

  }

  searchQuestionNotInThisTest()
  {
    this.qid      = (document.getElementById("searchQid"     ) as HTMLInputElement ).value;
    this.question = (document.getElementById("searchQuestion") as HTMLInputElement ).value;
    this.style    = (document.getElementById("searchStyle"   ) as HTMLSelectElement).value;
    this.point    = (document.getElementById("searchPoint"    ) as HTMLInputElement ).value;
    this.topic    = (document.getElementById("searchTopic"   ) as HTMLSelectElement).value;
    this.testName = (document.getElementById("searchTest"    ) as HTMLInputElement ).value;
    if(this.qid == '')
    {
      this.qid = '-1';
    }
    if(this.point == '')
    {
      this.point = '-1';
    }

    this.questionService.searchQuestionNotInThisTest(parseInt(this.qid), this.question, this.style, parseInt(this.point), this.topic, this.testName, this.testId)
      .subscribe(data=>{this.searchQuestionList = data; console.log(data)});
  }

  searchQuestionNotInALLTest()
  {
    this.qid      = (document.getElementById("searchQid"     ) as HTMLInputElement ).value;
    this.question = (document.getElementById("searchQuestion") as HTMLInputElement ).value;
    this.style    = (document.getElementById("searchStyle"   ) as HTMLSelectElement).value;
    this.point     = (document.getElementById("searchPoint"    ) as HTMLInputElement ).value;
    if(this.qid == '')
    {
      this.qid = '-1';
    }
    if(this.point == '')
    {
      this.point = '-1';
    }

    this.questionService.searchQuestionNotInALLTest(parseInt(this.qid), this.question, this.style, parseInt(this.point))
      .subscribe(data=>{this.searchQuestionList = data; console.log(data)});
  }

  reSearch()
  {
    if(this.checkbox == true)
    {
      this.questionService.searchQuestionNotInALLTest(parseInt(this.qid), this.question, this.style, parseInt(this.point))
        .subscribe(data=>{this.searchQuestionList = data; console.log(data)});
    }
    else
    {
      // searchQuestionNotInThisTest
      this.questionService.searchQuestionNotInThisTest(parseInt(this.qid), this.question, this.style, parseInt(this.point), this.topic, this.testName, this.testId)
        .subscribe(data=>{this.searchQuestionList = data; console.log(data)});
    }
  }


  chooseExitQuestion(q:Question)
  {
    this.chosedExitQuestion = q;
  }
  addQuestionIdToSet()
  {
    this.questionService.addNewQuestionIdToSet(this.chosedExitQuestion.id, this.testId)
      .subscribe(
        data=>
        {
          if (data == 'success')
          {
            this.showEditQuestionView = false;
            this.currentQuestion = new Question();
            this.reSearch();
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
    } else if (level == '' || level == '-1') {
      // @ts-ignore
      document.getElementById("level").style.borderColor = 'red'
    }
    else
    {
      this.test.level = parseInt(level);
      if(this.switch_on == 'input checked')
      {
        this.test.state = 'active';
      }
      else
      {
        this.test.state = 'inactive';
      }
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
