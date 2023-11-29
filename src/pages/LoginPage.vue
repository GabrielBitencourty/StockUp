<template>
   <img src="https://images.pexels.com/photos/772803/pexels-photo-772803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" class="bg" alt="Background">
   <q-page class="flex flex-center q-row">

    <div class="bg-primary text-white card">
      <h4>Olá, seja bem vindo de volta</h4>
      <img src="../../public/login.png" class="l-img" alt="Background da login page">
    </div>

    <q-form class="row flex flex-center bg-white card-login" @submit.prevent="handleLogin">
      <div class="col-md-4 col-sm-6 col-xl-10 full-width">

        <p class="col-12 text-h5 text-center">Faça seu login agora!</p>

        <q-input color="primary" label="Email" v-model="form.email">
          <template v-slot:prepend>
            <q-icon name="email" color="primary"/>
           </template>
        </q-input>

        <q-input color="primary" label="Password"  v-model="form.password">
          <template v-slot:prepend>
            <q-icon name="lock" color="primary"/>
           </template>
        </q-input>

        <div class="q-pt-md full-width text-right">
          <a href="/forgot-password" class="text-primary d-none">
            Esqueceu a senha?
          </a>
        </div>

        <div class="full-width q-pt-md">
          <q-btn
              label="Login"
              color="primary"
              class="full-width"
              rounded
              type="submit"
              no-caps
            />
        </div>

        <q-btn
         label="Criar uma conta"
         class="full-width q-mt-md"
         rounded
         no-caps
         flat
         to="/register"
        />

      </div>
    </q-form>

   </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuth from 'src/composables/useAuth'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PageLogin',

  setup () {
    const router = useRouter()
    const { login } = useAuth()
    const form = ref({
      email: '',
      password: ''
    })

    const handleLogin = async () => {
      try {
        await login(form.value)
        router.replace({ name: 'user-page' })
      } catch (error) {
        alert(error.message)
      }
    }

    return {
      form,
      handleLogin
    }
  }
})
</script>
