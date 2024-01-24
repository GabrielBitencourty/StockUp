<template>
  <q-page padding>
    <div class="row">
      <q-table
       grid
       :rows="products"
       :columns="columnsProducts"
       row-key="id"
       class="col-12"
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
         <div class="q-pa-sm col-xs-12 col-sm-6 col-md-4">
          <q-card class="cursor-pointer" v-ripple:primary @click="handleShowDetails(props.row)">
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
    <dialog-product
      :show="showDialogDetails"
      :product="productDetails"
      @hide-dialog="showDialogDetails = false"
    />
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composables/useApi'
import useNotify from 'src/composables/useNotify'
import { columnsProducts } from './table'
import { useRoute } from 'vue-router'
import { formatCurrency } from 'src/utils/format'
import DialogProduct from 'src/components/DialogProduct.vue'

export default defineComponent({
  name: 'pageProductsPublic',
  components: {
    DialogProduct
  },

  setup () {
    const products = ref([])
    const loading = ref(true)
    const table = 'products'
    const route = useRoute()
    const filter = ref('')
    const { listPublic } = useApi()
    const { notifyError } = useNotify()

    const showDialogDetails = ref(false)
    const productDetails = ref({})

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

    const handleShowDetails = (product) => {
      productDetails.value = product
      showDialogDetails.value = true
    }

    return {
      columnsProducts,
      products,
      loading,
      formatCurrency,
      filter,
      productDetails,
      showDialogDetails,
      handleShowDetails
    }
  }
})
</script>
