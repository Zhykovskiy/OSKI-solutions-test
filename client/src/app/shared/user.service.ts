import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly baseUrl = "https://localhost:7035/";

  constructor(private _fb:FormBuilder, private _http:HttpClient) { }

  public formModel = this._fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    Passwords: this._fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    },{validators: this.comparePasswords})
  });

  comparePasswords(_fb:FormGroup) {
    let confirmPasswordCtrl = _fb.get('ConfirmPassword');
    
    if(confirmPasswordCtrl?.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors) {
      if(_fb.get('Password')?.value != confirmPasswordCtrl?.value) {
        confirmPasswordCtrl?.setErrors({passwordMismatch:true});
      } 
      else {
        confirmPasswordCtrl?.setErrors(null);
      }
    }
  }

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      Password: this.formModel.value.Passwords.Password
    };
    
    console.log("reg");
    return this._http.post(this.baseUrl + "api/AppUser/Register", body)
  }
}
