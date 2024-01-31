<template>
  <q-page padding class="flex flex-center">

    <q-card class="my-card q-ma-md">
      <q-card-section class="bg-primary text-white flex flex-center justify-between">
        <div class="text-h6">Informações da Loja</div>
        <div class="text-subititle"></div>
      </q-card-section>

      <q-card-section>
        <div>
          <q-form class="flex justify-between" padding @submit.prevent="handleSubmit">

            <q-input
              label="Nome da sua loja"
              class="myInput"
              v-model="form.name"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Por favor Digite um nome valido']"
            >
             <template v-slot:prepend>
               <q-icon name="mdi-store" color="primary"/>
             </template>
            </q-input>

            <q-input
              label="Numero do Whatsapp"
              mask="(##)#####-####"
              class="myInput"
              v-model="form.phone"
              unmasked-value
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Digite um nome valido']"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-whatsapp" color="primary"/>
              </template>

              <template v-slot:append>
                <q-icon
                  name="mdi-information-outline"
                  class="cursor-pointer"
                  @click="handleInfoPhone"
                />
              </template>
            </q-input>

            <q-input
              label="Menssagem Padrão"
              class="myInput"
              v-model="form.message"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Digite Alguma menssagem']"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-message-text-outline" color="primary"/>
              </template>

              <template v-slot:append>
                <q-icon
                  name="mdi-information-outline"
                  class="cursor-pointer"
                  @click="handleInfoMessage"
                />
              </template>

            </q-input>

            <q-input
              disable
              label="Selecionar banner da loja"
              class="myInput"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Digite Alguma menssagem']"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-image-filter-hdr" color="primary"/>
              </template>
            </q-input>

            <div>
              <div class="q-gutter-md row items-start">
                <q-input
                  filled
                  v-model="form.primary"
                  class="my-input"
                >
                  <template v-slot:append>
                    <q-icon name="colorize" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-color v-model="form.primary" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>

                <q-input
                  filled
                  v-model="form.secondary"
                  :rules="['anyColor']"
                  class="my-input"
                >
                  <template v-slot:append>
                    <q-icon name="colorize" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-color v-model="form.secondary"/>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>

            <div class="flex flex-center">
              <q-btn
                label="Salvar Configurções"
                type="submit"
                no-caps
                rounded
                color="primary"
              />
          </div>

          </q-form>

        </div>
      </q-card-section>

    </q-card>

  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useApi from 'src/composables/useApi'
import useNotify from 'src/composables/useNotify'
import useBrand from 'src/composables/useBrand'
import useAuth from 'src/composables/useAuth'

export default defineComponent({
  name: 'HomeConfigPage',

  setup () {
    const table = 'config'
    const router = useRouter()
    const { post, listPublic, update } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const { setBrand } = useBrand()
    const { user } = useAuth()
    const $q = useQuasar()

    let config = {}

    const form = ref({
      name: '',
      phone: '',
      message: '',
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
          notifySuccess('Configurações salvas com sucesso')
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
        config = await listPublic(table, user.value.id)
        form.value = config[0]
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleInfoMessage = async () => {
      $q.dialog({
        title: 'Informações',
        message: 'Essa messagen sera a menssagen que você recebera de seu cliente em seu Whatsapp.',
        persistent: true
      })
    }

    const handleInfoPhone = async () => {
      $q.dialog({
        title: 'Informações',
        message: 'Não se preocupe seu numero será salvo com segurança',
        persistent: true
      })
    }

    return {
      handleInfoMessage,
      handleInfoPhone,
      handleSubmit,
      form
    }
  }
})
</script>
