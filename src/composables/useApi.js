import useSupabase from 'src/boot/supabase'
import useAuth from './useAuth'
import { v4 as uuidv4 } from 'uuid'
import { useRoute } from 'vue-router'
import useBrand from 'src/composables/useBrand'
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const brand = ref({
  primary: '',
  secondary: '',
  name: '',
  phone: ''
})

export default function useApi () {
  const { supabase } = useSupabase()
  const { user } = useAuth()
  const route = useRoute()
  const { setBrand } = useBrand()
  const $q = useQuasar()

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

  const getBrand = async () => {
    const id = route.params.id || user?.value?.id
    if (id) {
      $q.loading.show({
        spinnerColor: 'primary',
        message: 'Carregando Conteudo',
        messageColor: 'black'
      })
      const { data, error } = await supabase
        .from('config')
        .select('*')
        .eq('user_id', id)
      if (error) throw error
      if (data.length > 0) {
        brand.value = data[0]
        setBrand(brand.value.primary, brand.value.secondary)
      }
      $q.loading.hide()
      return brand
    }
  }

  return {
    list,
    listPublic,
    getById,
    post,
    update,
    remove,
    uploadImg,
    getBrand,
    brand
  }
}
