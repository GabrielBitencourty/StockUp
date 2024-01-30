<template>
  <q-page padding class="justify-between">

    <div v-if="$q.platform.is.desktop">
      <q-btn
        label="Minha Loja"
        rounded
        color="blue-4"
        no-caps
        class="q-ma-md"
        padding
        icon="mdi-store"
        @click="handleGoToStore"
      />

      <q-btn
        label="Novo Produto"
        rounded
        color="red"
        no-caps
        class="q-ma-md"
        padding
        icon="mdi-layers-plus"
        :to="{ name: 'form-product' }"
      />

      <q-btn
        label="Nova Categoria"
        rounded
        color="teal-14"
        no-caps
        class="q-ma-md"
        padding
        icon="mdi-tag-plus"
        :to="{ name: 'form-category' }"
      />

      <q-btn
        label="Cupom de Desconto"
        rounded
        color="yellow"
        no-caps
        class="q-ma-md"
        padding
        icon="mdi-tag-off"
      />

      <q-btn
        label="Configurações da Loja"
        rounded
        color="orange"
        no-caps
        class="q-ma-md"
        padding
        icon="mdi-cog-outline"
        :to="{ name: 'products' }"
      />
    </div>

    <div class="q-pt-md flex justify-between cards">
      <q-card class="myCard flex flex-center">
        <q-card-section>
          <div class="q-pt-none">
            <div class="text-primary text-h6">
              Total de pedidos
              <q-icon
                name="mdi-credit-card-check-outline"
                size="sm"
                class="q-pl-sm"
                color="primary"
              />
            </div>
            <div class="text-h5 q-pt-md">750 <strong class="text-caption text-secondary">Un</strong></div>
          </div>
        </q-card-section>
      </q-card>

      <q-card class="myCard flex flex-center">
        <q-card-section>
          <div class="q-pt-none">
            <div class="text-primary text-h6">
              Enviados
              <q-icon
                name="mdi-truck-check"
                size="sm"
                class="q-pl-sm"
                color="primary"
              />
            </div>
            <div class="text-h5 q-pt-md">689 <strong class="text-caption text-secondary">Un</strong></div>
          </div>
        </q-card-section>
      </q-card>

      <q-card class="myCard flex flex-center">
        <q-card-section>
          <div class="q-pt-none">
            <div class="text-primary text-h6">
              Lucro Total
              <q-icon
                name="mdi-cash-register"
                size="sm"
                class="q-pl-sm"
                color="primary"
              />
            </div>
            <div class="text-h5 q-pt-md">R$: 5.679,90</div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="flex justify-center">
      <q-btn
        label="Ver Todos os Dados Completos"
        rounded
        no-caps
        color="primary"
        class="q-mt-xl"
      />
    </div>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import useAuth from 'src/composables/useAuth'
import { useRouter } from 'vue-router'
import { openURL } from 'quasar'

export default defineComponent({
  name: 'UserPage',

  setup () {
    const { user } = useAuth()
    const router = useRouter()

    const handleGoToStore = () => {
      const idUser = user.value.id
      const link = router.resolve({ name: 'products', params: { id: idUser } })
      openURL(window.origin + link.href)
    }

    return {
      user,
      handleGoToStore
    }
  }
})
</script>
