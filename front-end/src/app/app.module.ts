import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './views/home/home.component';

import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatListModule} from '@angular/material/list'; 
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';  
import {MatTableModule} from '@angular/material/table'; 
import {MatDialogModule} from '@angular/material/dialog'; 
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SharedService } from './shared.service';
import { HttpClientModule } from '@angular/common/http';
import { ContatosDialogComponent } from './views/home/contatos-dialog/contatos-dialog.component';
import { PessoaEditDialogComponent } from './views/home/pessoa-edit-dialog/pessoa-edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContatosDialogComponent,
    PessoaEditDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
