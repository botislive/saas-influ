import { SupabaseClient } from '@supabase/supabase-js'

export async function saveAccount(supabase: SupabaseClient, userId: string, platform: string, data: any) {
  const insertData: any = {
    user_id: userId,
    platform,
    username: data.username || null,
  }

  if (platform === 'twitter' && data.cookie) {
    insertData.cookie = data.cookie
    insertData.ct0 = data.ct0
  } else {
    insertData.access_token = data.access_token
    insertData.refresh_token = data.refresh_token || null
    insertData.expires_at = data.expires_in ? Date.now() + data.expires_in * 1000 : null
  }

  const { error } = await supabase.from('accounts').upsert(insertData, {
    onConflict: 'user_id, platform'
  })

  if (error) {
    console.error(`Error saving ${platform} account:`, error)
    throw error
  }
}
