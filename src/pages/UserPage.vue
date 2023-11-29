<template>
<q-page class="flex flex-center">
    <div>
      <h4>Olá{{ user.user_metadata.name }}, seja bem vindo.</h4>
    </div>
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
