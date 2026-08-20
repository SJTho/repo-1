// login.js — Local Supabase version (no CDN, no module imports)

// ---------------------------------------------
// Load local Supabase client
// ---------------------------------------------
import { createClient } from './supabase.js';

// ---------------------------------------------
// Initialize Supabase
// ---------------------------------------------
const supabase = createClient(
  'https://YOUR_PROJECT.supabase.co',
  'YOUR_ANON_KEY'
);

// ---------------------------------------------
// SIGNUP
// ---------------------------------------------
window.signup = async function (email, password, nickname) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) return { error: error.message };

  const user = data.user;

  const { error: profileError } = await supabase.from('profiles').insert({
    id: user.id,
    nickname,
    email
  });

  if (profileError) return { error: profileError.message };

  return { user };
};

// ---------------------------------------------
// LOGIN
// ---------------------------------------------
window.login = async function (email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) return { error: error.message };

  const user = data.user;

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profileError) return { error: profileError.message };

  return { user, profile };
};

// ---------------------------------------------
// GET CURRENT USER
// ---------------------------------------------
window.getCurrentUser = async function () {
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user || null;
};

// ---------------------------------------------
// LOGOUT
// ---------------------------------------------
window.logout = async function () {
  await supabase.auth.signOut();
};

// ---------------------------------------------
// AUTH STATE LISTENER
// ---------------------------------------------
window.onAuthStateChange = function (callback) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
};