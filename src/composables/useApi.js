import useSupabase from 'src/boot/supabase'
import useAuth from './useAuth'
import { v4 as uuidv4 } from 'uuid'

export default function useApi () {
  const { supabase } = useSupabase()
  const { user } = useAuth()

  const list = async (table) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
    if (error) throw error
    return data
  }

  const listPublic = async (table, userId) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('user_id', userId)
    if (error) throw error
    return data
  }

  const getById = async (table, id) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
    if (error) throw error
    return data[0]
  }

  const post = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .insert([
        {
          ...form,
          user_id: user.value.id
        }
      ])
    if (error) throw error
    return data
  }

  const update = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .update({
        ...form
      })
      .match({ id: form.id })
    if (error) throw error
    return data
  }

  const remove = async (table, id) => {
    const { data, error } = await supabase
      .from(table)
      .delete()
      .match({ id })
    if (error) throw error
    return data
  }

  const uploadImg = async (file) => {
    const fileName = uuidv4()
    const { error } = await supabase
      .storage
      .from('products')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })
    const publicUrl = (await getUrlPublic(fileName)).publicUrl
    if (error) throw error
    return publicUrl
  }

  const getUrlPublic = async (fileName, publicURL) => {
    const { data, error } = supabase
      .storage
      .from('products')
      .getPublicUrl(fileName, publicURL)
    if (error) throw error
    return data
  }

  return {
    list,
    listPublic,
    getById,
    post,
    update,
    remove,
    uploadImg
  }
}
