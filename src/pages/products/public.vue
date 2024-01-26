<template>
  <div v-if="$q.platform.is.desktop">
    <q-carousel
      swipeable
      animated
      v-model="slide"
      :autoplay="autoplay"
      ref="carousel"
      infinite
      height="470px"
      transition-prev="slide-right"
      transition-next="slide-left"
    >

      <q-carousel-slide :name="1" img-src="../../../public/img/1.png"/>
      <q-carousel-slide :name="2" img-src="../../../public/img/2.png"/>
      <q-carousel-slide :name="3" img-src="../../../public/img/3.png"/>
    </q-carousel>
  </div>

  <q-page padding>
    <div class="payments" v-if="$q.platform.is.desktop">

      <q-card padding class="flex flex-center justify-between">

        <q-card-section>
          <div class="flex flex-center">
            <q-icon
              name="mdi-contactless-payment-circle-outline"
              size="md"
              class="q-pr-md"
              color="primary"
            />
            <div class="text-primary q-pt-md">
              Pague no Pix
              <p class="text-caption text-black">Com desconto de 10%</p>
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <div class="flex flex-center">
            <q-icon
              name="mdi-credit-card-check-outline"
              size="md"
              class="q-pr-md"
              color="primary"
            />
            <div class="text-primary q-pt-md">
              Dividimos no Cartão
              <p class="text-caption text-black">Em até 10x</p>
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <div class="flex flex-center">
            <q-icon
              name="mdi-truck-fast"
              size="md"
              class="q-pr-md"
              color="primary"
            />
            <div class="text-primary q-pt-md">
              Entrega Rapida
              <p class="text-caption text-black">Enviamos em até 5 dias</p>
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <div class="flex flex-center">
            <q-icon
              name="mdi-account-convert"
              size="md"
              class="q-pr-md"
              color="primary"
            />
            <div class="text-primary q-pt-md">
              Devolução Gratis
              <p class="text-caption text-black">Devolva sem custo em até 7 dias</p>
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <div class="flex flex-center">
            <q-icon
              name="mdi-face-agent"
              size="md"
              class="q-pr-md"
              color="primary"
            />
            <div class="text-primary q-pt-md">
              Suporte 24h
              <p class="text-caption text-black">Atendimento online pelo Whatsapp</p>
            </div>
          </div>
        </q-card-section>

      </q-card>

    </div>

    <div class="row q-pt-xl">
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
            Mais Vendidos da Semana
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
                disable
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
      handleShowDetails,

      slide: ref(1),
      autoplay: ref(true)
    }
  }
})
</script>
