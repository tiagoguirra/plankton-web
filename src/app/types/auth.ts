export interface AuthUser {
  name: string
  email: string
  avatar: string
  isFederated: boolean
}

export interface SignIn {
  email: string
  password: string
}

export interface SignUp {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface SignUpProcess {
  email: string
  code?: string
  destination?: string
}

export interface AuthResponse {
  accessToken: string
  expiresIn: number
  refreshToken: string
  idToken?: string
}
