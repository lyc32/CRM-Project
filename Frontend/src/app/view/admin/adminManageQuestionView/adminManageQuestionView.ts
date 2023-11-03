import { Component } from '@angular/core';
import { TestService } from "../../../service/test-service";
import { QuestionService } from "../../../service/question-service";
import { ActivatedRoute, Router } from "@angular/router";
import { Test } from "src/app/model/Test";
import { Question } from "../../../model/Question";
import {Account} from "../../../model/Account";
import {Topic} from "../../../model/Topic";
import {TopicService} from "../../../service/topic-service";
@Component({
  selector: 'app-admin-manage-question-view',
  templateUrl: './adminManageQuestionView.html',
  styleUrls: ['./adminManageQuestionView.css']
})
export class AdminManageQuestionView {

  user:Account = new Account();
  questionId: number = -1;
  question: Question = new Question();
  currentChoiceList:String[] = new Array();
  currentAnswerList:String[] = new Array();

  topicList:Topic[] = new Array();
  testList: Test[] = new Array();
  existTestList: Test[] = new Array();
  currentExistTestList:Test[] = new Array();
  currentTest: Test = new Test();
  newTest:Test = new Test();
  filterTest:Test = new Test();
  chosedExitTest:Test = new Test();

  showDeleteQuestionConfirmView: boolean = false;
  showRemoveTestConfirmView: boolean = false;
  showAddTestView: boolean = false;
  showAddExistTestView:boolean = false;
  showEditTestView:boolean = false;
  showMessageView:boolean = false;

  message:string = '';
  error:string = '';
  switch_on:string = "input";


  constructor(private routing: Router, private router: ActivatedRoute, private testService: TestService, private topicService:TopicService, private questionService: QuestionService)
  {}
  ngOnInit(): void
  {
    // @ts-ignore
    this.user = JSON.parse( window.sessionStorage.getItem('MCQuser') );
    this.questionId = this.router.snapshot.params["qid"];
    this.questionService.getQuestionById(this.questionId).subscribe((data) =>
    {
      this.question = data;
      if(data.style != 'Short Answer')
      {
        this.currentChoiceList = JSON.parse(atob(data.body));
        this.currentAnswerList = JSON.parse(atob(data.answer));
        console.log(this.currentAnswerList);
      }
    });
    this.topicService.getAllTopic()
      .subscribe(
        data => {this.topicList = data}
      )
    this.getTestByQuestionId();
  }

  getTestByQuestionId()
  {
    this.testService.getTestByQuestionId(this.questionId).subscribe(
      (data) => {
        if (data != null) {
          console.log(data)
          this.testList = data;
        }
      },
      (error) => {}
    );
  }

/*************************** UPDATE QUESTION ****************************/
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

    this.question.question = (document.getElementById("currentQuestion") as HTMLTextAreaElement).value;
    let point = (document.getElementById("currentPoint") as HTMLInputElement).value;
    let time  = (document.getElementById("currentTime" ) as HTMLInputElement).value;
    if(this.question.question == '')
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

