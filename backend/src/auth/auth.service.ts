import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await this.usersService.validatePassword(password, user.password)) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.validateUser(loginDto.email, loginDto.password);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { email: user.email, sub: user._id, name: user.name };
      return {
        token: this.jwtService.sign(payload), // ✅ renamed from access_token
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async signup(signupDto: SignupDto) {
    try {
      const existingUser = await this.usersService.findByEmail(signupDto.email);
      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      if (signupDto.password !== signupDto.confirmPassword) {
        throw new ConflictException('Passwords do not match');
      }

      const user = await this.usersService.create({
        name: signupDto.name,
        email: signupDto.email,
        password: signupDto.password,
      });

      const payload = { email: user.email, sub: user._id, name: user.name };
      return {
        token: this.jwtService.sign(payload), // ✅ renamed from access_token
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      };
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }
}
