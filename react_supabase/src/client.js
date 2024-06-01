
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oagwyneohcvwfderdsgp.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hZ3d5bmVvaGN2d2ZkZXJkc2dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcyMzA3OTYsImV4cCI6MjAzMjgwNjc5Nn0.Pi98QY8dKzJtzYAGqqGMe1GhlQORriRihV5vosJenR0"
export const supabase = createClient(supabaseUrl, supabaseKey)