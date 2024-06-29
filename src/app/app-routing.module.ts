import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseComponent } from './auth/components/purchase/purchase.component';
import { activateRouteGuard } from './auth/guards/activate-route.guard';

const routes: Routes = [
  { path: '', redirectTo: '/purchase', pathMatch: 'full' },
  // { path: 'products', component: ProductListComponent },
  // { path: 'products/:id', component: ProductDetailComponent },
  { path: 'purchase', component: PurchaseComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
