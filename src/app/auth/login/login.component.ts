import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {UiService} from '../../shared/ui.service';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    // isLoading = false;
    isLoading$: Observable<boolean>;
    private loadingSubsc: Subscription;

    constructor(private store: Store<{ui: fromApp.State}>, private authService: AuthService, private uiService: UiService) {
    }

    ngOnInit() {
        // this.store.subscribe(data => console.log(data));
        this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));

        // this.loadingSubsc = this.uiService.loadingStateChanged.subscribe(isLoading => this.isLoading = isLoading);
        this.loginForm = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, Validators.required)
        });
    }

    onSubmit() {
        this.authService.login({
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        });
    }

    get email() {
        return this.loginForm.get('email');

    }

    get password() {
        return this.loginForm.get('password');
    }

    // ngOnDestroy() {
    //     if (this.loadingSubsc) {
    //         this.loadingSubsc.unsubscribe();
    //     }
    // }
}
