import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaEditDialogComponent } from './pessoa-edit-dialog.component';

describe('PessoaEditDialogComponent', () => {
  let component: PessoaEditDialogComponent;
  let fixture: ComponentFixture<PessoaEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PessoaEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoaEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
