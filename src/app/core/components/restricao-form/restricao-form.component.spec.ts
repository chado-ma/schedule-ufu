import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestricaoFormComponent } from './restricao-form.component';

describe('RestricaoFormComponent', () => {
  let component: RestricaoFormComponent;
  let fixture: ComponentFixture<RestricaoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestricaoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestricaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
