import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SingleCategoryComponent } from './pages/single-category/single-category.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';


const routes: Routes = [
  { path: '', component: HomeComponent, data: { showCategoryNavbar: true } },
  { path: 'category/:category/:id', component: SingleCategoryComponent, data: { showCategoryNavbar: true } },
  { path: 'post/:id', component: SinglePostComponent, data: { showCategoryNavbar: true } },
  { path: 'about', component: AboutUsComponent, data: { showCategoryNavbar: false } },
  { path: 'term-conditions', component: TermsAndConditionsComponent, data: { showCategoryNavbar: false } },
  { path: 'contact', component: ContactUsComponent, data: { showCategoryNavbar: false } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
