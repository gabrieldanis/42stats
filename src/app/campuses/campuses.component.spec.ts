import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusesComponent } from './campuses.component';

describe('CampusesComponent', () => {
  let component: CampusesComponent;
  let fixture: ComponentFixture<CampusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampusesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
