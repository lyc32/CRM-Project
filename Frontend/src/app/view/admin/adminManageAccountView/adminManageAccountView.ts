import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import {ActivatedRoute} from "@angular/router";
import {TestService} from "../../../service/test-service";
import {QuestionService} from "../../../service/question-service";
import {TestResultService} from "../../../service/test-result-service";
import {UserState} from "../../../model/userState";
import {Account} from "../../../model/Account";
import {TestResult} from "../../../model/TestResult";

Chart.register(...registerables);

@Component({
  selector: 'app-admin-manage-account-view',
  templateUrl: './adminManageAccountView.html',
  styleUrls: ['./adminManageAccountView.css']
})
export class AdminManageAccountView {

  @ViewChild('gradePieChart') chartRef!: ElementRef;

  user:Account = new Account();
  uid:number = -1;
  pass:number = 0;
  unpass:number = 0;
  testResultList:TestResult[] = new Array();
  constructor(private router:ActivatedRoute, private testResultService:TestResultService)
  {
  }

  ngOnInit(): void
  {
    // @ts-ignore
    this.user = JSON.parse( window.sessionStorage.getItem('MCQuser') );
    this.uid = this.router.snapshot.params['uid'];
    this.testResultService.getTestResultByUderId(this.uid)
      .subscribe(
        data=>
        {
          this.testResultList = data;
          console.log(data);
          for(let i = 0; i < data.length; i++)
          {
            if(data[i].points/ data[i].totalPoints >= 0.7)
            {
              this.pass = this.pass + 1;
            }
            else
            {
              this.unpass = this.unpass + 1;
            }
          }

          let gradeDistribution = { 'success': this.pass, 'failed': this.unpass}
          console.log(gradeDistribution);
          const ctx = this.chartRef.nativeElement.getContext('2d');
          new Chart(ctx, {
            type: 'pie',
            data: {
              labels: Object.keys(gradeDistribution),
              datasets: [{
                data: Object.values(gradeDistribution),
                backgroundColor: ['#4CAF50','#FF5722'],
                hoverBackgroundColor: ['#a3d081', '#FF6F61'],
                borderColor: ['#FFFFFF'],
                borderWidth: 2
              }]
            },
            options: {
              responsive: true,
              legend: {
                display: true,
                position: 'right',
                labels: {
                  fontColor: '#333',
                  fontSize: 14,
                  padding: 20
                }
              },
              tooltips: {
                enabled: true,
                backgroundColor: '#FFF',
                titleFontSize: 16,
                titleFontColor: '#333',
                bodyFontColor: '#333',
                bodyFontSize: 14,
                borderColor: '#555',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15
              }
            }
          } as any);
        }
      )
  }
}
