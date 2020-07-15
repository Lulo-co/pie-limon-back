import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OAuth2Client } from 'google-auth-library';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async verify(token) {
    const CLIENT_ID = process.env.GAUTH_CLIENT_ID;
    const client = new OAuth2Client(CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];

    const user = await this.userRepository.findOne({ googleId: userid });
    if (!user) {
      const newUser = new User();
      newUser.googleId = userid;
      newUser.email = payload.email;
      await this.userRepository.save(newUser);
      return false;
    }
    return user.allowed;
  }
}
