import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhrentNavbarComponent } from './adherent-navbar.component';

describe('AdhrentNavbarComponent', () => {
  let component: AdhrentNavbarComponent;
  let fixture: ComponentFixture<AdhrentNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdhrentNavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdhrentNavbarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
