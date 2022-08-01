import { Strategy } from "passport-jwt";
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { jwtConstants } from '../constant/constant';
import { EntityManager } from '@mikro-orm/postgresql';
import { AuthService } from "../service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly em: EntityManager,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
  }

  public async validate(payload: any){

    return {
      email: payload.email
    }


  }
}

