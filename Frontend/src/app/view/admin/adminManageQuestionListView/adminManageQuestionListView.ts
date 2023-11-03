import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../../model/Question";
import {QuestionService} from "../../../service/question-service";
import {Account} from "../../../model/Account";

@Component({
  selector: 'app-admin-manage-question-list-view',
  templateUrl: './adminManageQuestionListView.html',
  styleUrls: ['./adminManageQuestionListView.css']
})
export class AdminManageQuestionListView implements OnInit
{
  user:Account = new Account();
  searchQuestionList:Question[] = new Array();

  showAddQuestionView:boolean = false;
  showUpdateQuestionView:boolean = false;
  showNewQuestionView:boolean = false;
  showDeleteQuestionConfirmView:boolean = false;
  newQuestion:Question = new Question();
  currentQuestion:Question = new Question();
  choiceList:string[] = new Array();
  currentChoiceList:String[] = new Array();
  currentAnswerList:String[] = new Array();

  qid:string = '-1';
  question:string = '';
  style:string = '';
  point:string = '-1';
  topic:string = '';
  testName:string = '';
  checkbox:boolean = false;


  message:string = '';
  error:string = '';
  showMessageView:boolean = false;

  constructor(private questionService:QuestionService)
  {
  }

  ngOnInit(): void
  {
    // @ts-ignore
    this.user = JSON.parse( window.sessionStorage.getItem('MCQuser') );
  }

  /*************************** SEARCH QUESTION ***********************************/
  search()
  {
    this.checkbox = (document.getElementById("searchCheckBox") as HTMLInputElement).checked;
    if(this.checkbox == true)
    {
      this.searchQuestionNotInALLTest();
    }
    else
    {
      this.searchQuestion();
    }

  }

  searchQuestion()
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

    this.questionService.searchQuestion(parseInt(this.qid), this.question, this.style, parseInt(this.point), this.topic, this.testName)
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
      // searchQuestion
      this.questionService.searchQuestion(parseInt(this.qid), this.question, this.style, parseInt(this.point), this.topic, this.testName)
        .subscribe(data=>{this.searchQuestionList = data; console.log(data)});
    }
  }







  showAddQuestion()
  {
    this.showAddQuestionView = true;
  }

  closeAddQuestion()
  {
    this.showAddQuestionView = false;
  }

  getQuestionType()
  {
    this.newQuestion.style = (document.getElementById("newQuestionStyle") as HTMLSelectElement).value;
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

      this.questionService.addNewQuestion(this.newQuestion)
        .subscribe(
          data=>
          {
            if (data != null)
            {
              this.currentQuestion = data;
              this.newQuestion = new Question();
              this.choiceList = new Array();
              this.showAddQuestionView = false;
              this.showNewQuestionView = true;
              this.reSearch();
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

  closeNewQuestionView()
  {
    this.showNewQuestionView = false;
  }

  QuestionView()
  {
    window.open(this.user.role + "/question/" + this.currentQuestion.id);
    this.showNewQuestionView = false;
  }

  showQuestionView(q:Question)
  {
    window.open(this.user.role + "/question/" + q.id);
  }

  showUpdateQuestion(q:Question)
  {
    this.currentQuestion = q;
    if(q.style != 'Short Answer')
    {
      this.currentChoiceList = JSON.parse(atob(q.body));
      this.currentAnswerList = JSON.parse(atob(q.answer));
      console.log(this.currentAnswerList);
    }
    this.showUpdateQuestionView = true;
  }

  closeUpdateQuestion()
  {
    this.currentQuestion = new Question();
    this.showUpdateQuestionView = false;
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
            // @ts-ignore
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
              this.showUpdateQuestionView = false;
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


  showDeleteConfirm(q:Question)
  {
    this.currentQuestion = q;
    this.showDeleteQuestionConfirmView = true;
  }

  closeDeleteConfirm()
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
            this.reSearch();
            this.jumpWindow("Delete Question Successful",'');
          }
          else
          {
            this.jumpWindow("Delete Question Failed",data);
          }
        },
        error =>
        {
          this.jumpWindow("Delete Question Failed",error.message);
        }
      )
  }


  addCurrentChoice()
  {
    this.currentChoiceList.push(this.currentChoiceList.length.toString());
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


}
