import {Component, Input, OnInit} from '@angular/core';
import {Account} from "../../../model/Account";
import {AccountService} from "../../../service/account-service";

@Component({
  selector: 'app-my-account-view',
  templateUrl: './myAccountView.html',
  styleUrls: ['./myAccountView.css']
})
export class MyAccountView implements OnInit
{

  user:Account = new Account();

  constructor(private accountService:AccountService)
  {
  }

  ngOnInit(): void
  {
    // @ts-ignore
    this.user = JSON.parse( window.sessionStorage.getItem('MCQuser') );
  }

  update()
  {
    // @ts-ignore
    document.getElementById("emailId").removeAttribute('style');
    // @ts-ignore
    document.getElementById("phone"  ).removeAttribute('style');

    let emailId = (document.getElementById("emailId" ) as HTMLInputElement).value;
    let phone   = (document.getElementById("phone"   ) as HTMLInputElement).value;
    if( emailId == null || emailId == '')
    {
      // @ts-ignore
      document.getElementById("emailId").style.borderColor = 'red';
    }
    else if( phone == null || phone == '')
    {
      // @ts-ignore
      document.getElementById("phone").style.borderColor = 'red';
    }
    else
    {
      this.accountService.updateAccount(this.user.id, emailId, phone)
        .subscribe(
          data   =>
          {
            console.log(data)
            if(data == 'success')
            {
              this.user.emailId = emailId;
              this.user.phone = phone;
              window.sessionStorage.setItem("MCQuser", JSON.stringify(this.user));
              window.location.href = this.user.role + "/updateAccount/successful";
            }
            else
            {
              window.location.href = this.user.role + "/updateAccount/" + data;
            }
          },
          error =>
          {
            window.location.href = this.user.role + "/updateAccount/" + error.message;
          })
    }
  }

}
