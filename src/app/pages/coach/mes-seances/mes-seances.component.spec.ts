import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesSeancesComponent } from './mes-seances.component';

describe('MesSeancesComponent', () => {
  let component: MesSeancesComponent;
  let fixture: ComponentFixture<MesSeancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesSeancesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MesSeancesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
