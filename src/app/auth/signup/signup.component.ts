import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {UiService} from '../../shared/ui.service';
import {Observable, Subscription} from 'rxjs';
import * as fromRoot from '../../app.reducer';
import {Store} from '@ngrx/store';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    minDate = new Date(2000, 0, 1);
    maxDate = new Date(2020, 0, 1);
    isLoading$: Observable<boolean>;
    private loadingSubs: Subscription;


    constructor(private store: Store<fromRoot.State>, private authService: AuthService, private uiService: UiService) {
    }

    ngOnInit() {
        this.isLoading$ = this.store.select(fromRoot.getIsLoading);
        // this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => this.isLoading = isLoading);
        // this.maxDate = new Date();
        // this.maxDate.setDate(this.maxDate.getFullYear() -  18);
    }

    onSubmit(form: NgForm) {
        this.authService.registerUser({
            email: form.value.email,
            password: form.value.password,
        });
    }

    // ngOnDestroy() {
    //     if (this.loadingSubs) {
    //         this.loadingSubs.unsubscribe();
    //     }
    // }
}
