export interface userBasicProps {
  id?: string;
  cep: string;
  city: string;
  email: string;
  address: string; 
  name: string;
}

export interface userProps extends userBasicProps {
  password: string;
}

export interface AuthProviderProps {
  children: any;
}

export interface AuthContextProps {
  user?: userBasicProps;
  setUser: React.Dispatch<React.SetStateAction<userBasicProps | undefined>>;
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
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