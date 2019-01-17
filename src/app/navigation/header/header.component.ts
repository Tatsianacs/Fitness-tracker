import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    @Output() sidenavToggle = new EventEmitter<void>();
    isAuth: boolean;
    authSubcription: Subscription;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        this.authSubcription = this.authService.authChange.subscribe(authStatus => {
            this.isAuth = authStatus;
        });
    }

    onToggle() {
        this.sidenavToggle.emit();
    }

    ngOnDestroy() {
        this.authSubcription.unsubscribe();
    }
}
