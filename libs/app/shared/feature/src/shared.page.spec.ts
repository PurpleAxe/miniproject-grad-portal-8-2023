import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedPageComponent } from './shared.page';

describe('SharedPage', () => {
  let component: SharedPageComponent;
  let fixture: ComponentFixture<SharedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SharedPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
