

import { NgModule } from '@angular/core';
import {
  MatDialogModule,
  MatInputModule,
  MatProgressBarModule,
  MatSelectModule,
    MatSidenavModule,
  MatSlideToggleModule
} from '@angular/material';

const MATERIAL_MODULES = [
  MatSlideToggleModule,
  MatInputModule,
  MatSelectModule,
  MatDialogModule,
    MatSidenavModule,
  MatProgressBarModule
];

@NgModule({
  imports: MATERIAL_MODULES,
  exports: MATERIAL_MODULES
})
export class MaterialModule {}
