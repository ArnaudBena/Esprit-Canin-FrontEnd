import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAdherentComponent } from './dashboard-adherent.component';

describe('DashboardAdherentComponent', () => {
  let component: DashboardAdherentComponent;
  let fixture: ComponentFixture<DashboardAdherentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAdherentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardAdherentComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
