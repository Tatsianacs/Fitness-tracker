import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {TrainingService} from '../training/training.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {SnackbarComponent} from '../snackbar.component';
import {UiService} from '../shared/ui.service';

@Injectable()
export class AuthService {
    private isAuthenticated = false;
    authChange = new Subject<boolean>();


    constructor(private uiService: UiService, private snackBar: MatSnackBar, private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService) {

    }

    registerUser(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        // this.user = {
        //     email: authData.email,
        //     userId: Math.round(Math.random() * 10000).toString()
        // };
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                this.uiService.loadingStateChanged.next(false);
                console.log(result);
            })
            .catch(error => {
                this.uiService.loadingStateChanged.next(false);
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
        this.uiService.loadingStateChanged.next(true);
        // this.user = {
        //     email: authData.email,
        //     userId: Math.round(Math.random() * 10000).toString()
        // };
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                this.uiService.loadingStateChanged.next(false);
            })
            .catch(error => {
                this.uiService.loadingStateChanged.next(false);
                // this.snackBar.open(error.message, 'CLOSE', {
                //   duration: 5000,
                //   verticalPosition: 'top',
                //   horizontalPosition: 'center',
                //   panelClass: 'background-red'
                // });
                this.uiService.showSnackBar(error);
            //     this.snackBar.openFromComponent(SnackbarComponent, {
            //         duration: 5000,
            //         horizontalPosition: 'center',
            //         verticalPosition: 'top',
            //         panelClass: 'background-red',
            //         data: {
            //             error: error,
            //         }
            //     });
            //
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
