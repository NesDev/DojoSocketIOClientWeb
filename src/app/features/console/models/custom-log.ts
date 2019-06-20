import {CustomLogTypeEnum} from './custom-log-type-enum.enum';

export class CustomLog {
  public type: CustomLogTypeEnum;
  public date: Date;
  public origin: string;
  public message: string;

  public constructor(type: CustomLogTypeEnum, date: Date, origin: string, message: string) {
    this.type = type;
    this.date = date;
    this.origin = origin;
    this.message = message;
  }
}
