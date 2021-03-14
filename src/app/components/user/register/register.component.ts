import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup;


  // Expresion regular para el email
  private exEmail: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private dialogRef: MatDialogRef<RegisterComponent>,
    private uService: UserService,
    private toastr: ToastrService,
    private router: Router,
    public fBuilder: FormBuilder,
  ) { this.myForm = this.createForm(); }

  get name() { return this.myForm.get('name'); }
  get firstname() { return this.myForm.get('firstname'); }
  get password() { return this.myForm.get('password'); }
  get email() { return this.myForm.get('email'); }

  ngOnInit(): void {

  }

  // Validaciones para los campos de registro.
  createForm() {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.exEmail)]),
    });

  }

  // Resetea el formulario
  onResetForm(): void {
    this.myForm.reset();
  }

  // Registra el usuario en nuestra BBDD.
  registerUser(): void {
    if (this.myForm.valid) {
      this.uService.saveUser(this.myForm.value).subscribe(data => {
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
        })
      });
    }

  }

  // Cancela el registro y cierra la ventana dialogo.
  closeRegister(): void {
    this.dialogRef.close();
  }
}
