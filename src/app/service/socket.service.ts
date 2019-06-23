import {Injectable} from '@angular/core';
import {SocketManager} from '../utils/socketManager';
import debug from 'debug';
import {UserInformations} from '../models/types/userInformations';
import {ChatServerMessage} from '../models/packets/ChatServerMessage';
import {Socket} from 'ngx-socket-io';
import {Dispatcher} from '../utils/events/dispatcher';
import {CreateAccountSuccesMessage} from '../models/packets/CreateAccountSuccesMessage';
import {IdentificationRequestMessage} from '../models/packets/IdentificationRequestMessage';
import {IdentificationTypeEnum} from '../models/enums/IdentificationTypeEnum';
import {IdentificationSucessMessage} from '../models/packets/IdentificationSucessMessage';
import {IdentificationFailedMessage} from '../models/packets/IdentificationFailedMessage';
import {UserInformations} from '../models/types/UserInformations';
import {CreateAccountErrorMessage} from '../models/packets/CreateAccountErrorMessage';
import {CreateAccountRequestMessage} from '../models/packets/CreateAccountRequestMessage';
import {ServerInformationsMessage} from '../models/packets/ServerInformationsMessage';
import {UserDisconnectedMessage} from '../models/packets/UserDisconnectedMessage';
import {UserConnectedMessage} from '../models/packets/UserConnectedMessage';

const log = debug('dojo:socketService');

@Injectable({
  providedIn: 'root',
})
export class SocketService extends Dispatcher {
  public identified = false;
  public isInit = false;
  public logs: ChatServerMessage[] = [];
  public users: UserInformations[] = [];
  public socket: SocketManager;
  private userInformations: UserInformations;

  constructor(private socketService: Socket) {
    super();
    log(socketService);
    log('Initialisation');
    debug.enable('dojo:*');
    this.socket = new SocketManager(socketService);
    this.socket.dispatchers.push(this);
    this.init().then(() => {
      this.isInit = true;
    });
  }

  init(): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      this.monitorPackets();
      const login = localStorage.login;
      const password = localStorage.password;
      if (login && password) {
        await this.connectToServer(login, password);
      }
      return resolve(true);
    });
  }

  public monitorPackets() {
    const wrapper = this.wrap();
    wrapper.on('socket::disconnected', () => {
      alert('Socket disconnect');
      log('Socket disconnected');
      this.identified = false;
    });
    wrapper.on('packet::IdentificationSucessMessage', (packet: IdentificationSucessMessage) => {
      this.identified = true;
      this.userInformations = packet.userInformations;
    });
    wrapper.on('packet::ServerInformationsMessage', (packet: ServerInformationsMessage) => {
      this.users = packet.users;
    });

    wrapper.on('packet::UserDisconnectedMessage', (packet: UserDisconnectedMessage) => {
      this.users = this.users.filter((elt) => elt.login !== packet.login);
    });

    wrapper.on('packet::UserConnectedMessage', (packet: UserConnectedMessage) => {
      const userIndex = this.users.findIndex((elt) => elt.login === packet.userInformations.login);
      if (userIndex !== -1) {
        this.users = this.users.filter((elt) => elt.login !== packet.userInformations.login);
      }
      this.users.push(packet.userInformations);
    });
  }

  public createAccount(login: string, password: string): Promise<{ result: boolean, reason: string }> {
    return new Promise<{ result: boolean, reason: string }>((resolve, reject) => {
      const wrapper = this.wrap();
      const timeout = setTimeout(() => {
        wrapper.done();
        return resolve({result: false, reason: 'TIMEOUT'});
      }, 10000);
      wrapper.on('packet::CreateAccountSuccesMessage', (packet: CreateAccountSuccesMessage) => {
        clearTimeout(timeout);
        wrapper.done();
        return resolve({result: true, reason: 'OK'});
      });
      wrapper.on('packet::CreateAccountErrorMessage', (packet: CreateAccountErrorMessage) => {
        clearTimeout(timeout);
        wrapper.done();
        return resolve({result: false, reason: packet.reason});
      });
      this.socket.send('CreateAccountRequestMessage', {
        login,
        password
      } as CreateAccountRequestMessage);
    });
  }

  public login(login: string, password: string): Promise<{ result: boolean, reason: string }> {
    return new Promise<{ result: boolean, reason: string }>((resolve, reject) => {
      const wrapper = this.wrap();
      const timeout = setTimeout(() => {
        wrapper.done();
        return resolve({result: false, reason: 'TIMEOUT'});
      }, 10000);
      wrapper.on('packet::IdentificationSucessMessage', (packet: IdentificationSucessMessage) => {
        clearTimeout(timeout);
        wrapper.done();
        return resolve({result: true, reason: 'OK'});
      });
      wrapper.on('packet::IdentificationFailedMessage', (packet: IdentificationFailedMessage) => {
        clearTimeout(timeout);
        wrapper.done();
        return resolve({result: false, reason: packet.reason});
      });
      this.socket.send('IdentificationRequestMessage', {
        login,
        password,
        type: IdentificationTypeEnum.CLIENT
      } as IdentificationRequestMessage);
    });
  }
}
