import {Component, OnInit} from '@angular/core';
import {CustomLog} from '../../../features/console/models/custom-log';
import {CustomLogTypeEnum} from '../../../features/console/models/custom-log-type-enum.enum';
import * as moment from 'moment';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-console-chat',
  templateUrl: './console-chat.component.html',
  styleUrls: ['./console-chat.component.scss']
})
export class ConsoleChatComponent implements OnInit {
  public logs: CustomLog[] = [];
  public formConsole: FormGroup;

  constructor() {
    this.logs.push(new CustomLog(CustomLogTypeEnum.INFO, moment(), 'Server', 'Bienvenue'));
    this.formConsole = new FormGroup({
      input: new FormControl(),
    });
  }


  ngOnInit(): void {
  }

  public submit() {
    const command = this.formConsole.get('input').value;
    this.formConsole.reset();
    // this.bot.console.logInfo("Envoi de la command : " + command ,"console");
    // this.bot.sendPacketToSupervisor("DashCommandRequestMessage",{
    //   command: command
    // } as DashCommandRequestMessage);
  }

  public keypress(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      this.submit();
    }
  }
}
