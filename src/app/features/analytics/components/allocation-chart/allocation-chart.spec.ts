import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationChart } from './allocation-chart';

describe('AllocationChart', () => {
  let component: AllocationChart;
  let fixture: ComponentFixture<AllocationChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllocationChart],
    }).compileComponents();

    fixture = TestBed.createComponent(AllocationChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
