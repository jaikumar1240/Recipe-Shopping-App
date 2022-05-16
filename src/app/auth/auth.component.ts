import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObservable : Observable<AuthResponseData>
    this.isLoading = true;
    if(this.isLoginMode){
     authObservable = this.authService.login(email, password)
    }else{
     authObservable = this.authService.signUp(email, password)
    }
    authObservable.subscribe(res=>{
      console.log(res);
      this.isLoading = false;
      this.error = null;
      this.router.navigate(['/recipe']);
    },errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
      this.isLoading = false;
    })
    form.reset();
  }
  onHandleError(){
    this.error = null;
  }
}
