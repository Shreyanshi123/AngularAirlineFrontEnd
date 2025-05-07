import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  flights: any = [];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.flights = navigation?.extras.state?.flights || [];
    console.log('Flight Data:', this.flights);
  }


  ngOnInit(): void {
  }

}
