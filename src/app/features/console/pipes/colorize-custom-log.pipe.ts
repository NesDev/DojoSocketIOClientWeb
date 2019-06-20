import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import * as moment from 'moment';
import {ChatServerMessage} from '../../../models/packets/ChatServerMessage';

@Pipe({
  name: 'colorizeCustomLog'
})
export class ColorizeCustomLogPipe implements PipeTransform {

  private readonly DATE_FULL_FORMAT = 'DD/MM/YYYY kk:mm:ss';
  private readonly DATE_HOUR_FORMAT = 'kk:mm:ss';

  private static constructSafeHtml(type: number, date: string, senderName: string, content: string) {
    return `<span class="origin-${type}"><strong>[</strong> ${date} <strong>${senderName}]</strong> ${content}</span>`;
  }

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(log: ChatServerMessage, isDateFormatFull?: boolean): SafeHtml {
    const dateFormatted = moment(log.timestamp * 1000)
      .format(isDateFormatFull !== undefined && !isDateFormatFull ? this.DATE_HOUR_FORMAT : this.DATE_FULL_FORMAT);
    return this.sanitizer.bypassSecurityTrustHtml(
      ColorizeCustomLogPipe.constructSafeHtml(log.channel, dateFormatted, log.senderName, log.content));
  }
}
