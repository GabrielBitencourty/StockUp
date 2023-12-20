<template>
  <q-page padding class="q-pt-xl">
    <div>
      <q-table
       :rows="categories"
       :columns="columns"
       row-key="id"
       class="col-12 table"
       :loading="loading"
      >

        <template v-slot:top>
          <span class="text-h6">
            Categories
          </span>
          <q-space />
          <q-btn
            label="Add new"
            rounded
            no-caps
            icon="mdi-plus"
            color="secondary"
            :to="{ name: 'form-category' }"
          />
        </template>

        <template v-slot:body-cell-actions="props" >
          <q-td :props="props" class="q-gutter-x-sm">

            <q-btn icon="mdi-pencil-outline" color="info" dense size="sm" @click="handleEdit(props.row)">
              <q-tooltip>
                Editar
              </q-tooltip>
            </q-btn>

            <q-btn icon="mdi-delete-empty" color="negative" dense size="sm" @click="handleRemove(props.row)">
              <q-tooltip>
                Excluir
              </q-tooltip>
            </q-btn>

          </q-td>
        </template>
       </q-table>
    </div>
  </q-page>
</template>

<script>
const columns = [
  { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
  { name: 'id', align: 'left', label: 'Id', field: 'id', sortable: true },
  { name: 'actions', align: 'right', label: 'Actions', field: 'actions', sortable: true }
]

import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composables/useApi'
import useNotify from 'src/composables/useNotify'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'pageCategoryList',

  setup () {
    const categories = ref([])
    const loading = ref(true)
    const $q = useQuasar()
    const table = 'category'

    const { list, remove } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const router = useRouter()

    const handelListCategories = async () => {
      try {
        loading.value = true
        categories.value = await list(table)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleEdit = (category) => {
      router.push({ name: 'form-category', params: { id: category.id } })
    }

    const handleRemove = async (category) => {
      try {
        $q.dialog({
          title: 'Antenção',
          message: `Deseja excluir a categoria ${category.name}?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(table, category.id)
          notifySuccess('Categoria excluida com sucesso')
          handelListCategories()
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      handelListCategories()
    })

    return {
      columns,
      categories,
      loading,
      handleEdit,
      handleRemove
    }
  }
})
</script>
