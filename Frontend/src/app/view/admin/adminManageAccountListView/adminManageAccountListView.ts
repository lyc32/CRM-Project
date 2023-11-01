import {Component, Input, OnInit} from '@angular/core';
import {Account} from "../../../model/Account";
import {AccountService} from "../../../service/account-service";
import _default from "chart.js/dist/plugins/plugin.tooltip";
import numbers = _default.defaults.animations.numbers;

@Component({
  selector: 'app-admin-manage-account-list-view',
  templateUrl: './adminManageAccountListView.html',
  styleUrls: ['./adminManageAccountListView.css']
})
export class AdminManageAccountListView implements OnInit
{
  searchCondition = {id:-1, userName:'', emailId:'', phone:'', minLevel:-1, maxLevel:-1, role:''};
  @Input() user:Account = new Account();
  accountList:Account[] = new Array();
  currentAccount:Account = new Account();
  newAccount:Account = new Account();
  message:string = '';
  error:string = '';

  showDeleteConfirmView:boolean = false;
  showResetPasswordView:boolean = false;
  showCreateAccountView:boolean = false;
  showMessageView:boolean = false;

  constructor(private accountService:AccountService)
  {
  }

  ngOnInit(): void
  {
    // @ts-ignore
    //this.user = JSON.parse( window.sessionStorage.getItem('MCQuser') );
  }

/******************************** SEARCH ********************************/
  // Search Bar
  search()
  {
    let id       = (document.getElementById("id"      ) as HTMLInputElement).value;
    let userName = (document.getElementById("userName") as HTMLInputElement).value;
    let emailId  = (document.getElementById("emailId" ) as HTMLInputElement).value;
    let phone    = (document.getElementById("phone"   ) as HTMLInputElement).value;
    let minLevel = (document.getElementById("minLevel") as HTMLInputElement).value;
    let maxLevel = (document.getElementById("maxLevel") as HTMLInputElement).value;
    let role     = (document.getElementById("role"    ) as HTMLInputElement).value;

    let numberId;
    let numberMinLevel;
    let numberMaxLevel;

    if(id == '')
    {
      numberId = -1;
    }
    else
    {
      numberId = Number(id);
    }

    if(minLevel == '')
    {
      numberMinLevel = -1;
    }
    else
    {
      numberMinLevel = Number(minLevel);
    }

    if(maxLevel == '')
    {
      numberMaxLevel = -1;
    }
    else
    {
      numberMaxLevel = Number(maxLevel);
    }

    this.searchCondition.id = numberId;
    this.searchCondition.userName = userName;
    this.searchCondition.role = role;
    this.searchCondition.phone = phone;
    this.searchCondition.emailId = emailId;
    this.searchCondition.minLevel = numberMinLevel;
    this.searchCondition.maxLevel = numberMaxLevel;

    this.accountService.search(numberId, userName,  emailId, phone, numberMinLevel, numberMaxLevel, role).subscribe
    (
      data =>
      {
        this.accountList = data
        this.currentAccount = new Account();
      }
    )
  }
  // Re Search, after update, delete, add
  reSearch()
  {
    this.currentAccount = new Account();
    this.accountService.search(this.searchCondition.id, this.searchCondition.userName, this.searchCondition.emailId, this.searchCondition.phone, this.searchCondition.minLevel, this.searchCondition.maxLevel,  this.searchCondition.role).subscribe
    (
      data =>
      {
        this.accountList = data
        this.currentAccount = new Account();
      }
    )
  }
/****************************** END SEARCH ******************************/


/**************************** CREATE ACCOUNT ****************************/
  showCreateAccount()
  {
    this.showCreateAccountView = true;
  }
  closeCreateAccount()
  {
    this.newAccount = new Account();
    this.showCreateAccountView = false;
  }
  createAccount()
  {
    // @ts-ignore
    document.getElementById("errorMessage").innerHTML = '';
    let role     = (document.getElementById('newAccountRole'    ) as HTMLSelectElement).value;
    let emailId  = (document.getElementById('newAccountEmailId' ) as HTMLInputElement ).value;
    let password = (document.getElementById('newAccountPassword') as HTMLInputElement ).value;
    let confirm  = (document.getElementById('newAccountConfirm' ) as HTMLInputElement ).value;
    if(emailId == '')
    {
      // @ts-ignore
      document.getElementById("errorMessage").innerHTML = '<div class="text-bg-danger h6 m-2">Email ID is Empty</div>';
    }
    else if(password == '')
    {
      // @ts-ignore
      document.getElementById("errorMessage").innerHTML = '<div class="text-bg-danger h6 m-2">Password is Empty</div>';
    }
    else if(password != confirm)
    {
      // @ts-ignore
      document.getElementById("errorMessage").innerHTML = '<div class="text-bg-danger h6 m-2">Confirm Password Not Match</div>';
    }
    else
    {
      this.accountService.adminCreateAccount(emailId,password, role )
        .subscribe( data =>
          {
            if(data == 'success')
            {
              this.showCreateAccountView = false;
              if(this.accountList.length > 0)
              {
                this.reSearch();
              }
              this.jumpWindow("Create Account Successful", '');
            }
            else
            {
              this.newAccount.emailId = emailId;
              this.newAccount.password = password;
              this.jumpWindow("Create Account Failed", data);
            }
          },
          error =>
          {
            this.newAccount.emailId = emailId;
            this.newAccount.password = password;
            this.jumpWindow("Create Account Failed", error.message);
          }
        )
    }
  }

/****************************** GET ACCOUNT *****************************/
  // show Account Detail View
  showAccountDetail(a:Account)
  {
    this.currentAccount = a;
  }
  // Open A new page to show Detail
  viewAccountDetail()
  {
    window.open(this.user.role + "/account/" + this.currentAccount.id);
  }

/**************************** UPDATE ACCOUNT ****************************/
  updateAccount()
  {
    let emailId = (document.getElementById("currentEmailId") as HTMLInputElement).value;
    let phone   = (document.getElementById("currentPhone"  ) as HTMLInputElement).value;
    let level   = (document.getElementById("currentLevel"  ) as HTMLInputElement).value;

    this.accountService.adminUpdateAccount(this.currentAccount.id, emailId, phone, Number(level))
      .subscribe(data =>
      {
        if(data == 'success')
        {
          this.reSearch();
          this.jumpWindow("Update Account Information Successful", '');
        }
        else
        {
          this.reSearch();
          this.jumpWindow("Update Account Information Failed", data);
        }
      },
        error =>
        {
          this.reSearch();
          this.jumpWindow("Update Account Information Failed", error.message);
        }
      )
  }

/**************************** DELETE ACCOUNT ****************************/
  // show delete confirm window.
  showDeleteConfirm()
  {
    this.showDeleteConfirmView = true;
  }
  // close delete confirm window.
  closeDeleteConfirm()
  {
    this.showDeleteConfirmView = false;
  }

