export interface userProps {
  cep: string;
  cidade: string;
  email: string;
  endereco: string; 
  id: string;
  nome: string;
  senha: string;
}

export interface userTokenProps {
  id: string;
  token: string;
}

export interface AuthProviderProps {
  userToken: userTokenProps;
  usersStorage: userProps[];
  children: any;
}

export interface AuthContextProps {
  user?: userProps;
  signin: (email, senha) => string;
  signup: (newUser) => void;
  signout: () => void;
  updateUser: (updatedData) => void;
  isLoading: boolean;
  getUser: (email) => userProps;
}