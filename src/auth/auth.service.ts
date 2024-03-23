import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password }: SignInDto): Promise<{
    accessToken: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    srcAvatar: string | null;
    id: string;
  }> {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      srcAvatar: user.srcAvatar,
      id: String(user.id),
    };
  }

  async createUser(createUserData: CreateUserDto) {
    const { email, password } = createUserData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.databaseService.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return {
      id: String(user.id),
      email: user.email,
    };
  }
}
