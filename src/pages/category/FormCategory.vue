<template>
  <q-page padding class="flex flex-center">

    <div class="container">
      <q-form class="col-md-7 col-xs-12 col-sm-12" @submit.prevent="handleSubmit">

        <h5>Adicionar uma nova categoria</h5>

        <q-input
          label="Nome da Categoria"
          lazy-rules
          v-model="form.name"
          :rules="[val => (val && val.length > 0) || 'Digite um nome valido']"
        >
        <template v-slot:prepend>
          <q-icon name="mdi-book-plus-multiple" color="primary"/>
        </template>

        </q-input>

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
            :to="{ name: 'category' }"
          />
        </div>

      </q-form>
    </div>

  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useApi from 'src/composables/useApi'
import useNotify from 'src/composables/useNotify'

export default defineComponent({
  name: 'PageCategory',

  setup () {
    const table = 'category'
    const router = useRouter()
    const route = useRoute()
    const { post, getById } = useApi()
    const { notifyError, notifySuccess } = useNotify()

    const isUpdate = computed(() => route.params.id)

    let category = {}
    const form = ref({
      name: ''
    })

    onMounted(() => {
      if (isUpdate.value) {
        handleGetCategory(isUpdate.value)
      }
    })

    const handleSubmit = async () => {
      try {
        await post(table, form.value)
        notifySuccess('Categoria salva com sucesso')
        router.push({ name: 'category' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleGetCategory = async (id) => {
      try {
        category = await getById(table, id)
        form.value = category
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
