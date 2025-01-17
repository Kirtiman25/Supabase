import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://eswcbnkappfqmgguuesu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzd2NibmthcHBmcW1nZ3V1ZXN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4NzM2MDYsImV4cCI6MjA1MDQ0OTYwNn0.36FrRVbcjAVEStZG-cQaX6NlLuUXSYBrW94WSoRGEEs')