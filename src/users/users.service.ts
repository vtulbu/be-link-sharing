import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async findOne(email: string): Promise<User | null> {
    return await this.databaseService.user.findUnique({
      where: { email },
    });
  }
}
