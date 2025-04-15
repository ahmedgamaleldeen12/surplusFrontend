import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../home/footer/footer.component';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-business-home',
  templateUrl: './business-home.component.html',
  styleUrls: ['./business-home.component.scss'],
  imports: [FooterComponent, TableModule],
})
export class BusinessHomeComponent implements OnInit {
  listings: Listing[] = [
    {
      date: '11/11/2022',
      name: 'Fire&Blood',
      brandName: 'George R.R Martin',
      price: 3456,
      status: 'Accepted',
      quantity: 3456,
    },
    {
      date: '22/10/2022',
      name: 'Bridge of clay',
      brandName: 'Markus Suzak',
      price: 2800,
      status: 'Declined',
      quantity: 3456,
    },
    {
      date: '22/05/2022',
      name: 'Do Epic Shit',
      brandName: 'Ankur Warikoo',
      price: 120,
      status: 'Pending',
      quantity: 3456,
    },
    {
      date: '14/07/2020',
      name: "My Sister's Keeper",
      brandName: 'Jodi Picoult',
      price: 15,
      status: 'Pending',
      quantity: 3456,
    },
    {
      date: '12/04/2021',
      name: 'Atomic Habits',
      brandName: 'James Clear',
      price: 33983,
      status: 'Accepted',
      quantity: 3456,
    },
    {
      date: '02/02/2022',
      name: 'Dune',
      brandName: 'Frank Herbert',
      price: 11832,
      status: 'Declined',
      quantity: 3456,
    },
  ];

  constructor() {}

  ngOnInit() {}
}
export interface Listing {
  date: string;
  name: string;
  brandName: string;
  price: number;
  status: string;
  quantity: number;
}
