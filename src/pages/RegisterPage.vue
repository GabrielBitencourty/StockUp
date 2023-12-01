<template>
 <img src="https://images.pexels.com/photos/772803/pexels-photo-772803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" class="bg" alt="Background">
<q-page class="flex flex-center q-row">

<q-form class="row flex flex-center bg-white card-login2" @submit.prevent="handleRegister">
  <div class="col-md-4 col-sm-6 col-xs-10 full-width">

    <p class="col-12 text-h5 text-center">Crie sua conta agora!</p>

    <q-input color="primary" label="Name" v-model="form.name">
    <template v-slot:prepend>
        <q-icon name="person" color="primary"/>
       </template>
    </q-input>

    <q-input color="primary" label="Email" v-model="form.email">
      <template v-slot:prepend>
        <q-icon name="email" color="primary"/>
       </template>
    </q-input>

    <q-input color="primary" label="Password" v-model="form.password">
      <template v-slot:prepend>
        <q-icon name="lock" color="primary"/>
       </template>
    </q-input>
    <div class="full-width q-pt-md">
      <q-btn
          label="Criar Conta"
          color="primary"
          class="full-width"
          rounded
          type="submit"
          no-caps
        />
    </div>

    <q-btn
     label="Voltar"
     class="full-width q-mt-md"
     rounded
     no-caps
     flat
     to="/login"
    />

  </div>
</q-form>

<div class="bg-primary text-white text-right card">
    <h5>Bem vindo ao StockUp,<br>É otimo termos você em <br class="mob"> nossa equipe </h5>
    <img src="../../public/create.png " class="l-img">
</div>

</q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuth from 'src/composables/useAuth'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PageRegister',

  setup () {
    const router = useRouter()
    const { register } = useAuth()

    const form = ref({
      name: '',
      email: '',
      password: ''
    })

    const handleRegister = async () => {
      try {
        await register(form.value)
        router.push({
          name: 'email-confirmation',
          query: { email: form.value.email }
        })
      } catch (error) {
        alert(error)
      }
    }

    return {
      form,
      handleRegister
    }
  }
})
</script>
