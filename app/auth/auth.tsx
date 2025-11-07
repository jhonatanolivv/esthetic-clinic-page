import { supabase } from '../../lib/supabaseClient'

// Registrar um novo usuário
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    console.error('Erro ao registrar usuário:', error.message)
    return { user: null, error }
  }

  return { user: data.user, error: null }
}

// Fazer login
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('Erro ao fazer login:', error.message)
    return { user: null, error }
  }

  return { user: data.user, error: null }
}

// Fazer logout
export async function signOut() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Erro ao fazer logout:', error.message)
  }

  return { error }
}

// Obter o usuário atual (sessão)
export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    console.error('Erro ao obter usuário atual:', error.message)
  }

  return { user, error }
}
