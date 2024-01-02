<template>
  <q-page padding class="flex flex-center">

    <div class="container2">
      <q-form class="col-md-7 col-xs-12 col-sm-12" @submit.prevent="handleSubmit">
        <div>
          <h5>Adicionar Novo Produto</h5>
        </div>

        <div class="flex cardInputs">

          <q-input
            label="Nome da Produto"
            class="inputValue"
            lazy-rules
            v-model="form.name"
            :rules="[val => (val && val.length > 0) || 'Digite um nome valido']"
          >
            <template v-slot:prepend>
              <q-icon name="mdi-badge-account-horizontal-outline" color="primary"/>
            </template>
          </q-input>

          <q-input
            label="Quantidade"
            lazy-rules
            class="inputValue"
            v-model="form.amount"
            :rules="[val => !!val || 'Digite um valor valido']"
            type="number"
          >
            <template v-slot:prepend>
              <q-icon name="mdi-database" color="primary"/>
            </template>
          </q-input>

          <q-input
            label="Preço"
            lazy-rules
            v-model="form.price"
            class="inputValue"
            :rules="[val => !!val || 'Digite um valor valido']"
            type="number"
            prefix="R$"
          >
            <template v-slot:prepend>
              <q-icon name="mdi-piggy-bank" color="primary"/>
            </template>
          </q-input>

          <q-select
            class="inputValue q-pb-xl"
            v-model="form.category_id"
            :options="optionsCategory"
            label="Categoria"
            option-value="id"
            option-label="name"
            map-options
            emit-value
            :rules="[val => !!val || 'Selecione uma categoria']"
          >
            <template v-slot:prepend>
              <q-icon name="mdi-format-list-bulleted" color="primary"/>
            </template>
          </q-select>

        </div>

        <q-editor
          v-model="form.description"
          min-height="5rem"
        />

        <div class="flex flex-center q-pt-xl q-gutter-x-xl">
          <q-btn
            :label="isUpdate ? 'Salvar Alterações' : 'Salvar'"
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
            :to="{ name: 'product' }"
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
  name: 'PageFormProduct',

  setup () {
    const table = 'products'
    const router = useRouter()
    const route = useRoute()
    const { post, getById, update, list } = useApi()
    const { notifyError, notifySuccess } = useNotify()

    const isUpdate = computed(() => route.params.id)

    let products = {}
    const optionsCategory = ref([])
    const form = ref({
      name: '',
      description: '',
      amount: 0,
      price: 0,
      category_id: ''
    })

    onMounted(() => {
      handleListCategories()
      if (isUpdate.value) {
        handleGetProducts(isUpdate.value)
      }
    })

    const handleListCategories = async () => {
      optionsCategory.value = await list('category')
    }

    const handleSubmit = async () => {
      try {
        if (isUpdate.value) {
          await update(form.value)
          notifySuccess('Alterações salvas com sucesso!')
        } else {
          await post(table, form.value)
          notifySuccess('Produto salvo com sucesso')
        }
        router.push({ name: 'product' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleGetProducts = async (id) => {
      try {
        products = await getById(table, id)
        form.value = products
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      handleSubmit,
      form,
      isUpdate,
      optionsCategory
    }
  }
})
</script>
