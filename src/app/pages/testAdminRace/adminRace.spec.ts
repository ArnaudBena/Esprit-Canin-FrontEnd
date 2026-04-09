import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRace } from './adminRace';

describe('AdminRace', () => {
  let component: AdminRace;
  let fixture: ComponentFixture<AdminRace>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRace],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminRace);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
