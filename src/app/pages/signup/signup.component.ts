import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SocketService} from '../../service/socket.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @ViewChild('password') password: ElementRef;

  public version: string;
  public error = '';

  constructor(public socketService: SocketService, private router: Router) {
  }

  ngOnInit() {
  }

  async onSubmit(f: NgForm) {
    const result = await this.socketService.createAccount(f.form.value.username, f.form.value.password);
    if (result.result) {
      await this.router.navigateByUrl('');
    } else {
      console.log(result.reason);
      this.error = result.reason;
    }
  }

  showPassword() {
    this.password.nativeElement.setAttribute('type', '');
  }

  hidePassword() {
    this.password.nativeElement.setAttribute('type', 'password');
  }
}
