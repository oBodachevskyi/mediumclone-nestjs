import { UserType } from './user.type';

export interface UserResponceInterface {
  user: UserType & { token: string };
}
