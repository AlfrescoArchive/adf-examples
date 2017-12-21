import { NgModule } from '@angular/core';

// ADF modules
import { ProcessModule } from '@alfresco/adf-process-services';
import { CoreModule } from '@alfresco/adf-core';

export function modules() {
  return [
      CoreModule,
      ProcessModule,
  ];
}

@NgModule({
  imports: modules(),
  exports: modules()
})
export class AdfModule {}
