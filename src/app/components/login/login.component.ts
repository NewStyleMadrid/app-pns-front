import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
  }

  closeLogin():void{
    this.dialogRef.close();
  }

}
