import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule, DropdownChangeEvent } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-paginator',
  templateUrl: './custom-paginator.component.html',
  standalone: true,
  imports: [PaginatorModule, DropdownModule, FormsModule],
  styleUrls: ['./custom-paginator.component.css'],
})
export class CustomPaginatorComponent {
  @Input() total: number = 0;
  @Input() per_page: number = 5;
  @Input() page: number = 1;

  @Output() itemsPerPageChanged = new EventEmitter<number>();
  @Output() pageIndexChanged = new EventEmitter<number>();

  itemsPerPageOptions = [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '15', value: 15 },
    { label: '20', value: 20 },
    { label: '20', value: 20 },
  ];

  onPageIndexChange(event: any) {
    this.pageIndexChanged.emit(event.page + 1);
  }

  onItemsPerPageChanged(event: DropdownChangeEvent) {
    this.itemsPerPageChanged.emit(event.value);
  }

  calculateDisplayedItems(): number {
    return this.per_page > this.total ? this.total : this.per_page;
  }
}
