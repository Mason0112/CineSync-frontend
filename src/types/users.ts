type UsersRole = "USER" | "ADMIN";
export interface Users {
  id: number;
  userName: string;
  email: string;
  usersRole: UsersRole;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserRegisterRequest {
  userName: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  users: Users;
}
