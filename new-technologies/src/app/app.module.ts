import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http'
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
import { ModalNewsComponent } from './modal-news/modal-news.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArticlePageComponent,
    CategoryComponent,
    InitializerComponent,
    IntegrationComponent,
    ModalNewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
