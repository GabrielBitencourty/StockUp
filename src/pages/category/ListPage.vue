<template>
  <q-page padding class="q-pt-xl">
    <div class="row">
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

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">

            <q-btn icon="mdi-pencil-outline" color="info" dense size="sm" @click="handleEdit(props.row)">
              <q-tooltip>
                Editar
              </q-tooltip>
            </q-btn>

            <q-btn icon="mdi-delete-empty" color="negative" dense size="sm">
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

export default defineComponent({
  name: 'pageCategoryList',

  setup () {
    const categories = ref([])
    const loading = ref(true)

    const { list } = useApi()
    const { notifyError } = useNotify()
    const router = useRouter()

    const handelListCategories = async () => {
      try {
        loading.value = true
        categories.value = await list('category')
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleEdit = (category) => {
      router.push({ name: 'form-category', params: { id: category.id } })
    }

    onMounted(() => {
      handelListCategories()
    })

    return {
      columns,
      categories,
      loading,
      handleEdit
    }
  }
})
</script>
