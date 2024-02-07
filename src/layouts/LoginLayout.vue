<template>
  <q-layout view="1Hh lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="logo">
            StockUp
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import useApi from 'src/composables/useApi'

export default defineComponent({
  name: 'LoginLayout',

  setup () {
    const { getBrand } = useApi()

    onMounted(() => {
      getBrand()
    })

    return {

    }
  }
})
</script>
