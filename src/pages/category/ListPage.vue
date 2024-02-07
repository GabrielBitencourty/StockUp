<template>
  <q-page padding class="q-pt-xl">
    <div>
      <q-table
       :rows="categories"
       :columns="columnsCategory"
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
            v-if="$q.platform.is.desktop"
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
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        v-if="$q.platform.is.mobile"
        fab
        icon="add"
        color="primary"
        :to="{ name: 'form-category' }"
      />
  </q-page-sticky>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composables/useApi'
import useAuth from 'src/composables/useAuth'
import useNotify from 'src/composables/useNotify'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { columnsCategory } from './table'

export default defineComponent({
  name: 'pageCategoryList',

  setup () {
    const categories = ref([])
    const loading = ref(true)
    const $q = useQuasar()
    const { user } = useAuth()
    const table = 'category'

    const { listPublic, remove } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const router = useRouter()

    const handelListCategories = async () => {
      try {
        loading.value = true
        categories.value = await listPublic(table, user.value.id)
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
      columnsCategory,
      categories,
      loading,
      handleEdit,
      handleRemove
    }
  }
})
</script>
