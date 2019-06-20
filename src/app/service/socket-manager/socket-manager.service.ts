import { Injectable } from '@angular/core';

import debug from 'debug';

const log = debug('dojo:SocketManagerService');

@Injectable({
  providedIn: 'root'
})
export class SocketManagerService {


  constructor() {
    log('init');
  }
}
