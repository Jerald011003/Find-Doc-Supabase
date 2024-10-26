import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vduerriglvtnzgqvxrxy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkdWVycmlnbHZ0bnpncXZ4cnh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk5MjgxOTIsImV4cCI6MjA0NTUwNDE5Mn0.QeZlQKgtt4RnoMsrxntkopL_FPIavWvai7zFxuCg-Xc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
