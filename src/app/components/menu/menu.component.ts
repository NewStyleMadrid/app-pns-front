import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { RegisterComponent } from 'src/app/auth/register/register.component';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLogged=false;

  constructor( private tokenService:TokenService,public uDialog: MatDialog) { }

  /** Dialogo del LOGIN **/
  dialogLogin(): void {
    const dialogRef = this.uDialog.open(LoginComponent, {
      width: '510px',
      height: '590px'
    });
    console.log("Dialogo login abierto.");
    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialogo login cerrado.");
    })
  }

  /** Dialogo del REGISTER **/
  dialogRegister(): void {
    const dialogRef = this.uDialog.open(RegisterComponent, {
      width: '660px',
      height: '530px'
    });
    console.log("Dialogo registro abierto.");
    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialogo registro cerrado.");
    })
  }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }
 
}
