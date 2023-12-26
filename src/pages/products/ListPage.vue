<template>
  <q-page padding class="q-pt-xl">
    <div>
      <q-table
       :rows="products"
       :columns="columnsProducts"
       row-key="id"
       class="col-12 table"
       :loading="loading"
      >

        <template v-slot:top>
          <span class="text-h6">
            Products
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

        <template v-slot:body-cell-img_url="props">
          <q-td :props="props">
            <q-avatar>
              <img :src="props.row.img_url">
            </q-avatar>
          </q-td>
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
        :to="{ name: 'form-product' }"
      />
  </q-page-sticky>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composables/useApi'
import useNotify from 'src/composables/useNotify'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { columnsProducts } from './table'

export default defineComponent({
  name: 'pageProductsList',

  setup () {
    const products = ref([])
    const loading = ref(true)
    const $q = useQuasar()
    const table = 'products'

    const { list, remove } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const router = useRouter()

    const handleListProducts = async () => {
      try {
        loading.value = true
        products.value = await list(table)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleEdit = (category) => {
      router.push({ name: 'form-product', params: { id: category.id } })
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
          handleListProducts()
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      handleListProducts()
    })

    return {
      columnsProducts,
      products,
      loading,
      handleEdit,
      handleRemove
    }
  }
})
</script>