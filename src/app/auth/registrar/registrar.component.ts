import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HomeComponent } from 'src/app/components/home/home.component';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';


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

  // Expresión regular para el email
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

  // Validaciones para los campos de registro.
  createForm() {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.exEmail)]),
      password: new FormControl('', [Validators.required])
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

  /*
    form: any = {};
    private usuario: any = {};
    isRegister = false;
    isRegisterFail = false;
    errorMsg = '';
  
    constructor(private authService: AuthService,private dRef: MatDialogRef<HomeComponent>) { }
  
    ngOnInit() {
  
    }
  
    onRegister() {
      this.usuario = new NuevoUsuario(this.form.nombre, this.form.apellidos, this.form.userName, this.form.email, this.form.password);
      this.authService.registrar(this.usuario).subscribe(data => {
        this.isRegister = true;
        this.isRegisterFail = false;
        this.closeRegistro();
      },
        (error: any) => {
          console.log(error.error.mensaje);
          this.errorMsg = error.error.mensaje;
          this.isRegister = false;
          this.isRegisterFail = true;
        }
      );
    }
  */
  
}
