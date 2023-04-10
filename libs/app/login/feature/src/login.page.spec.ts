import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Login } from '@mp/app/login/util';
import { NgxsModule, Store } from '@ngxs/store';

import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([])],
      declarations: [ LoginPage ],
      providers: [ FormBuilder ]
    })
    .compileComponents();

    store = TestBed.inject(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch Login action when loginForm is valid', () => {
    spyOn(store, 'dispatch');
    const email = 'test@example.com';
    const password = 'password';
    component.loginForm.setValue({ email, password });
    component.login();
    expect(store.dispatch).toHaveBeenCalledWith(new Login());
  });

  it('should toggle showPassword variable', () => {
    expect(component.showPassword).toBeFalsy();
    component.toggleShowPassword();
    expect(component.showPassword).toBeTruthy();
  });

  it('should return correct email error message', () => {
    component.loginForm.get('email')?.setValue('invalid-email');
    expect(component.emailError).toBe('Email is invalid');
    component.loginForm.get('email')?.setValue('');
    expect(component.emailError).toBe('Email is required');
    component.loginForm.get('email')?.setValue('a@b.c');
    expect(component.emailError).toBe('Email should be longer than 6 characters');
    component.loginForm.get('email')?.setValue('a'.repeat(65) + '@example.com');
    expect(component.emailError).toBe('Email should be shorter than 64 characters');
  });

  it('should return correct password error message', () => {
    component.loginForm.get('password')?.setValue('');
    expect(component.passwordError).toBe('Password is required');
    component.loginForm.get('password')?.setValue('123');
    expect(component.passwordError).toBe('Password should be longer than 6 characters');
    component.loginForm.get('password')?.setValue('a'.repeat(65));
    expect(component.passwordError).toBe('Password should be shorter than 64 characters');
  });

  /*it('should select busy$ observable with correct value', () => {
    const mockBusy: ActionsExecuting = { actions: [new Login()], count: 1 };
    spyOn(store, 'select').and.returnValue(of(mockBusy));
    component.ngOnInit();
    expect(store.select).toHaveBeenCalledWith(actionsExecuting([Login]));
    expect(component.busy$).toBeTruthy();
    component.busy$.subscribe((busy: ActionsExecuting) => {
      expect(busy).toEqual(mockBusy);
    });*/
});
