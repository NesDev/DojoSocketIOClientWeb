import { Injectable } from '@angular/core';
import { SocketManager } from '../utils/socketManager';
import debug from 'debug';
import { UserInformations } from '../models/types/userInformations';
import { ChatServerMessage } from '../models/packets/ChatServerMessage';

const log = debug('dojo:socketService');

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public identified = false;
  public isInit = false;
  public logs: ChatServerMessage[] = [];
  private socket: SocketManager;
  private userInformations: UserInformations;

  constructor() {
    log('Initialisation');
    debug.enable('dojo:*');
    // this.socket = new SocketManager(socketService);
    // this.socket.dispatchers.push(this);
    // this.init().then(() => {
    //   this.isInit = true;
    // });
  }

  // init(): Promise<boolean> {
  //   return new Promise<boolean>(async (resolve, reject) => {
  //     this.monitorPackets();
  //     const login = localStorage.login;
  //     const password = localStorage.password;
  //     if (login && password) {
  //       await this.connectToServer(login, password);
  //     }
  //     return resolve(true);
  //   });
  // }
  //
  //
  // public monitorPackets() {
  //   const wrapper = this.wrap();
  //   wrapper.on('socket::disconnected', () => {
  //     log('Socket disconnected');
  //     this.identified = false;
  //   });
  //   wrapper.on('socket::reconnected', () => {
  //     this.identified = false;
  //     log('Reconnected, Identification..');
  //     const login = localStorage.login;
  //     const password = localStorage.password;
  //     if (login && password) {
  //       const wrapperIdenti = this.wrap();
  //       wrapperIdenti.on('packet::IdentificationSucessMessage', (packet: IdentificationSucessMessage) => {
  //         localStorage.login = packet.userInformations.login;
  //         localStorage.password = packet.userInformations.password;
  //         log('ReIdentification sucess ! ', packet.userInformations);
  //         this.userInformations = packet.userInformations;
  //         this.emit('event::Identified');
  //         this.identified = true;
  //         wrapperIdenti.done();
  //       });
  //       this.socket.send('IdentificationRequestMessage', {
  //         login: 'nes',
  //         password: 'toto',
  //         type: IdentificationTypeEnum.CLIENT
  //       } as IdentificationRequestMessage);
  //     }
  //   });
  // }
  //
  // public connectToServer(login: string, password: string): Promise<{ state: boolean, reason: string }> {
  //   return new Promise<{ state: boolean, reason: string }>(async (resolve, reject) => {
  //     const wrapper = this.wrap();
  //     // TIMEOUT CONNECTION
  //     const timeoutConnection = setTimeout(() => {
  //       log('Timeout: no responds from the server for server connection, socketClientManager is ' +
  //       (this.socket && this.socket.isConnected()) ? 'connected' : 'disconnected');
  //       this.socket.disconnect('TIMEOUT SERVER');
  //       wrapper.done();
  //       return resolve({ state: false, reason: 'Timeout' });
  //     }, 25000);
  //     // FAIL CONNECTION
  //     wrapper.on('packet::IdentificationFailedMessage', (packet: IdentificationFailedMessage) => {
  //       log('Identification failed ! ', packet.reason);
  //       this.socket.disconnect('Connection Supervisor Failed: ' + packet.reason);
  //       clearTimeout(timeoutConnection);
  //       wrapper.done();
  //       return resolve({ state: false, reason: packet.reason });
  //     });
  //     // GOOD CONNECTION
  //     wrapper.on('packet::IdentificationSucessMessage', (packet: IdentificationSucessMessage) => {
  //       this.identified = true;
  //       localStorage.login = packet.userInformations.login;
  //       localStorage.password = packet.userInformations.password;
  //       log('Identification sucess ! ', packet.userInformations);
  //       this.userInformations = packet.userInformations;
  //       this.emit('event::Identified');
  //       wrapper.done();
  //       clearTimeout(timeoutConnection);
  //       return resolve({ state: true, reason: 'OK' });
  //     });
  //     // GOOD CONNECTION
  //     wrapper.on('socket::connected', (packet: IdentificationSucessMessage) => {
  //       log('Identification..');
  //       this.socket.send('IdentificationRequestMessage', {
  //         login,
  //         password,
  //         type: IdentificationTypeEnum.CLIENT
  //       } as IdentificationRequestMessage);
  //     });
  //     wrapper.on('socket::disconnected', () => {
  //       log('Server disconnected..');
  //       wrapper.done();
  //       clearTimeout(timeoutConnection);
  //       return resolve({ state: false, reason: 'Server disconnected' });
  //     });
  //   });
  // }
  //
  //
  // createAccount(): Promise<{ result: boolean, reason: string }> {
  //   return new Promise<{ result: boolean, reason: string }>((resolve, reject) => {
  //     const wrapper = this.wrap();
  //     wrapper.on('packet::CreateAccountSuccessMessage', (packet: CreateAccountSuccessMessage) => {
  //       wrapper.done();
  //     });
  //
  //     return resolve({ result: true, reason: 'OK' });
  //   });
  // }

}
