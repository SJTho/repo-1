// login.js — CDN version (no module imports)

// Supabase client (global)
const supabase = window.supabase.createClient(
  'https://YOUR_PROJECT.supabase.co',
  'YOUR_ANON_KEY'
);

// -----------------------------
// SIGNUP (new user creation)
// -----------------------------
export async function signup(email, password, nickname) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    return { error: error.message };
  }

  const user = data.user;

  // Create profile row
  const { error: profileError } = await supabase.from('profiles').insert({
    id: user.id,
    nickname,
    email
  });

  if (profileError) {
    return { error: profileError.message };
  }

  return { user };
}

// -----------------------------
// LOGIN (industry-standard)
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
// GET CURRENT USER
// -----------------------------
export async function getCurrentUser() {
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user || null;
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