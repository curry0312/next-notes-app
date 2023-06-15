import { DefaultSession, DefaultUser } from "next-auth";
export enum Role {
  user = "user",
  admin = "admin",
}
interface IUser extends DefaultUser {
  userId?: string;
  email?: string;
  username?: string;
}
declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user?: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}