    if(this.question.style == 'Short Answer')
    {
      this.question.body = ''
      this.question.answer = (document.getElementById("currentAnswer") as HTMLTextAreaElement).value;
      if(this.question.answer == '')
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
        this.question.body = btoa(JSON.stringify(this.currentChoiceList))

        let answer:string[] = new Array();
        for(let i=0; i<this.currentChoiceList.length; i++)
        {
          if((document.getElementById("selectedCurrentChoice" + i) as HTMLInputElement).checked == true)
          {
            // @ts-ignore
            answer.push(this.currentChoiceList[i]);
          }
        }
        this.question.body = btoa(JSON.stringify(this.currentChoiceList))
        this.question.answer = btoa(JSON.stringify(answer))

        if(answer.length == 0)
        {
          // @ts-ignore
          document.getElementById("currentAnswer").style.color = 'red';
          check = false;
        }
        else
        {
          this.question.answer = btoa(JSON.stringify(answer))
        }
      }
    }

    if(check)
    {
      this.question.point = parseInt(point);
      this.question.time  = parseInt(time );
      this.questionService.updateQuestion(this.question)
        .subscribe(
          data=>
          {
            if (data == 'success')
            {
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

/*************************** DELETE QUESTION ****************************/
  showDeleteConfirm()
  {
    this.showDeleteQuestionConfirmView = true;
  }
  closeDeleteConfirm()
  {
    this.showDeleteQuestionConfirmView = false;
  }
  delete()
  {
    this.questionService.deleteQuestion(this.question.id)
      .subscribe(
        data=>
        {
          if (data == 'success')
          {
            this.showDeleteQuestionConfirmView = false;
            this.question = new Question();
            this.deleteJumpWindow("Delete Question Successful",'');
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

/**************************** OPEN TEST VIEW ****************************/
  testView(id:number)
  {
    window.open(this.user.role + "/test/" + id);
  }

/***************************** CREATE TEST ******************************/
  showAddTest()
  {
    this.showAddTestView = true;
  }

  closeAddTest()
  {
    this.newTest = new Test();
    // @ts-ignore
    document.getElementById("newTopic").removeAttribute('style');
    // @ts-ignore
    document.getElementById("newName").removeAttribute('style');
    // @ts-ignore
    document.getElementById("newLevel").removeAttribute('style');
    this.showAddTestView = false;
  }

  addNewTest() {
    // @ts-ignore
    document.getElementById("newTopic").removeAttribute('style');
    // @ts-ignore
    document.getElementById("newName").removeAttribute('style');
    // @ts-ignore
    document.getElementById("newLevel").removeAttribute('style');

    this.newTest.topic = (document.getElementById("newTopic") as HTMLInputElement).value;
    let level = (document.getElementById("newLevel") as HTMLInputElement).value;
    this.newTest.name = (document.getElementById("newName") as HTMLInputElement).value;
    if (this.newTest.topic == '') {
      // @ts-ignore
      document.getElementById("newTopic").style.borderColor = 'red'
    } else if (this.newTest.name == '') {
      // @ts-ignore
      document.getElementById("newName").style.borderColor = 'red'
    } else if (level == '') {
      // @ts-ignore
      document.getElementById("newLevel").style.borderColor = 'red'
    }
    else
    {
      this.newTest.level = parseInt(level);
      this.testService.addNewSetToQuestion( this.newTest, this.questionId)
        .subscribe(
          data =>
          {
            if (data == 'success')
            {
              this.getTestByQuestionId();
              this.newTest = new Test();
              this.currentTest = new Test();
              this.showAddTestView = false;
              this.jumpWindow("Create Test Successful", '');
            }
            else
            {
              this.jumpWindow("Create Test Failed", data);
            }
          },
          error =>
          {
            this.jumpWindow("Create Test Failed", error.message);
          });
    }
  }

/*************************** Add Exist TEST *****************************/
  showAddExistTest()
  {
    this.filterTest = new Test();
    this.testService.getTestWithoutQuestionId(this.questionId)
      .subscribe(data =>
      {
        this.existTestList = data;
        this.currentExistTestList = this.existTestList;
        this.showAddExistTestView = true;
      });
  }
  closeAddExistTest()
  {
    this.showAddExistTestView = false;
    this.existTestList = new Array();
  }

  filter()
  {
    console.log("call filter");
    this.filterTest.id    = Number((document.getElementById("fitlerId") as HTMLInputElement).value);
    this.filterTest.name  = (document.getElementById("fitlerName") as HTMLInputElement).value;
    this.filterTest.topic = (document.getElementById("fitlerTopic") as HTMLInputElement).value;
    this.filterTest.level = Number((document.getElementById("fitlerLevel") as HTMLInputElement).value);

    this.currentExistTestList = this.existTestList.filter(e =>
    { if(this.filterTest.id > 0 && e.id != this.filterTest.id)
    {
      return false;
    }
      if(this.filterTest.name != '' && e.name.search(this.filterTest.name) == -1)
      {
        return false;
      }
      if(this.filterTest.topic != '' && e.topic.search(this.filterTest.topic) == -1)
      {
        return false;
      }
      if(this.filterTest.level != -1 && e.level != this.filterTest.level)
      {
        return false;
      }
      return true;
    })
  }

  reload()
  {
    this.testService.getTestWithoutQuestionId(this.questionId)
      .subscribe(
        data =>
        {
          this.existTestList = data
          this.currentExistTestList = this.existTestList.filter(e =>
          { if(this.filterTest.id > 0 && e.id != this.filterTest.id)
          {
            return false;
          }
            if(this.filterTest.name != '' && e.name.search(this.filterTest.name) == -1)
            {
              return false;
            }
            if(this.filterTest.topic != '' && e.topic.search(this.filterTest.topic) == -1)
            {
              return false;
            }
            if(this.filterTest.level != -1 && e.level != this.filterTest.level)
            {
              return false;
            }
            return true;
          })
        });
  }

  chooseExitTest(t:Test)
  {
    this.chosedExitTest = t;
  }
  addSetIdToQuestion()
  {
    this.questionService.addNewQuestionIdToSet(this.questionId, this.chosedExitTest.id)
      .subscribe(
        data=>
        {
          if (data == 'success')
          {
            this.chosedExitTest = new Test();
            this.getTestByQuestionId();
            this.reload();
            this.jumpWindow("Add Test To Question Successful",'');
          }
          else
          {
            this.jumpWindow("Add Test To Question Failed",data);
          }
        },
        error =>
        {
          this.jumpWindow("Add Test To Question Failed",error.message);
        }
      )
  }


/***************************** REMOVE TEST ******************************/

  showRemoveTestConfirm(t:Test)
  {
    this.currentTest = t;
    this.showRemoveTestConfirmView = true;
  }

  closeRemoveTestConfirm()
  {
    this.showRemoveTestConfirmView = false;
  }

  removeQuestionFromTest()
  {
    this.questionService.removeQuestionFromSet(this.questionId, this.currentTest.id)
      .subscribe(
        data=>
        {
          if (data == 'success')
          {
            this.showRemoveTestConfirmView = false;
            this.currentTest = new Test();
            this.getTestByQuestionId();
            this.jumpWindow("Remove Test Successful",'');
          }
          else
          {
            this.showRemoveTestConfirmView = false;
            this.jumpWindow("Remove Test Failed",data);
          }
        },
        error =>
        {
          this.showRemoveTestConfirmView = false;
          this.jumpWindow("Remove Test Failed",error.message);
        }
      )
  }


/***************************** UPDATE TEST ******************************/
  showCurrentTest(t: Test)
  {
    this.currentTest = t;
    if(this.currentTest.state == "active")
    {
      this.switch_on = "input checked";
    }
    else
    {
      this.switch_on = "input";
    }
    this.showEditTestView = true;
  }
  closeCurrentTest()
  {
      this.currentTest = new Test();
      this.showEditTestView = false;
  }
  swithcButton()
  {
    console.log("clicked");
    if(this.switch_on == "input")
    {
      this.switch_on = "input checked";
    }
    else
    {
      this.switch_on = "input";
    }
  }
  updateTest()
  {
    // @ts-ignore
    document.getElementById("currentTestTopic").removeAttribute('style');
    // @ts-ignore
    document.getElementById("currentTestName").removeAttribute('style');
    // @ts-ignore
    document.getElementById("currentTestLevel").removeAttribute('style');

    this.currentTest.topic = (document.getElementById("currentTestTopic") as HTMLInputElement).value;
    let level = (document.getElementById("currentTestLevel") as HTMLInputElement).value;
    this.currentTest.name = (document.getElementById("currentTestName") as HTMLInputElement).value;
    if (this.currentTest.topic == '') {
      // @ts-ignore
      document.getElementById("currentTestTopic").style.borderColor = 'red'
    } else if (this.currentTest.name == '') {
      // @ts-ignore
      document.getElementById("currentTestName").style.borderColor = 'red'
    } else if (level == '') {
      // @ts-ignore
      document.getElementById("currentTestLevel").style.borderColor = 'red'
    }
    else
    {
      this.currentTest.level = parseInt(level);
      if(this.switch_on == 'input checked')
      {
        this.currentTest.state = 'active';
      }
      else
      {
        this.currentTest.state = 'inactive';
      }
      this.testService.updateTest(this.currentTest)
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
      window.location.href = user.role + "/question";
    }, 5000);
  }
}
