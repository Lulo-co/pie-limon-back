import { GqlExecutionContext } from '@nestjs/graphql';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { UsersService } from '../../users/users.service';

@Injectable()
export class GoogleAuthGuard implements CanActivate {
  constructor(private userService: UsersService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const token = ctx.getContext().req.header('Authorization');
    return this.userService.verify(token);
  }
}
