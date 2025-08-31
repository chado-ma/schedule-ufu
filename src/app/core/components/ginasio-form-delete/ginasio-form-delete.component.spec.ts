import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinasioFormDeleteComponent } from './ginasio-form-delete.component';

describe('GinasioFormDeleteComponent', () => {
  let component: GinasioFormDeleteComponent;
  let fixture: ComponentFixture<GinasioFormDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GinasioFormDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GinasioFormDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
