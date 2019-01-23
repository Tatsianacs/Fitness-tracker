import {Subject} from 'rxjs';
import {SnackbarComponent} from '../snackbar.component';
import {MatSnackBar} from '@angular/material';
import {Injectable} from '@angular/core';

@Injectable()
export class UiService {
    loadingStateChanged = new Subject<boolean>();

    constructor(private snackbar: MatSnackBar) {}

    showSnackBar(message) {
        this.snackbar.openFromComponent(SnackbarComponent, {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'background-red',
            data: {
                error: message,
            }
        });
    }


}
