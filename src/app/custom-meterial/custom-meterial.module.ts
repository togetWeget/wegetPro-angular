import { NgModule } from '@angular/core';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatButtonModule,
  MatCardModule, MatChipsModule, MatDialogModule, MatDividerModule,
  MatExpansionModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatSidenavModule, MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';


@NgModule({
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatChipsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    MatDividerModule
  ],
  declarations: [],
  exports: [
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatChipsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    MatDividerModule
  ],
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}]
})
export class CustomMeterialModule { }
