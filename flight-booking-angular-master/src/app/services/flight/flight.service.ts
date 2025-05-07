import { Injectable } from '@angular/core';
import { Observable,throwError  } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Airline } from '../../model/airline.model';
import { Coupon } from '../../model/coupon.model';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../auth/authentication.service';
import { tap,catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private baseUrl = 'https://localhost:7261/api/Flights';
  token: any;
  username: any;
  constructor(private http: HttpClient, private authService: AuthenticationService) { }
  searchFlight(from: string, to: string, departureDate: string): Observable<any> {
    // Ensure the date format matches backend expectations
    const formattedDate = departureDate.split("T")[0];

    const params = new HttpParams()
      .set('from', from)
      .set('to', to)
      .set('date', formattedDate);

    console.log("Requesting flights from:", `${this.baseUrl}/search`);
    console.log("Params:", params.toString());

    return this.http.get(`${this.baseUrl}/search`, { params }).pipe(
      tap(response => {
        console.log("API Response in FlightService:", response);
      }),
      catchError(error => {
        console.error("API Call Failed:", error);
        return throwError(error);
      })
    );
  }

  deleteFlightSchedule(flightId: number): Observable<any> {
    const url = `${this.baseUrl}/delete/${flightId}`;
    console.log("Deleting flight schedule:", url);

    return this.http.delete(url).pipe(
      catchError(error => {
        console.error("API Call Failed:", error);
        return throwError(error);
      })
    );
  }

  saveTravellerDetails(traveller: any) {
    this.username = this.authService.getData('username');
    let params = new HttpParams();
    params = params.append('username', this.username);
    return this.http.post(`${this.baseUrl}/traveller?${params}`, traveller[0]);
  }

  confirmBookingDetails(booking:any){
    this.username = this.authService.getData('username');
    let params = new HttpParams();
    params = params.append('username', this.username);
    return this.http.post(`${this.baseUrl}/booking/flight?${params}`, booking);
  }

  getBookingHistory(){
    this.username = this.authService.getData('username');
    let params = new HttpParams();
    params = params.append('username', this.username);
    return this.http.get(`${this.baseUrl}/booking/history`, { params: params });
  }

  checkDate(date:any){
    let params = new HttpParams();
    params = params.append('depatureDate', date);
    return this.http.get(`${this.baseUrl}/check/cancel`, { params: params });

  }

  cancelBookedFlight(pnrNumber:string){
    return this.http.get(`${this.baseUrl}/booking/cancel/${pnrNumber}`);
  }

  getFlightCoupon() {
    return this.http.get<Coupon>(`http://ec2-3-15-182-227.us-east-2.compute.amazonaws.com:8762/api/admin/list`);
  }

  saveAirlineDetails(airlineDetails: Airline) {
    let header = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + this.authService.getData("authToken") || '')
      .set('Access-Control-Allow-Origin', '*');
    this.token = this.authService.getData('authToken');
    console.log(airlineDetails);
    return this.http.post(`${this.baseUrl}`, airlineDetails, { headers: header });
  }

 


}
