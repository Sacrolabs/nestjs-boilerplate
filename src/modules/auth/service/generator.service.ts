import { Injectable } from "@nestjs/common";
import { v1 as uuid } from "uuid";
import crypto from "crypto";

@Injectable()
export class GeneratorService {
  public uuid(): string {
    return uuid();
  }

  public fileName(ext: string): string {
    return this.uuid() + "." + ext;
  }

  public randomHex(bytesLength = 16): string {
    return crypto.randomBytes(bytesLength).toString("hex");
  }

  public randomNum(from: number, to: number): number {
    return Math.floor(Math.random() * (to - from) + from);
  }
}
