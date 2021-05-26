import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MtbComponent } from './mtb/mtb.component';

const routes: Routes = [{path:'',component:MtbComponent,pathMatch:'full'},{path:'**',redirectTo:''}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
