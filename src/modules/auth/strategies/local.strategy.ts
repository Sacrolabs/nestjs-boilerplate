import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { AuthService } from "../service";

@Injectable()
export class loadStrategy extends PassportStrategy(Strategy){
    constructor (private authService:AuthService){
        super();
    }
}
