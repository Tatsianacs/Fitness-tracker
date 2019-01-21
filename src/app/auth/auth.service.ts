import {User} from './user.model';
import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable()
export class AuthService {
    private isAuthenticated = false;
    authChange = new Subject<boolean>();

    constructor(private router: Router, private afAuth: AngularFireAuth) {

    }

    registerUser(authData: AuthData) {
        // this.user = {
        //     email: authData.email,
        //     userId: Math.round(Math.random() * 10000).toString()
        // };
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log(result);
                this.authSuccessfully();
            })
            .catch(err => console.log(err));

    }

    login(authData: AuthData) {
        // this.user = {
        //     email: authData.email,
        //     userId: Math.round(Math.random() * 10000).toString()
        // };
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                   this.authSuccessfully();
            })
            .catch(error => console.log(error));
    }

    logout() {
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['login']);
    }


    isAuth() {
        return this.isAuthenticated;
    }

    private authSuccessfully() {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['training']);
    }
}
