import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async login(data: any) {
    const user = await this.prisma.users.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Email atau password salah'
      );
    }

    const isMatch = await bcrypt.compare(
      data.password,
      user.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException(
        'Email atau password salah'
      );
    }

    const token = this.jwtService.sign({
      id: user.user_id,
      role: user.role,
    });

    return {
      message: 'Login success',
      access_token: token,
    };
  }

  async register(data: any) {
    const existingUser = await this.prisma.users.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new BadRequestException(
        'Email already exists',
        {
          cause: new Error('Duplicate email'),
          description:
            'User tried to register with an existing email',
        },
      );
    }

    const hashedPassword = await bcrypt.hash(
      data.password,
      10,
    );

    const user = await this.prisma.users.create({
      data: {
        username: data.username,
        email: data.email,
        country: data.country,
        password: hashedPassword,
        role: 'USER',
      },
    });

    return {
      message: 'Register success',
      user_id: user.user_id,
    };
  }
  async getProfile(userId: string) {
    const user = await this.prisma.users.findUnique({
      where: { user_id: userId },
      select: {
        username: true,
        email: true,
        country: true,
        role: true,
      },
    });

    if (!user) {
      throw new BadRequestException('User profile not found.');
  }
  return user;
}
}