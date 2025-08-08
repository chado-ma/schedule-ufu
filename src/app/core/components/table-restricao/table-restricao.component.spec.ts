import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRestricaoComponent } from './table-restricao.component';

describe('TableRestricaoComponent', () => {
  let component: TableRestricaoComponent;
  let fixture: ComponentFixture<TableRestricaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableRestricaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableRestricaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
