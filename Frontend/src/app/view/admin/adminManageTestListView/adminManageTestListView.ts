import { Component } from '@angular/core';
import {Account} from "../../../model/Account";
import {Topic} from "../../../model/Topic";
import {TestService} from "../../../service/test-service";
import {Test} from "../../../model/Test";
import {TopicService} from "../../../service/topic-service";

@Component({
  selector: 'app-admin-manage-test-list-view',
  templateUrl: './adminManageTestListView.html',
  styleUrls: ['./adminManageTestListView.css']
})
export class AdminManageTestListView
{
  user:Account = new Account();
  topicList:Topic[] = new Array();
  currentTestList:Test[] = new Array();
  allTestList:Test[] = new Array();
  currentTest:Test = new Test();
  newTest:Test = new Test();
  filterTest:Test = new Test();

  message:string = '';
  error:string = '';

  showAddTestView:boolean = false;
  showDeleteConfirmView:boolean = false;
  showNewTestView:boolean = false;
  showMessageView:boolean = false;

  switch_on:string = "input";

  constructor(private testService:TestService, private topicService:TopicService)
  {
  }
  ngOnInit(): void
  {
    // @ts-ignore
    this.user = JSON.parse( window.sessionStorage.getItem('MCQuser') );

    this.testService.getAllTest()
      .subscribe(
        data =>
        {
          this.currentTestList = data;
          this.allTestList = data;
        }
      )

    this.topicService.getAllTopic()
      .subscribe(
        data => {this.topicList = data}
      )
  }


  filter()
  {
    this.filterTest.id    = Number((document.getElementById("fitlerId") as HTMLInputElement).value);
    this.filterTest.name  = (document.getElementById("fitlerName") as HTMLInputElement).value;
    this.filterTest.topic = (document.getElementById("fitlerTopic") as HTMLInputElement).value;
    this.filterTest.level = Number((document.getElementById("fitlerLevel") as HTMLInputElement).value);

    this.currentTestList = this.allTestList.filter(e =>
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
    this.testService.getAllTest()
      .subscribe(
        data =>
        {
          this.allTestList = data;
          this.currentTestList = this.allTestList.filter(e =>
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
      )
  }

  showTestDetail(test:Test)
  {
    this.currentTest = test;
    if(this.currentTest.state == 'active')
    {
      this.switch_on = "input checked";
    }
    else
    {
      this.switch_on = "input";
    }
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
      this.testService.addNewTest(this.newTest)
        .subscribe(
          data =>
          {
            if (data != null)
            {
              this.reload();
              this.newTest = new Test();
              this.currentTest = new Test();
              this.showAddTestView = false;
              this.showNewTestView = true;
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
    this.testService.deleteTest(this.currentTest.id)
      .subscribe(
        data   =>
        {
          console.log(data)
          if(data == 'success')
          {
            this.reload();
            this.currentTest = new Test();
            this.showDeleteConfirmView = false;
            this.jumpWindow("Delete Test Successful", '');
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

    this.currentTest.topic = (document.getElementById("topic") as HTMLInputElement).value;
    let level = (document.getElementById("level") as HTMLInputElement).value;
    this.currentTest.name = (document.getElementById("name") as HTMLInputElement).value;
    if (this.currentTest.topic == '') {
      // @ts-ignore
      document.getElementById("topic").style.borderColor = 'red'
    } else if (this.currentTest.name == '') {
      // @ts-ignore
      document.getElementById("name").style.borderColor = 'red'
    } else if (level == '') {
      // @ts-ignore
      document.getElementById("level").style.borderColor = 'red'
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
              this.reload();
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


/*************************** JUMP TO TEST VIEW ***************************/
  closeNewTestView()
  {
    this.reload();
    this.showNewTestView = false;
  }

  testView()
  {
    window.open(this.user.role + "/test/" + this.currentTest.id);
    this.reload();
    this.showNewTestView = false;
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
