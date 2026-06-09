import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdherentLayoutComponent } from './adherent-layout.component';

describe('AdherentLayoutComponent', () => {
  let component: AdherentLayoutComponent;
  let fixture: ComponentFixture<AdherentLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdherentLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdherentLayoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
