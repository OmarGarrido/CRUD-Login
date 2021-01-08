import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AuthService]
})
export class NavbarComponent implements OnInit {

  public isLogged = false;
  //cambiamos variable por un observable ya que no se actualiza la navbar
  //public user: any;
  public user$:Observable<any>=this.authServ.afAuth.user;

  constructor(
    private authServ: AuthService,
    private router: Router
  ) { }

  async ngOnInit() {
    // console.log('Navbar');
    // this.user = await this.authServ.getCurrentUser();
    // if (this.user) {
    //   this.isLogged = true;
    //   console.log('User-->', this.user);
    // }
  }

  async onLogout(){
    try{
      await this.authServ.logout();
      this.router.navigate(['login']);
    }
    catch(error){
      console.log(error);
    }
  }

}
