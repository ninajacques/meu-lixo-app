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
  signin: (email, senha) => UserResponse;
  signup: (newUser) => UserResponse;
  signout: () => void;
  updateUser: (updatedData) => UserResponse;
  isLoading: boolean;
  getUser: (email) => userProps;
}

export enum UserResponse {
  EMAIL_DUPLICADO = 'Já existe uma conta com esse E-mail',
  ALTERAR_ERRO = 'Infelizmente, não foi possível alterar os dados do usuário.',
  ALTERAR_SUCESSO = 'Dados alterados com sucesso!',
  NOVO_SUCESSO = 'Conta criada com sucesso!',
  USUARIO_NAO_CADASTRADO = 'Usuário não cadastrado',
  DADOS_INCORRETOS = "E-mail ou senha incorretos",
  LOGIN_SUCESSO = 'Login realizado com sucesso!',
}