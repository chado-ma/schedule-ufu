import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinasioFormComponent } from './ginasio-form.component';

describe('GinasioFormComponent', () => {
  let component: GinasioFormComponent;
  let fixture: ComponentFixture<GinasioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GinasioFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GinasioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
