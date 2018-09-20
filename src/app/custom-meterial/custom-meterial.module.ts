import { NgModule } from '@angular/core';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatButtonModule,
  MatCardModule, MatChipsModule, MatDialogModule, MatDividerModule,
  MatExpansionModule, MatFormFieldModule, MatGridListModule,
  MatIconModule, MatInputModule,
  MatListModule, MatOptionModule, MatSelectModule,
  MatSidenavModule, MatSnackBarModule, MatTabsModule,
  MatToolbarModule,
  MatButtonToggleModule,
  MatTooltipModule, MatCheckboxModule,
  MatBadgeModule
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
    MatDividerModule,
    MatOptionModule,
    MatTabsModule,
    MatGridListModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatBadgeModule
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
    MatDividerModule,
    MatOptionModule,
    MatTabsModule,
    MatGridListModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatBadgeModule
  ],
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}]
})
export class CustomMeterialModule { }
