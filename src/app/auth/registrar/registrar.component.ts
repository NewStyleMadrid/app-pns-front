import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HomeComponent } from 'src/app/components/home/home.component';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario';
import { AuthService } from 'src/app/service/auth.service';



@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  isRegister = false;
  isRegisterFail = false;
  errMsj = '';
  myForm: FormGroup;
  private usuario: any = {};

  // Expresión regular para el formulario de registro.
  private exEmail: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  get nombre() { return this.myForm.get('nombre'); }
  get apellidos() { return this.myForm.get('apellidos'); }
  get userName() { return this.myForm.get('userName'); }
  get password() { return this.myForm.get('password'); }
  get email() { return this.myForm.get('email'); }

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private dRef: MatDialogRef<HomeComponent>,
    private spinner: NgxSpinnerService
  ) { this.myForm = this.createForm(); }

  ngOnInit() {

  }

  // Validaciones para el formulariod e registro de usuario.
  createForm() {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZáéíóúüÁÉÍÓÚÜñÑÇç ]*'),  Validators.minLength(3),Validators.maxLength(10)]),
      apellidos: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZáéíóúüÁÉÍÓÚÜñÑÇç ]*'), Validators.minLength(3),Validators.maxLength(20)]),
      userName: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(10),Validators.pattern('[a-zA-Z]*')]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.exEmail)]),
      password: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z$%&_/-@#=?¿]'), Validators.minLength(8)])
    });
  }

  onRegister(): void {
    if (this.myForm.valid) {
      this.spinner.show();
      this.usuario = new NuevoUsuario(this.nombre.value, this.apellidos.value, this.userName.value, this.email.value, this.password.value);
      this.authService.registrar(this.usuario).subscribe(
        data => {
          this.spinner.hide();
          this.isRegister = true;
          this.isRegisterFail = false;
          this.closeRegistro();
          this.toastr.success('Usuario registrado!', ' ', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.router.navigate(['/']); // Me lleva al home principal
        },
        err => {
          this.spinner.hide();
          this.errMsj = err.error.mensaje;
          this.toastr.error(this.errMsj, ' ', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          // console.log(err.error.message);
        });
    }
  }

  closeRegistro(): void {
    this.dRef.close();
  }

}
