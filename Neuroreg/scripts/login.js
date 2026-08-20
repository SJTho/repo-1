import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// -----------------------------
// LOGIN
// -----------------------------
export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return { error: error.message };
  }

  const user = data.user;

  // Fetch profile row
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profileError) {
    return { error: profileError.message };
  }

  return { user, profile };
}

// -----------------------------
// CHECK IF USER IS LOGGED IN
// -----------------------------
export async function getCurrentUser() {
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user || null;
}

// -----------------------------
// GET CURRENT USER PROFILE
// -----------------------------
export async function getCurrentProfile() {
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) return null;

  return profile;
}

// -----------------------------
// LOGOUT
// -----------------------------
export async function logout() {
  await supabase.auth.signOut();
}

// -----------------------------
// AUTH STATE LISTENER
// -----------------------------
export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
}