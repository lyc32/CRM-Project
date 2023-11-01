import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTestResultView } from './userTestResultView ';

describe('UserTestResultViewComponent', () => {
  let component: UserTestResultView;
  let fixture: ComponentFixture<UserTestResultView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTestResultView ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTestResultView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
