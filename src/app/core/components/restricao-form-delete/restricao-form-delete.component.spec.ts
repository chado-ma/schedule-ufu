import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestricaoFormDeleteComponent } from './restricao-form-delete.component';

describe('RestricaoFormDeleteComponent', () => {
  let component: RestricaoFormDeleteComponent;
  let fixture: ComponentFixture<RestricaoFormDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestricaoFormDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestricaoFormDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
