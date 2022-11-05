import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public loggedIn: boolean = false;
  public user: SocialUser | undefined;
  @Input()
  public menuOpen: boolean = true;

  @Output()
  public eventOpenMenu = new EventEmitter()


  constructor( private loginService:LoginService) { }

  ngOnInit(): void {
  }

          
  public signOut(): void {
   
    this.loginService.logout();
    
  }

}
