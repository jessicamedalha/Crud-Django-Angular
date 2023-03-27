import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatosDialogComponent } from './contatos-dialog.component';

describe('ContatosDialogComponent', () => {
  let component: ContatosDialogComponent;
  let fixture: ComponentFixture<ContatosDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContatosDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContatosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
