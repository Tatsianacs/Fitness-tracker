import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule, MatListModule,
    MatNativeDateModule, MatSidenavModule, MatToolbarModule
} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
    imports: [MatListModule, MatToolbarModule, MatSidenavModule, MatButtonModule, MatCheckboxModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
    exports: [MatListModule, MatToolbarModule, MatSidenavModule, MatButtonModule, MatCheckboxModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule]
})
export class MaterialModule {
}
