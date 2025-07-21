import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailCodeSendComponent } from './email-code-send.component';

describe('EmailCodeSendComponent', () => {
  let component: EmailCodeSendComponent;
  let fixture: ComponentFixture<EmailCodeSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailCodeSendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailCodeSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
