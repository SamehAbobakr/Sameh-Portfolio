// All data access lives here. Pages never talk to Supabase directly.
import { supabase } from './supabase';

export class NotConfiguredError extends Error {}

async function run(build) {
  if (!supabase) throw new NotConfiguredError('Supabase is not configured');
  const { data, error } = await build(supabase);
  if (error) throw error;
  return data;
}

export const listProjects = () => run((s) => s.from('projects').select('*').order('sort_order'));
export const getProject = (slug) => run((s) => s.from('projects').select('*, project_images(*)').eq('slug', slug).maybeSingle());
export const listSkills = () => run((s) => s.from('skills').select('*').order('sort_order'));
export const listLearning = () => run((s) => s.from('learning_resources').select('*'));
export const listCertificates = () => run((s) => s.from('certificates').select('*').order('issued_on', { ascending: false }));
export const getProfile = () => run((s) => s.from('profile').select('*').eq('id', 1).maybeSingle());
export const listSocials = () => run((s) => s.from('social_links').select('*').order('sort_order'));
export const sendMessage = (m) => run((s) => s.from('contact_messages').insert(m));
