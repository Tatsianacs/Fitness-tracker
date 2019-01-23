import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material';

@Component({
    selector: 'snack-bar-component',
    templateUrl: './snackbar.component.html',
    styles: [`
      .sbackbar-warning {
        background-color: red;
        color: white;
      }

      .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    `],
})
export class SnackbarComponent {


    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, private snackBarRef: MatSnackBarRef<SnackbarComponent>) {
    }

    onClose() {
        this.snackBarRef.dismissWithAction();
    }
}
