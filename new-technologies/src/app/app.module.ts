import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ArticlePageComponent } from './article-page/article-page.component';
import { CategoryComponent } from './category/category.component';
import { InitializerComponent } from './initializer/initializer.component';
import { IntegrationComponent } from './integration/integration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Interceptor} from "./interceptor/interceptor";
import {DatePipe} from "@angular/common";
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArticlePageComponent,
    CategoryComponent,
    InitializerComponent,
    IntegrationComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatButtonModule,
        MatTabsModule,
        FormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule
    ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
