import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { IUser } from '../model/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  selectedUser: IUser;
  userList: IUser[];
  userCount = 0;

  _filterId: string;

  get filterId(): string {
    return this._filterId;
  }

  set filterId(value: string) {
    this._filterId = value;

    this.selectedUser = this.getNewSelectedUser(this.filterId);
  }

  constructor(private _usersService: UsersService) { }

  ngOnInit() {

    this._usersService.getUsers()
      .subscribe( u => {
        this.userCount = u.length;
        this.userList = u;
      });

  }

  getNewSelectedUser(filterBy: string): IUser {

    filterBy = filterBy.toLocaleLowerCase();

    const filteredRecord = this.userList.filter(u => u.id === +filterBy)[0];

    return filteredRecord;
  }

}
