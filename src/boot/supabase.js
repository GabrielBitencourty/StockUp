import { createClient } from '@supabase/supabase-js'
import useAuth from 'src/composables/useAuth'

const supabaseUrl = 'https://qffzklmrnwuuuaktimse.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmZnprbG1ybnd1dXVha3RpbXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA4NDg4MTcsImV4cCI6MjAxNjQyNDgxN30.E5j-61p8Wf96nfUUDEFsg6iBaPjZKl6Ll0qqqT9rWkQ'

const supabase = createClient(supabaseUrl, supabaseKey)

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuth()

  user.value = session?.user || null
})

export default function useSupabase () {
  return { supabase }
}
