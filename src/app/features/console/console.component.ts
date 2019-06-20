import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ChatServerMessage} from '../../models/packets/ChatServerMessage';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {

  @Input() private logs: ChatServerMessage[] = [];


  constructor() {
  }

  ngOnInit() {

  }



}
