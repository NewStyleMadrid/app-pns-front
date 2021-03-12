import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  user: User = null;

  constructor(
    private uService: UserService,
    private aRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.aRoute.snapshot.params.id;
    this.uService.detail(id).subscribe(
      data => {
        this.user = data;
      },
      err => {
        this.toastr.error(err.error.mensaje, '', { // Nos imprime el mensaje escrito en el BACK-END
          timeOut: 2000,
          positionClass: 'toast-top-center'
        });
      }
    );
  }

  onUpdate(): void {
    const id = this.aRoute.snapshot.params.id;
    this.uService.updateUser(id, this.user).subscribe(
      data => {
        this.toastr.success('Usuario actualizado', '', {
          timeOut: 2000,
          positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      },
      err => {
        this.toastr.error(err.error.mensaje, '', { 
          timeOut: 2000,
          positionClass: 'toast-top-center'
        });
      }
    );
  }
}
