export interface userProps {
  id: string;
  cep: string;
  cidade: string;
  email: string;
  endereco: string; 
  nome: string;
}

export interface newUserProps extends userProps {
  senha: string;
}

export interface AuthProviderProps {
  children: any;
}

export interface AuthContextProps {
  user?: userProps;
  signin: (email, senha) => UserResponse;
  signup: (accessToken: string, newUser: userProps) => void;
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
  NOVO_ERRO = 'Erro ao criar usuário, tente novamente mais tarde!',
  USUARIO_NAO_CADASTRADO = 'Usuário não cadastrado',
  DADOS_INCORRETOS = "E-mail ou senha incorretos",
  LOGIN_SUCESSO = 'Login realizado com sucesso!',
}