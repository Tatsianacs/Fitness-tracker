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
    MatOptionModule, MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule, MatSortModule, MatTableModule,
    MatTabsModule,
    MatToolbarModule
} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
    imports: [MatPaginatorModule, MatSortModule, MatTableModule, MatDialogModule, MatProgressSpinnerModule, MatSelectModule, MatOptionModule, MatCardModule, MatTabsModule, MatListModule, MatToolbarModule, MatSidenavModule, MatButtonModule, MatCheckboxModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
    exports: [MatPaginatorModule, MatSortModule, MatTableModule, MatDialogModule, MatProgressSpinnerModule, MatSelectModule, MatOptionModule, MatCardModule, MatTabsModule, MatListModule, MatToolbarModule, MatSidenavModule, MatButtonModule, MatCheckboxModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule]
})
export class MaterialModule {
    private static MatFilterModule: any;
}
