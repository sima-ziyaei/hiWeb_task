export interface QueryParams {
  count?: number;
  skip?: number;
  orderBy?: "title";
}

export interface LoginBody {
  userName: string;
  passWord: string;
}

export interface TakeAccessTokenWithRefreshToken{
    userName:string;
    refresh_token:string;
}

interface Product {
  description: string;
  id: string;
  imageUrl: string;
  rate: number;
  title: string;
  view: number;
}

export interface InitialState {
  product : Product[]
}

