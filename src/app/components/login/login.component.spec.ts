import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: HTMLElement;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change data when input username change', async () => {
    let el: DebugElement = fixture.debugElement.query(By.css('#username'));
    el.nativeElement.value = 'test Data';
    el.nativeElement.dispatchEvent(new Event('input'));
    // expect(component.searchTitle).toBe('test Data');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges(); 
      console.log('sendInput: ', el.nativeElement.value);
      console.log('loginForm:', component.loginForm.value['username']);
      expect(component.loginForm.value['username']).toBe('test Data');
    });
    // expect(component.onSearchTitleChange).toHaveBeenCalled();
  })

  it('should change data when input password change', async () => {
    let el: DebugElement = fixture.debugElement.query(By.css('#password'));
    el.nativeElement.value = 'test Data';
    el.nativeElement.dispatchEvent(new Event('input'));
    // expect(component.searchTitle).toBe('test Data');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges(); 
      console.log('sendInput: ', el.nativeElement.value);
      console.log('loginForm:', component.loginForm.value['password']);
      expect(component.loginForm.value['password']).toBe('test Data');
    });
    // expect(component.onSearchTitleChange).toHaveBeenCalled();
  })

  it('should call submit method', async() => {
    fixture.detectChanges(); 
    spyOn(component, 'onLogin');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.onLogin).toHaveBeenCalled();
  })

  it('should call through ngOninit',async () => {
    fixture.detectChanges();
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  })

  it('should call through onLogin',async () => {
    fixture.detectChanges();
    spyOn(component, 'onLogin').and.callThrough();
    component.onLogin();
    expect(component.onLogin).toHaveBeenCalled();
  })

  it('should be invalid form',async () => {
    component.loginForm.setValue({
      username: '',
      password: ''
    });
    expect(component.loginForm.valid).toBeFalsy();
  })

  it('should be valid form',async () => {
    component.loginForm.setValue({
      username: 'minhpt@nashtechglobal.com',
      password: '12345678'
    });
    expect(component.loginForm.valid).toBeTruthy();
  })

  it('should show SIGN IN', async() => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.debugElement.componentInstance;
    console.log(app);
    expect(app.title).toEqual('SIGN IN');
  })
});
