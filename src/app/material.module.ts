import {NgModule} from '@angular/core';
import {
    MatButtonModule, MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule, MatListModule,
    MatNativeDateModule, MatSidenavModule, MatTabsModule, MatToolbarModule
} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
    imports: [MatCardModule, MatTabsModule, MatListModule, MatToolbarModule, MatSidenavModule, MatButtonModule, MatCheckboxModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
    exports: [MatCardModule, MatTabsModule, MatListModule, MatToolbarModule, MatSidenavModule, MatButtonModule, MatCheckboxModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule]
})
export class MaterialModule {
}
