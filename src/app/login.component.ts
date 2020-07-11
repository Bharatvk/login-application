import { Component } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router'
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html'
})

export class LoginComponent {
  constructor(private fb: FormBuilder, private router: Router){

  }

  userName = new FormControl('');
  password = new FormControl('');
  recaptcha = new FormControl(false)
  failedAttempts = 0;
  userList:any[] = [{
    "user_id": "test1@gmail.com",
    "password": "Apple@321"
  }]
  loginForm: FormGroup = this.fb.group({
    userName: this.userName,
    password:this.password,
    recaptcha:this.recaptcha
  })
  showCaptcha: Boolean = false;

  login(){

    console.log("values", this.loginForm.value.userName, this.loginForm.value.password)
    var filteredArray = this.userList.filter(eachUser=>{
      return eachUser.user_id.toLowerCase() == this.loginForm.value.userName && eachUser.password == this.loginForm.value.password
    })
    console.log("filteredArray", filteredArray);
    if(filteredArray.length > 0){
      console.log("success");
      this.router.navigate(['/documents'])
    } else {
      this.failedAttempts++;
    }

    if(this.failedAttempts > 3){
      this.loginForm.value.recaptcha = true;
      this.showCaptcha =true;
    }
  }
}
