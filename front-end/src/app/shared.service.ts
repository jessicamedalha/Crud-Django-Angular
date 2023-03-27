import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';

export interface Contatos{
  telefone: string;
  email: string;
  whatsapp: string;
}
export interface Objeto{
  nome: string;
  cpf: string;
  contatos: Contatos;
}

export interface ObjetoPayload {
data: Objeto[];
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "http://127.0.0.1:8000"

  constructor(private http:HttpClient) { }

  getListPeople():Observable<Objeto[]>{
    return this.http.get<ObjetoPayload>(this.APIUrl + '/pessoa-api/').pipe(map((res: ObjetoPayload) => res.data));
    
  }

  addPeople(val:any){
    console.log("teste");
    console.log(this.http.post(this.APIUrl + '/pessoa-api/', val).pipe(take(1)));
    return this.http.post(this.APIUrl + '/pessoa-api/', val).pipe();
  }

  updatePeopleByCpf(val:any, cpf:any){
    return this.http.patch(this.APIUrl + '/filter-pessoa-api/' + cpf, val).pipe(take(1));
  }

  getPeopleByCpf(cpf:any):Observable<any>{
    return this.http.get<any>(this.APIUrl + '/filter-pessoa-api/' + cpf).pipe(map((res: ObjetoPayload) => res.data));
  }

  deletePeopleByCpf(cpf:any){
    return this.http.delete(this.APIUrl + '/filter-pessoa-api/' + cpf);
  }
  
}
