import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IntegrationComponent} from './integration/integration.component';
import {ArticlePageComponent} from "./article-page/article-page.component";


const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "int", component: IntegrationComponent},
  { path: "article/:id", component: ArticlePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
