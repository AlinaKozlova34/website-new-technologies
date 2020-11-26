import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IntegrationComponent} from './integration/integration.component';


const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "int", component: IntegrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
