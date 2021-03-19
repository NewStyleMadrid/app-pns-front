import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HomeComponent } from 'src/app/components/home/home.component';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup;
  errMsj: string;
  isLogged = false;

  // Expresion regular para el email
  private exEmail: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  get nombre() { return this.myForm.get('nombre'); }
  get apellidos() { return this.myForm.get('apellidos'); }
  get username() { return this.myForm.get('username'); }
  get email() { return this.myForm.get('email'); }
  get password() { return this.myForm.get('password'); }

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private dRef:MatDialogRef<HomeComponent>
  ) { this.myForm = this.createForm(); }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  // Validaciones para los campos de registro.
  createForm() {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.exEmail)]),
      password: new FormControl('', [Validators.required])
    });
  }

  onRegister(): void {
    if (this.myForm.valid) {
      this.authService.register(this.myForm.value).subscribe(
        data => {
          this.dRef.close(); // Cierra el Dialogo
          this.toastr.success('Usuario registrado', ' ', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.router.navigate(['/']); // Me lleva al home principal
        },
        err => {
          this.errMsj = err.error.mensaje;
          this.toastr.error(this.errMsj, ' ', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          // console.log(err.error.message);
        });
    }
  }

  // Resetea el formulario
  onResetForm(): void {
    this.myForm.reset();
  }

  onCancel():void{
    this.router.navigate(['/'])
  }
}