  deleteAccount()
  {
    this.showDeleteConfirmView = false;
    this.accountService.adminDeleteAccountById(this.currentAccount.id)
      .subscribe(
        data=>
        {
          if(data == 'success')
          {
            this.reSearch();
            this.jumpWindow("Delete Account Successful", '');
          }
          else
          {
            this.reSearch();
            this.jumpWindow("Delete Account Failed", data);
          }
        },
        error =>
        {
          this.reSearch();
          this.jumpWindow("Delete Account Failed", error.message);
        }
      )

  }

/************************ RESET ACCOUNT PASSWORD ************************/
  showResetPassword()
  {
    this.showResetPasswordView = true;
  }

  closeResetPassword()
  {
    this.showResetPasswordView = false;
  }

  resetPassword()
  {
    let password = (document.getElementById("newPassword") as HTMLInputElement).value;
    let confirm  = (document.getElementById("newConfirm" ) as HTMLInputElement).value;
    if(password == '')
    {
      // @ts-ignore
      document.getElementById("error").innerHTML = '<div class="text-bg-danger h6 m-2">New Password is Empty</div>';
    }
    else if(password != confirm)
    {
      // @ts-ignore
      document.getElementById("error").innerHTML = '<div class="text-bg-danger h6 m-2">Confirm Password Not Match</div>';
    }
    else
    {
      this.showResetPasswordView = false;
      this.accountService.adminResetAccountPassword(this.currentAccount.id, password)
        .subscribe(
          data=>
          {
            if(data == 'success')
            {
              this.currentAccount.password = password;
              this.jumpWindow("Reset Account Password Successful", '');
            }
            else
            {
              this.reSearch();
              this.jumpWindow("Reset Account Password Failed", data);
            }
          },
          error =>
          {
            this.reSearch();
            this.jumpWindow("Reset Account Password Failed", error.message);
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
}
