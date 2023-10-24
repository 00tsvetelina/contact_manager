import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { Direction } from '@angular/cdk/bidi';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public isScreenSmall: boolean | undefined;

  users: Observable<User[]> | undefined
  isDarkTheme: boolean = false;
  dir: Direction = 'ltr';

  constructor(private breakpointObserver: BreakpointObserver,
  private userService: UserService,
  private router: Router){ }

  @ViewChild(MatSidenav) sidenav?: MatSidenav;

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  toggleDirection() {
    this.dir = this.dir == 'ltr' ? 'rtl' : 'ltr';
  }


  ngOnInit(): void {
    this.breakpointObserver
    .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
    .subscribe((state: BreakpointState) =>{
      this.isScreenSmall = state.matches;
    });

    this.userService.loadAll();
    this.users = this.userService.users;

    this.router.events.subscribe(()=>{
      if(this.isScreenSmall) {
        this.sidenav?.close()
      }
    })
  }
}
