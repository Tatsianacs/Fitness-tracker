import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthData} from '../auth-data.model';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    minDate = new Date(2000, 0, 1);
    maxDate = new Date(2020, 0, 1);

  constructor(private authService: AuthService) { }

  ngOnInit() {
      // this.maxDate = new Date();
      // this.maxDate.setDate(this.maxDate.getFullYear() -  18);
  }

  onSubmit(form: NgForm) {
      this.authService.registerUser({
          email: form.value.email,
          password: form.value.password,
      });
  }
}
