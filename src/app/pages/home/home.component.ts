import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserFacade } from 'src/app/facades/user.facade';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public users$: Observable<User[]>;

  constructor(userFacade: UserFacade) {
    this.users$ = userFacade.getAllUsers();
  }
}
