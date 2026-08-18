export interface USER {
  _id?: string;
  email?: string;
  role?: string;
  token?: string;
}

export interface UsersResponse {
  status: string;
  data: USER[];
}
