<template>
  <q-dialog
    :full-width="$q.platform.is.mobile"
    :model-value="show"
    @before-hide="handleClose"
  >
    <q-card>

      <q-card-section>
        <div class="text-h6">
            Detalhes
        </div>
      </q-card-section>

      <q-card-section>
        <q-img :src="product.img_url" :ratio="4/3" style="min-width: 300px" />
      </q-card-section>

      <q-card-section>
        <div class="text-h6">
          {{ product.name }}
        </div>

        <div class="text-subtitle2">
          {{  formatCurrency(product.price)}}
        </div>

        <div class="text-body2" v-html="product.description" />

      </q-card-section>

      <q-card-actions>

        <q-btn
          label="Cancelar"
          color="primary"
          outline
          no-caps
          v-close-popup
        />

        <q-btn
          v-if="brand.phone"
          label="Fazer Pedido"
          icon="mdi-whatsapp"
          color="green-7"
          no-caps
          @click="handleSendWpp"
        />

      </q-card-actions>

    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import { formatCurrency } from 'src/utils/format'
import { openURL } from 'quasar'
import useApi from 'src/composables/useApi'

export default defineComponent({
  name: 'DialogProducts',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    product: {
      type: Object
    }
  },

  setup (props, { emit }) {
    const { brand } = useApi()

    const handleClose = () => {
      emit('hideDialog')
    }

    const handleSendWpp = () => {
      const link = encodeURI(`https://api.whatsapp.com/send?phone=55${brand.value.phone}&text=${brand.value.message} - ${props.product.name} - ${formatCurrency(props.product.price)}`)
      openURL(link)
    }

    return {
      formatCurrency,
      handleClose,
      handleSendWpp,
      brand
    }
  }
})
</script>
