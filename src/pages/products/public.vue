<template>
  <q-page padding class="q-pt-xl">
    <div class="row">
      <q-table
       grid
       :rows="products"
       :columns="columnsProducts"
       row-key="id"
       class="col-12 q-gutter-xl"
       :loading="loading"
       :filter="filter"
      >

        <template v-slot:top>
          <span class="text-h6">
            Products
          </span>
          <q-space />
          <q-input
            v-model="filter"
            outlined
            debounce="300"
            dense
            placeholder="Search"
            class="q-mr-sm search"
          >
            <template v-slot:append>
              <q-icon name="mdi-magnify"/>
            </template>
          </q-input>
        </template>

        <template v-slot:item="props">
         <div class="q-pa-xl col-xs-12 col-sm-6 col-md-4">
          <q-card class="q-mt-xl">
            <q-img :src="props.row.img_url" :ratio="4/3" />
            <q-card-section class="text-center">
              <div class="text-h6">{{ props.row.name }}</div>
              <div class="text-subtitle2">{{ formatCurrency(props.row.price) }}</div>
            </q-card-section>
          </q-card>
        </div>
      </template>

       </q-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composables/useApi'
import useNotify from 'src/composables/useNotify'
import { columnsProducts } from './table'
import { useRoute } from 'vue-router'
import { formatCurrency } from 'src/utils/format'

export default defineComponent({
  name: 'pageProductsPublic',

  setup () {
    const products = ref([])
    const loading = ref(true)
    const table = 'products'
    const route = useRoute()
    const filter = ref('')
    const { listPublic } = useApi()
    const { notifyError } = useNotify()

    const handleListProducts = async (userId) => {
      try {
        loading.value = true
        products.value = await listPublic(table, userId)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      if (route.params.id) {
        handleListProducts(route.params.id)
      }
    })

    return {
      columnsProducts,
      products,
      loading,
      formatCurrency,
      filter
    }
  }
})
</script>
