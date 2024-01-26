<template>
  <q-page>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import useAuth from 'src/composables/useAuth'

export default defineComponent({
  name: 'UserPage',

  setup () {
    const { user } = useAuth()

    return {
      user
    }
  }
})
</script>
