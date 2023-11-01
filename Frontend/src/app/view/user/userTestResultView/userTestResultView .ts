import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-user-test-result-view',
  templateUrl: './userTestResultView .html',
  styleUrls: ['./userTestResultView .css']
})
export class UserTestResultView {
  tests = [
    { id: 1, level: 'Beginner', name: 'Math 101', topic: 'Algebra', finalGrade: 'A' },
    { id: 2, level: 'Intermediate', name: 'Science 201', topic: 'Physics', finalGrade: 'B' },
    { id: 3, level: 'Advanced', name: 'CS 301', topic: 'Computer Science', finalGrade: 'C' },
    { id: 4, level: 'Intermediate', name: 'Biology 201', topic: 'Biology', finalGrade: 'D' },
    { id: 5, level: 'Advanced', name: 'Science 405', topic: 'Data Structure', finalGrade: 'A' },
    { id: 6, level: 'Intermediate', name: 'Science 201', topic: 'Physics Lab', finalGrade: 'F' },
    { id: 7, level: 'Beginner', name: 'Science 101', topic: 'Physics Theory', finalGrade: 'B' },
    // ... more tests
  ];
  gradeDistribution = { 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'F': 0 };

  @ViewChild('gradePieChart') chartRef!: ElementRef;

  ngOnInit() {
    // Initialize grade distribution
    for (const test of this.tests) {
      this.gradeDistribution[test.finalGrade as keyof typeof this.gradeDistribution] = (this.gradeDistribution[test.finalGrade as keyof typeof this.gradeDistribution] || 0) + 1;
    }
  }

  ngAfterViewInit() {
    const ctx = this.chartRef.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(this.gradeDistribution),
        datasets: [{
          data: Object.values(this.gradeDistribution),
          backgroundColor: ['#4CAF50', '#FFC107', '#FF5722', '#9C27B0', '#03A9F4'],
          hoverBackgroundColor: ['#a3d081', '#FFCB69', '#FF6F61', '#AB83A1', '#6BB5CE'],
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
  
}
