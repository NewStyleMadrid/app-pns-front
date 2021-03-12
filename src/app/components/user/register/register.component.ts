import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<RegisterComponent>) { }

  ngOnInit(): void {
  }

  closeRegister(): void{
    this.dialogRef.close();
  }
}
