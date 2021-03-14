import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  users: User[] = [];

  constructor(private uService: UserService, private uDialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.chargeUsers();
  }

  chargeUsers(): void {
    this.uService.list().subscribe(data => {
      this.users = data
    }),
      err => {
        console.log(err);
      }
  }

  deleteUser(id: number): void {
    this.uService.deleteUser(id).subscribe(
      data => {
        this.toastr.success('Usuario eliminado!', '', {
          timeOut: 2000,
          positionClass: 'toast-top-center'
        });
        this.chargeUsers();
      },
      err => {
        this.toastr.error(err.error.mensaje, '', { // Nos imprime el mensaje escrito en el BACK-END
          timeOut: 2000,
          positionClass: 'toast-top-center'
        });
      }
    )
  }
  /*
  dialogoEdit(): void {
    const dialogRef = this.uDialog.open(EditComponent, {
      width: '520px',
      height: '460px'
    });
    console.log("Dialogo edit abierto.");
    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialogo edit cerrado.");
    })
  }
  */
}
