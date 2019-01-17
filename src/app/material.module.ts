import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule
} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
    imports: [MatDialogModule, MatProgressSpinnerModule, MatSelectModule, MatOptionModule, MatCardModule, MatTabsModule, MatListModule, MatToolbarModule, MatSidenavModule, MatButtonModule, MatCheckboxModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
    exports: [MatDialogModule, MatProgressSpinnerModule, MatSelectModule, MatOptionModule, MatCardModule, MatTabsModule, MatListModule, MatToolbarModule, MatSidenavModule, MatButtonModule, MatCheckboxModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule]
})
export class MaterialModule {
}
