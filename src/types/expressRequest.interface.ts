import { UserEntity } from '@app/user/user.entity';
import { Request } from 'express';

export interface ExpressRequsetWithoutHeadersInterface extends Request {
  user?: UserEntity;
}

export type ExpressRequsetInterface = ExpressRequsetWithoutHeadersInterface & {
  headers: { authorization: string };
};
