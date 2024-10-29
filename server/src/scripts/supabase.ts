// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ncoqwrqknmuqeaiqtmfn.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jb3F3cnFrbm11cWVhaXF0bWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU3NTE1NTgsImV4cCI6MjA0MTMyNzU1OH0.X39ijL6nj9ela9vdp-5WxmXNRP3OY2smkzK1vg2WKnQ"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)