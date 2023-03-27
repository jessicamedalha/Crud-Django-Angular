import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface Contatos{
  telefone: string;
  email: string;
  whatsapp: string;
}

@Component({
  selector: 'app-contatos-dialog',
  templateUrl: './contatos-dialog.component.html',
  styleUrls: ['./contatos-dialog.component.scss']
})
export class ContatosDialogComponent implements OnInit{
  
  constructor( public dialogRef: MatDialogRef<ContatosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contatos,){

  }

  ngOnInit(): void {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
