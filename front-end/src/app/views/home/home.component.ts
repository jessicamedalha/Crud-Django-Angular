import { Component, OnInit , Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { SharedService } from 'src/app/shared.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ContatosDialogComponent } from './contatos-dialog/contatos-dialog.component';
import { PessoaEditDialogComponent } from './pessoa-edit-dialog/pessoa-edit-dialog.component';


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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(private service:SharedService, public dialog: MatDialog){}

  DataPeopleList:Pessoa[] = []

  ngOnInit(): void{
    this.refreshList();
  }


  openDialog(data: any): void {
    const dialogRef = this.dialog.open(ContatosDialogComponent, {
      data: {telefone: data.telefone, email: data.email, whatsapp: data.whatsapp},
    });
    console.log({telefone: data.telefone, email: data.email, whatsapp: data.whatsapp});
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialogEdit(data:any): void {
    if(data != 'create'){
      const dialogRef = this.dialog.open(PessoaEditDialogComponent,
        {
          data: {nome: data.nome, cpf: data.cpf, contatos:{telefone: data.contatos.telefone,
          whatsapp: data.contatos.whatsapp, email: data.contatos.email}}
        });
      dialogRef.afterClosed().subscribe(result => {
      });
    }
    else{
      const dialogRef = this.dialog.open(PessoaEditDialogComponent,
        {
          data: {nome:'', cpf: '', contatos:{telefone: '',
          whatsapp:'', email: ''}}
        });
      dialogRef.afterClosed().subscribe(result => {
      });

    }

  }

  deletePeople(data: any): void{
    this.service.deletePeopleByCpf(data.cpf).subscribe()
    this.refreshList();
  }

  refreshList(){
    this.service.getListPeople().subscribe(data=>{
      this.DataPeopleList = data;

      this.dataSource = this.DataPeopleList;
      this.displayedColumns = this.columns.map(c => c.columnDef);
    })
  }
  filterByCpf(){
    if(this.cpf.valid){
      this.service.getPeopleByCpf(this.cpf.value).subscribe(data=>{
        this.DataPeopleList = [data];
        console.log(this.DataPeopleList);
  
        this.dataSource = this.DataPeopleList;
        this.displayedColumns = this.columns.map(c => c.columnDef);
      })
    };
    if(this.cpf.value == ''){
     this.refreshList();
    }
  }

  cpf = new FormControl('');

  columns = [
      {
        columnDef: 'id',
        header: '',
        cell: (element: Pessoa) => ``,
      },
      {
        columnDef: 'nome',
        header: 'Nome',
        cell: (element: Pessoa) => `${element.nome}`,
      },
      {
        columnDef: 'cpf',
        header: 'CPF',
        cell: (element: Pessoa) => `${element.cpf}`,
      },
      {
        columnDef: 'contatos',
        header: 'Contatos',
        cell: (element: Pessoa) =>  element.contatos,
      },
      {
        columnDef: 'opcoes',
        header: 'Opções',
        cell: (element: Pessoa) => element,
      },
    ];
    dataSource = this.DataPeopleList;
    displayedColumns = this.columns.map(c => c.columnDef);
}