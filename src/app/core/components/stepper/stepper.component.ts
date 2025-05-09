import { Component, Input, OnInit } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { CdkStepperModule } from '@angular/cdk/stepper';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule, CdkStepperModule],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [{ provide: CdkStepper, useExisting: StepperComponent }]
})
export class StepperComponent extends CdkStepper implements OnInit {
  @Input() linearModeSelected!: boolean;

  ngOnInit(): void {
    this.linear = this.linearModeSelected;
  }

  onClick(index: number): void {
    this.selectedIndex = index;
  }
}
