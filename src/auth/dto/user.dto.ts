export class UserDto {
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
  token: string;
}
