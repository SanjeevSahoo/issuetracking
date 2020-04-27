export class User {
  id: string;
  username: string;
  emailid: string;
  password: string;
  securityQuestion: string;
  securityAnswer: string;
  roles: Array<string>;
  status: string;
  token: string;
}
