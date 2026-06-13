import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesChiensComponent } from './mes-chiens.component';

describe('MesChiensComponent', () => {
  let component: MesChiensComponent;
  let fixture: ComponentFixture<MesChiensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesChiensComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MesChiensComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
