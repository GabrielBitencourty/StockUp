<template>
   <img src="https://images.pexels.com/photos/301391/pexels-photo-301391.jpeg?auto=compress&cs=tinysrgb&w=600" class="bg" alt="Background">
   <q-page class="flex flex-center q-row">

    <div class="bg-primary text-white card">
      <h4>Olá, seja bem vindo <br class="mob"> de volta</h4>
      <img src="../../public/login.png" class="l-img" alt="Background da login page">
    </div>

    <q-form class="row flex flex-center bg-white card-login" @submit.prevent="handleLogin">
      <div class="col-md-4 col-sm-6 col-xl-10 full-width">

        <p class="col-12 text-h5 text-center">Faça seu login agora!</p>

        <q-input
          ref="nameRef"
          color="primary"
          label="Email"
          v-model="form.email"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Digite um email valido']"
        >
          <template v-slot:prepend>
            <q-icon name="email" color="primary"/>
           </template>
        </q-input>

        <q-input
          ref="passwordRef"
          color="primary"
          label="Password"
          id="q-app"
          v-model="form.password"
          :type="isPwd ? 'password' : 'text'"
          lazy-rules
          :rules="[val => (val && val.length > 6) || 'Digite sua senha']"
        >
          <template v-slot:prepend>
            <q-icon name="lock" color="primary"/>
          </template>

          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click=" isPwd = !isPwd"
            />
          </template>
        </q-input>

        <div class="q-pt-md full-width text-right">
          <q-btn
            label="Esqueceu a senha?"
            color="primary"
            rounded
            flat
            no-caps
            to="/forgot-password"
          />
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
import { defineComponent, ref, onMounted } from 'vue'
import useAuth from 'src/composables/useAuth'
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/useNotify'

export default defineComponent({
  name: 'PageLogin',

  setup () {
    const router = useRouter()
    const { login, isLoggedIn } = useAuth()
    const form = ref({
      email: '',
      password: ''
    })

    onMounted(() => {
      if (isLoggedIn) {
        router.push({ name: 'user-page' })
      }
    })

    const { notifyError, notifySuccess } = useNotify()

    const handleLogin = async () => {
      try {
        await login(form.value)
        notifySuccess('Logado com sucesso')
        router.replace({ name: 'user-page' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      form,
      handleLogin,

      password: (''),
      isPwd: ref(true),
      email: ref(''),
      search: ref(''),
      tel: ref(''),
      url: ref(''),
      time: ref(''),
      date: ref('')
    }
  }
})
</script>
