import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatewiseComponent } from './datewise/datewise.component';
import { NavigationComponent } from './navigation/navigation.component';


const routes: Routes = [
  {
    path:"",
    component:NavigationComponent
  },
  {
    path:"datewise",
    component:DatewiseComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
