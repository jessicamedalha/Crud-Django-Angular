import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { SharedService } from 'src/app/shared.service';

export interface Contatos{
  telefone: string;
  email: string;
  whatsapp: string;
}
export interface Pessoa{
  nome: string;
  cpf: string;
  contatos: Contatos;
}

@Component({
  selector: 'app-pessoa-edit-dialog',
  templateUrl: './pessoa-edit-dialog.component.html',
  styleUrls: ['./pessoa-edit-dialog.component.scss']
})
export class PessoaEditDialogComponent implements OnInit{

  form = this.fb.group({
    nome:[this.data.nome, [Validators.required]],
    cpf:[this.data.cpf, [Validators.required]],
    contatos: this.fb.group({
      telefone:[this.data.contatos.telefone, [Validators.required]],
      whatsapp:[this.data.contatos.whatsapp, [Validators.required]],
      email:[this.data.contatos.email, [Validators.required]]
    })
  });

  constructor( public dialogRef: MatDialogRef<PessoaEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pessoa, private fb: FormBuilder,
    private service:SharedService){
  }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createPeople(data:any){
    console.log('creat');
    data = {
      nome: this.form.value.nome,
      cpf: this.form.value.cpf,
      contatos:[{
        telefone: this.form.value.contatos?.telefone,
        email: this.form.value.contatos?.email,
        whatsapp: this.form.value.contatos?.whatsapp
      }]
    }
    console.log(data);
    this.service.addPeople(data).subscribe();
  }

  editPeople(data: any){
    data = {
      nome: this.form.value.nome,
      cpf: this.form.value.cpf,
      contatos:{
        telefone: this.form.value.contatos?.telefone,
        email: this.form.value.contatos?.email,
        whatsapp: this.form.value.contatos?.whatsapp
      }
    }
    this.service.updatePeopleByCpf(data, data.cpf).subscribe();
  }

  saveClick(): void {
    if(this.data.nome == ''){
      if(this.form.valid){
        this.createPeople(this.form.value);
  
      };
    }
    else{
      this.editPeople(this.form.value);
    };

    
  }

}
