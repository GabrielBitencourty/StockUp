<template>
  <q-page padding>
    <div class="row">

      <q-table
        grid
        class="my-sticky-virtscroll-table col-12"
        :rows="products"
        :columns="columnsProducts"
        row-key="id"
        :loading="loading"
        :filter="filter"
        :rows-per-page-options="[0]"
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
         <div class="q-pa-md col-xs-10 col-sm-6 col-md-3">
          <q-card class="cursor-pointer my-card" v-ripple:primary>
            <q-img :src="props.row.img_url" :ratio="4/3" />
            <q-card-section>
              <q-btn
                fab
                @click="handleShowDetails(props.row)"
                color="primary"
                icon="mdi-whatsapp"
                class="absolute"
                style="top: 0; right: 12px; transform: translateY(-50%);"
              />

              <div class="row no-wrap items-center">
                <div class="col text-h6 ellipsis">
                  {{ props.row.name }}
                </div>
                <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
                  <q-icon name="mdi-store" />
                    {{ props.row.amount }}
                </div>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="text-subtitle1 text-skyBlue">
                {{ formatCurrency(props.row.price) }}
              </div>
              <div class="text-caption text-grey">
                {{ props.row.description }}
              </div>
            </q-card-section>

            <q-card-actions class="flex flex-center">
              <q-btn
                label="Adicionar a Sacola"
                class="bg-primary q-mb-md text-white"
                rounded
                no-caps
                icon="mdi-shopping"
              >
              </q-btn>
            </q-card-actions>

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
