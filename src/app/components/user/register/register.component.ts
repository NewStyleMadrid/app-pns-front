import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup;
  /*
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
       console.log(this.myForm.value);
  }

  
  */
  ngOnInit(): void {

  }

  // Expresion regular para el email
  private exEmail: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private dialogRef: MatDialogRef<RegisterComponent>,
    private uService: UserService,
    private toastr: ToastrService,
    private router: Router,
    public fBuilder: FormBuilder
  ) { this.myForm = this.createForm(); }

  get username() { return this.myForm.get('username'); }
  get name() { return this.myForm.get('name'); }
  get firstname() { return this.myForm.get('firstname'); }
  get pwd() { return this.myForm.get('pwd'); }
  get email() { return this.myForm.get('email'); }


  createForm() {
    return new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(5)]),
      name: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      pwd: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.exEmail)]),
    });
  }

  onResetForm(): void {
    this.myForm.reset();
  }

  registerUser(): void {
    if (this.myForm.valid) {
      this.uService.saveUser(this.myForm.value).subscribe(data => {
        this.toastr.success('Usuario registrado', '', {
          timeOut: 2000,
          positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']); // Una vez creado nos redirige al HOME.
        this.dialogRef.close();
      }),
        this.onResetForm();
    }
  }

  closeRegister(): void {
    this.dialogRef.close();
  }
}
