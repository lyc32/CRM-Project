import {Component, OnInit} from '@angular/core';
import {Account} from "../../../model/Account";

@Component({
  selector: 'app-admin-desh-board-view',
  templateUrl: './adminDeshBoardView.html',
  styleUrls: ['./adminDeshBoardView.css']
})
export class AdminDeshBoardView implements OnInit
{
  user:Account = new Account();
  ngOnInit(): void
  {
    // @ts-ignore
    this.user = JSON.parse( window.sessionStorage.getItem('MCQuser') );
  }

  toAccountManageView()
  {
    window.location.href = "/" + this.user.role + "/account";
  }

  toQuestionManageView()
  {
    window.location.href = "/" + this.user.role + "/question";
  }

  toTestManageView()
  {
    window.location.href = "/" + this.user.role + "/test";
  }

  toTopicManageView()
  {
    window.location.href = "/" + this.user.role + "/topic";
  }
}
