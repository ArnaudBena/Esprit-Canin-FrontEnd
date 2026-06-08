import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChienCreateComponent } from './chien-create.component';

describe('ChienCreateComponent', () => {
  let component: ChienCreateComponent;
  let fixture: ComponentFixture<ChienCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChienCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChienCreateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
