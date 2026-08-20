import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// -----------------------------
// SIGNUP
// -----------------------------
export async function signup(email, password, nickname) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) return { error };

  const user = data.user;

  // Create profile row
  const { error: profileError } = await supabase.from('profiles').insert({
    id: user.id,
    nickname,
    email
  });

  if (profileError) return { error: profileError };

  return { user };
}

// -----------------------------
// LOGIN
// -----------------------------
export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) return { error };

  const user = data.user;

  // Fetch profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profileError) return { error: profileError };

  return { user, profile };
}

// -----------------------------
// LOGOUT
// -----------------------------
export async function logout() {
  await supabase.auth.signOut();
}

// -----------------------------
// GET CURRENT USER PROFILE
// -----------------------------
export async function getProfile() {
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return { error: 'Not logged in' };

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) return { error };

  return { profile };
}

// -----------------------------
// UPDATE PROFILE
// -----------------------------
export async function updateProfile(updates) {
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return { error: 'Not logged in' };

  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date()
    })
    .eq('id', user.id)
    .select()
    .single();

  if (error) return { error };

  return { data };
}

// -----------------------------
// AUTH STATE LISTENER
// -----------------------------
export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
}