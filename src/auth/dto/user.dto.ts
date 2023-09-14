export class UserDto {
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
    image: string;
  };
  token: string;
}
