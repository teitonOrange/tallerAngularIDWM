import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { PerfilEditComponent } from './pages/perfil-edit/perfil-edit.component';
import { authGuard } from './guards/auth.guard';
import { PasswordChangerComponent } from './pages/password-changer/password-changer.component';
import { ListProductComponent } from './admin/pages/list-product/list-product.component';
import { FormsCrudComponent } from './admin/forms/forms-crud/forms-crud.component';
import { CreateProductComponent } from './admin/pages/create-product/create-product.component';
import { EditProductComponent } from './admin/pages/edit-product/edit-product.component';
import { ListUserComponent } from './admin/pages/list-user/list-user.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';

const routes: Routes = [
  {
  path:'home',
  component:HomepageComponent,
  canActivate:[authGuard],
  pathMatch:'full'

},
{
  path:'edit/admin/users',
  component:ListUserComponent,
  canActivate:[authGuard],
  pathMatch:'full'
},
{
  path:'edit/:id',
  component: PerfilEditComponent,
  canActivate:[authGuard],
  pathMatch:'full'


},
{
  path:'edit/:id/password',
  component: PasswordChangerComponent,
  canActivate:[authGuard],
  pathMatch:'full'

},
{
  path:'edit/admin/product',
  component: ListProductComponent,
  canActivate:[authGuard],
  pathMatch:'full'


},
{
  path:'edit/admin/product/add',
  component: CreateProductComponent,
  canActivate:[authGuard],
  pathMatch:'full'


},
{
  path:'edit/admin/product/:id',
  component: EditProductComponent,
  canActivate:[authGuard],
  pathMatch:'full'


},
{
  path:'purchase',
  component: PurchaseComponent,
  canActivate:[authGuard],
  pathMatch:'full'
},
{
  path:'product',
  component:ListProductComponent,
  canActivate:[authGuard],
  pathMatch:'full'
},



{
  path:'',
  redirectTo:'home',
  pathMatch:'full'
},
{
  path:'**',
  redirectTo:'home'
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
