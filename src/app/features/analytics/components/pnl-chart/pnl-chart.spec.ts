import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PnlChart } from './pnl-chart';

describe('PnlChart', () => {
  let component: PnlChart;
  let fixture: ComponentFixture<PnlChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PnlChart],
    }).compileComponents();

    fixture = TestBed.createComponent(PnlChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
