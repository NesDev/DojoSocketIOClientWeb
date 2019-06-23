import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {CustomLog} from '../models/custom-log';

/**
 * Author : Mehdi Aarab
 */
@Pipe({
  name: 'colorizeCustomLog'
})
export class ColorizeCustomLogPipe implements PipeTransform {

  private readonly DATE_FULL_FORMAT = 'DD/MM/YYYY kk:mm:ss';
  private readonly DATE_HOUR_FORMAT = 'kk:mm:ss';

  constructor(private sanitizer: DomSanitizer) {
  }

  private static constructSafeHtml(type: string, date: string, senderName: string, content: string) {
    return `<span class="type-${type}"><strong>[</strong> ${date} <strong>${senderName}]</strong> ${content}</span>`;
  }

  transform(log: CustomLog, isDateFormatFull?: boolean): SafeHtml {
    const dateFormatted = log.date
      .format(isDateFormatFull !== undefined && !isDateFormatFull ? this.DATE_HOUR_FORMAT : this.DATE_FULL_FORMAT);
    return this.sanitizer.bypassSecurityTrustHtml(
      ColorizeCustomLogPipe.constructSafeHtml(log.type, dateFormatted, log.origin, log.message));
  }
}
