import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeClicksComponent } from './edge-clicks.component';

describe('EdgeClicksComponent', () => {
  let component: EdgeClicksComponent;
  let fixture: ComponentFixture<EdgeClicksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdgeClicksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeClicksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
