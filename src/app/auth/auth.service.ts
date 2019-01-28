import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {TrainingService} from '../training/training.service';
import {MatSnackBar} from '@angular/material';
import {UiService} from '../shared/ui.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';

@Injectable()
export class AuthService {
    private isAuthenticated = false;
    authChange = new Subject<boolean>();


    constructor(private store: Store<{ui: fromRoot.State}>, private uiService: UiService, private snackBar: MatSnackBar, private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService) {

    }

    registerUser(authData: AuthData) {
        // this.uiService.loadingStateChanged.next(true);
        // this.store.dispatch({type: 'START_LOADING'});
        this.store.dispatch(new UI.StartLoading())
        // this.user = {
        //     email: authData.email,
        //     userId: Math.round(Math.random() * 10000).toString()
        // };
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                // this.uiService.loadingStateChanged.next(false);
                // this.store.dispatch({type: 'STOP_LOADING'});
                this.store.dispatch(new UI.StopLoading());
                sessionStorage.setItem('userId', result.user.uid);
            })
            .catch(error => {
                // this.uiService.loadingStateChanged.next(false);
                // this.store.dispatch({type: 'STOP_LOADING'});
                this.store.dispatch(new UI.StopLoading());
                // const config = new MatSnackBarConfig();
                // config.panelClass = ['background-red'];
                // config.duration = 5000;
                // this.snackBar.open(error.message, 'CLOSE', config);
                // });
                this.uiService.showSnackBar(error);
            });

    }

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['training']);
            } else {
                this.trainingService.cancelSubscriptions();
                this.authChange.next(false);
                this.router.navigate(['login']);
                this.isAuthenticated = false;
            }
        });
    }

    login(authData: AuthData) {
        // this.uiService.loadingStateChanged.next(true);
        // this.store.dispatch({type: 'START_LOADING'});
        this.store.dispatch(new UI.StartLoading());
        // this.user = {
        //     email: authData.email,
        //     userId: Math.round(Math.random() * 10000).toString()
        // };
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                sessionStorage.setItem('userId', result.user.uid);
                // this.uiService.loadingStateChanged.next(false);
                this.store.dispatch(new UI.StopLoading());
                // this.store.dispatch({type: 'STOP_LOADING'});
            })
            .catch(error => {
                // this.uiService.loadingStateChanged.next(false);
                // this.store.dispatch({type: 'STOP_LOADING'});
                this.store.dispatch(new UI.StopLoading());
                this.uiService.showSnackBar(error);
            });
    }

    logout() {
        // this.trainingService.cancelSubscriptions();
        this.afAuth.auth.signOut();
        // this.authChange.next(false);
        // this.router.navigate(['login']);
        // this.isAuthenticated = false;
    }


    isAuth() {
        return this.isAuthenticated;
    }

    // private authSuccessfully() {
    //     this.isAuthenticated = true;
    //     this.authChange.next(true);
    //     this.router.navigate(['training']);
    // }


}
