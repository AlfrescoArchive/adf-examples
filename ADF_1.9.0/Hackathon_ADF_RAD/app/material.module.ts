

import { NgModule } from '@angular/core';
import {
  MdDialogModule,
  MdInputModule,
  MdProgressBarModule,
  MdSelectModule,
    MdSidenavModule,
  MdSlideToggleModule
} from '@angular/material';

const MATERIAL_MODULES = [
  MdSlideToggleModule,
  MdInputModule,
  MdSelectModule,
  MdDialogModule,
    MdSidenavModule,
  MdProgressBarModule
];

@NgModule({
  imports: MATERIAL_MODULES,
  exports: MATERIAL_MODULES
})
export class MaterialModule {}
