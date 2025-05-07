import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BookingComponent } from './booking/booking.component';
import { HistoryComponent } from './history/history.component';
import { ManageComponent } from './manage/manage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { CouponsComponent } from './coupons/coupons.component';
import { SearchComponent } from './search/search.component';



const routes: Routes = [{ path: '', component: LoginComponent },
{ path: 'home', component: HomeComponent },
{path:'search',component:SearchComponent},
{ path: 'home/booking', component: BookingComponent },
{ path: 'home/booking/history', component: HistoryComponent},
{ path: 'home/booking/manage', component: ManageComponent },
{ path: 'dashboard', component: DashboardComponent },
{ path: 'dashboard/schedule', component: ScheduleComponent },
{ path: 'dashboard/coupon', component: CouponsComponent }
]

@NgModule({
  imports: [
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }