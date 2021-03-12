import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  users: User[]=[];

  constructor(private userServ:UserService) { }

  ngOnInit(): void {
    this.chargeUsers();
  }

  chargeUsers():void{
    this.userServ.list().subscribe(data=>{
      this.users=data
    }),
    err=>{
      console.log(err);
    }
  }
}
