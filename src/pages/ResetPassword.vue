<template>
  <img src="https://images.pexels.com/photos/772803/pexels-photo-772803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" class="bg" alt="Background">
  <q-page class="flex flex-center q-row">
    <div class="bg-primary text-white card">
      <h4>Segurança da conta</h4>
      <p>Escolha uma senha forte para evitar perdas em sua conta<br> e danos por ataques Hakers</p>

      <q-btn
        label="Cancelar"
        class="bg-white text-primary"
        rounded
        no-caps
        to="/login"
      />
      </div>
      <q-form class="flex flex-center bg-white forgot" @submit.prevent="handlePasswordReset">
        <div class="col-12 col-sm-6 col-xs-10 full-width">
          <p class="col-12 text-h5 text-center">Digite sua nova senha</p>

          <q-input
            color="primary"
            label="Nova Senha"
            v-model="password"
            >
            <template v-slot:prepend>
              <q-icon name="lock" color="primary"/>
            </template>
          </q-input>

          <div class="q-pt-md">
              <q-btn
                label="Salvar Senha"
                color="primary"
                class="full-width"
                rounded
                type="submit"
                no-caps
              />
          </div>

        </div>
      </q-form>

  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuth from 'src/composables/useAuth'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'PageResetPassword',
  setup () {
    const { resetPassword } = useAuth()
    const route = useRoute()
    const router = useRouter()
    const token = route.query.token

    const password = ref('')

    const handlePasswordReset = async () => {
      await resetPassword(token, password.value)
      router.push({ name: 'login' })
    }

    return {
      password,
      handlePasswordReset
    }
  }
})
</script>
