import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SocketService } from '../../service/socket.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('password') password: ElementRef;

  public lang: string;
  public flags = ['fr', 'it', 'br', 'ru', 'en'];
  public version: string;
  public showError = false;

  constructor(public socketService: SocketService) {
  }

  ngOnInit() {
    this.lang = this.getHomeLanguage();
  }

  onSubmit(f: NgForm) {
    // this.authenticationService.login(f.form.value.username, f.form.value.password).subscribe(
    //   (success) => {
    //     console.log(success);
    //     this.router.navigateByUrl('home');
    //   },
    //   (error) => {
    //     console.log(error);
    //     this.showError = true;
    //   }
    // );
  }

  showPassword() {
    this.password.nativeElement.setAttribute('type', '');
  }

  hidePassword() {
    this.password.nativeElement.setAttribute('type', 'password');
  }

  private getHomeLanguage(): string {
    const userLang = navigator.language;
    if (userLang.indexOf('en') !== -1) {
      return 'en';
    } else if (userLang.indexOf('ru') !== -1) {
      return 'ru';
    } else if (userLang.indexOf('it') !== -1) {
      return 'it';
    } else if (userLang.indexOf('br') !== -1 || userLang.indexOf('pt') !== -1) {
      return 'br';
    } else if (userLang.indexOf('fr') !== -1) {
      return 'fr';
    } else {
      return 'fr';
    }
  }
}
