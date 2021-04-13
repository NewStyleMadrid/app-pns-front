import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appnewstyle';



  constructor(public uDialog: MatDialog) { }

  /****  METÓDOS PARA CREAR LOS DIÁLOGOS ****/

  // LOGIN
  /*
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
  */

  // REGISTER
  /*
  dialogRegister(): void {
    const dialogRef = this.uDialog.open(RegisterComponent, {
      width: '550px',
      height: '450px'
    });
    console.log("Dialogo registro abierto.");
    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialogo registro cerrado.");
    })
  }
  */
  
}
