export interface AuthUser {
  name: string
  email: string
  avatar: string
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
  destination: string
  sendAt: Date
}

export interface SignUpConfirm {
  a: string
  b: string
  c: string
  d: string
  e: string
  f: string
}

export interface AuthResponse {
  accessToken: string
  expiresIn: number
  refreshToken: string
  idToken?: string
}
