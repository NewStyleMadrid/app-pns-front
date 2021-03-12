import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string = '';
  name: string = '';
  firstname: string = '';
  pwd: string = '';
  email: string = '';

  constructor(private dialogRef: MatDialogRef<RegisterComponent>,
    private uService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  registerUser(): void {
    const user = new User(this.username, this.name, this.firstname, this.pwd, this.email);
    this.uService.saveUser(user).subscribe(
      data => {
        this.toastr.success('Usuario registrado', '', {
          timeOut: 2000,
          positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']); // Una vez creado nos redirige al HOME.
        this.dialogRef.close();
      },
      err => {
        this.toastr.error(err.error.mensaje, '', { // Nos imprime el mensaje escrito en el BACK-END
          timeOut: 2000,
          positionClass: 'toast-top-center'
        });
      });
  }

  closeRegister(): void {
    this.dialogRef.close();
  }

}
