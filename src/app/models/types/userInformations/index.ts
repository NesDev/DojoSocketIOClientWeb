/**
 * Informations d'un utilisateur
 */
import {UserRoleEnum} from '../../enums/UserRoleEnum';

export class UserInformations {
  public login: string;
  public password: string;
  public role: UserRoleEnum;

}
