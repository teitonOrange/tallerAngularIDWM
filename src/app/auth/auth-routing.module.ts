import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { activateRouteGuard } from './guards/activate-route.guard';

const routes: Routes = [
  {
  path:'home',
  component:HomepageComponent,
  },
  {
  path:'purchase',
  component: PurchaseComponent, canActivate: [activateRouteGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
