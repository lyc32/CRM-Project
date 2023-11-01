import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTakeTestView } from './view/user/userTakeTestView/userTakeTestView';
import { UserTestListView } from "./view/user/userTestListView/userTestListView";
import { LogInView   } from "./view/commonView/logInView/logInView";
import {InitAccountView} from "./view/commonView/initAccountView/initAccountView";
import {MyAccountView} from "./view/commonView/myAccountView/myAccountView";
import {JumpPage} from "./view/jumpPage/jumpPage";
import {ResetPasswordView} from "./view/commonView/resetPasswordView/resetPasswordView";
import {UserDashBoardView} from "./view/user/userDashBoardView/userDashBoardView";
import {AdminDeshBoardView} from "./view/admin/adminDeshBoardView/adminDeshBoardView";
import {AdminManageTopicView} from "./view/admin/adminManageTopicView/adminManageTopicView";
import {AdminManageTestListView} from "./view/admin/adminManageTestListView/adminManageTestListView";
import { AdminManageTestView } from './view/admin/adminManageTestView/adminManageTestView';
import { AdminManageQuestionListView } from './view/admin/adminManageQuestionListView/adminManageQuestionListView';
import { AdminManageAccountListView } from './view/admin/adminManageAccountListView/adminManageAccountListView';
import { UserTestResultView } from './view/user/userTestResultView/userTestResultView ';
import { AdminManageQuestionView } from './view/admin/adminManageQuestionView/adminManageQuestionView';

const routes: Routes = [

  // for all account
  {path:"login"                   , component:LogInView                   },
  {path:":role/initAccount"       , component:InitAccountView             },
  {path:":role/myAccount"         , component:MyAccountView               },
  {path:":role/resetPassword"     , component:ResetPasswordView           },

  // for user
  {path:"user/dashboard"          , component:UserDashBoardView           },
  {path:"user/myTest"             , component:UserTestListView            },
  {path:"user/myTest/:tid"        , component:UserTakeTestView            }, //TODO test start view
  {path:"user/myAwards"           , component:UserTestResultView          }, //TODO
  {path:"user/myAwards/:rid"      , component:UserTestResultView          }, //TODO

  // for admin
  {path:":role/dashboard"         , component:AdminDeshBoardView          },
  {path:":role/topic"             , component:AdminManageTopicView        },
  {path:":role/test"              , component:AdminManageTestListView     },
  {path:":role/test/:tid"         , component:AdminManageTestView         },

  {path:":role/question"          , component:AdminManageQuestionListView },
  {path:":role/question/:qid"     , component:AdminManageQuestionView     }, //TODO

  {path:":role/account"           , component:AdminManageAccountListView  },
  {path:":role/account/:aid"      , component:UserTestResultView          }, //TODO account data

  {path:":role/:operation/:result", component:JumpPage                    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule
{



}
