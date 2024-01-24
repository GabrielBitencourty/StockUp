<template>
  <q-page padding class="flex flex-center">
    <div class="container">
      <q-form class="col-md-7 col-xs-12 col-sm-12" @submit.prevent="handleSubmit">
        <div>
          <h5>Configurações</h5>
        </div>

        <q-input
          label="Nome da sua loja"
          lazy-rules
          v-model="form.name"
          :rules="[val => (val && val.length > 0) || 'Digite um nome valido']"
        >
        <template v-slot:prepend>
          <q-icon name="mdi-store" color="primary"/>
        </template>

        </q-input>

        <q-input
          label="Numero do Whatsapp"
          mask="(##)#####-####"
          unmasked-value
          v-model="form.phone"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Digite um nome valido']"
        >
        <template v-slot:prepend>
          <q-icon name="mdi-whatsapp" color="primary"/>
        </template>

        </q-input>

        <div class="row justify-center q-gutter-md">
          <div class="col-md-4 col-sm-12 col-xs-12 flex flex-center">
            <q-color
              v-model="form.primary"
              class="my-picker"
            />
          </div>
          <div class="col-md-4 col-sm-12 col-xs-12 flex flex-center">
            <q-color
              v-model="form.secondary"
              class="my-picker"
            />
          </div>
        </div>

        <div class="flex flex-center q-pt-xl q-gutter-x-xl">
            <q-btn
                label="Salvar"
                type="submit"
                rounded
                no-caps
                color="primary"
            />

            <q-btn
                label="Cancelar"
                rounded
                no-caps
                flat
                class="bg-secondary text-white"
                :to="{ name: 'user-page' }"
            />
        </div>

      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useApi from 'src/composables/useApi'
import useNotify from 'src/composables/useNotify'
import useBrand from 'src/composables/useBrand'

export default defineComponent({
  name: 'PageFormConfig',

  setup () {
    const table = 'config'
    const router = useRouter()
    const { post, list, update } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const { setBrand } = useBrand()

    let config = {}
    const form = ref({
      name: '',
      phone: '',
      primary: '',
      secondary: ''
    })

    onMounted(() => {
      handleGetConfig()
    })

    const handleSubmit = async () => {
      try {
        if (form.value.id) {
          await update(table, {
            ...form.value
          })
          notifySuccess('Alterações salvas com sucesso!')
        } else {
          await post(table, form.value)
          notifySuccess('Categoria salva com sucesso')
        }
        setBrand(form.value.primary, form.value.secondary)
        router.push({ name: 'user-page' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleGetConfig = async () => {
      try {
        config = await list(table)
        form.value = config[0]
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      handleSubmit,
      form
    }
  }
})
</script>
