import {Component, Input, OnInit} from '@angular/core';
import {Account} from "../../../model/Account";
import {AccountService} from "../../../service/account-service";

@Component({
  selector: 'app-reset-password-view',
  templateUrl: './resetPasswordView.html',
  styleUrls: ['./resetPasswordView.css']
})
export class ResetPasswordView implements OnInit
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

  resetPassword()
  {
    let oldPassword     = (document.getElementById("oldPassword") as HTMLInputElement).value;
    let newPassword     = (document.getElementById("password"   ) as HTMLInputElement).value;
    let confirmPassword = (document.getElementById("confirm"    ) as HTMLInputElement).value;

    if( oldPassword == '')
    {
      // @ts-ignore
      document.getElementById("message").innerHTML = '<div class="text-bg-danger h6 m-2">Original Password is Empty</div>';
    }
    else if( newPassword == '')
    {
      // @ts-ignore
      document.getElementById("message").innerHTML = '<div class="text-bg-danger h6 m-2">New Password is Empty</div>';
    }
    else if(newPassword != confirmPassword)
    {
      // @ts-ignore
      document.getElementById("message").innerHTML = '<div class="text-bg-danger h6 m-2">Confirm Password Not Match</div>';
    }
    else
    {

      this.accountService.resetPassword(this.user.id, newPassword, oldPassword)
        .subscribe(
          data   =>
          {
            console.log(data)
            if(data == 'success')
            {
              this.user.password = newPassword;
              window.sessionStorage.setItem("MCQuser", JSON.stringify(this.user));
              window.location.href = this.user.role + "/resetPassword/successful";
            }
            else
            {
              // @ts-ignore
              document.getElementById("message").innerHTML = '<div class="text-bg-danger h6 m-2">'+data+'</div>';
            }
          },
          error =>
          {
            window.location.href = this.user.role + "/updateAccount/" + error.message;
          })
    }
  }

}
