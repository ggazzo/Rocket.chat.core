import { IUser } from './IUser';

/*
This means that we allow registered users without emails
*/

export interface IRegisterUser extends IUser {
  username: string;
  name: string;
}

export const isRegisterUser = (user: IUser): user is IRegisterUser =>
  user.username !== undefined && user.name !== undefined;
