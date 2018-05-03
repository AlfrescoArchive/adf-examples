import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// ADF modules
import { AdfModule } from './adf.module';

// Custom stencils
import { StencilsModule } from './stencils.module';

// App components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppsComponent } from './apps/apps.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { DocumentlistComponent } from './documentlist/documentlist.component';
import { StartProcessComponent } from './start-process/start-process.component';
import { appRoutes } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes // ,
      // { enableTracing: true } // <-- debugging purposes only
    ),

    // ADF modules
    AdfModule,

    StencilsModule
  ],
  declarations: [
    AppComponent,
    AppsComponent,
    HomeComponent,
    LoginComponent,
    TasksComponent,
    TaskDetailsComponent,
    DocumentlistComponent,
    StartProcessComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
