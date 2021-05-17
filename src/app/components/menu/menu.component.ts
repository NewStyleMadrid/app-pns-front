import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { RegistrarComponent } from 'src/app/auth/registrar/registrar.component';
import { TokenService } from 'src/app/service/token.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLogged = false;
  loggedOut=false;
  userName = '';
  isAdmin = false;
  searchText;

  constructor( private tokenService:TokenService,public uDialog: MatDialog, private router:Router) { }

 
  dialogLogin(): void {
    const dialogRef = this.uDialog.open(LoginComponent, {
      width: '530px',
      height: '610px'
    });
    console.log("Dialogo login abierto.");
    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialogo login cerrado.");
    });
  }

  
  dialogRegistrar(): void {
    const dialogRef = this.uDialog.open(RegistrarComponent, {
      width: '750px',
      height: '460px'
    });
    console.log("Dialogo registro abierto.");
    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialogo registro cerrado.");
    })
  }

  ngOnInit() {
    /*
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    */
    if (this.tokenService.getToken()) {
      this.isLogged = this.tokenService.isLogged();
      this.isAdmin = this.tokenService.isAdmin();
      this.userName=this.tokenService.getUserName();
    }else{
      //this.isLogged = false;
      this.userName='';
    }
  }

  // Cierra sesion
  onLogout(): void {
   this.tokenService.logOut();
    this.isLogged = false;
    this.router.navigate(['/']);
  }
}
