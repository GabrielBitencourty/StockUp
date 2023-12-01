<template>
 <img src="https://images.pexels.com/photos/772803/pexels-photo-772803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" class="bg" alt="Background">
  <q-page class="flex flex-center q-row">
    <div class="bg-primary text-white card">
            <h4>Verificação de acesso</h4>
            <p>Para sua segurança enviaremos um email com as informações necéssarias <br> para resetar a sua senha.</p>

            <q-btn
              label="Voltar"
              class="bg-white text-primary"
              rounded
              to="/login"
              no-caps
            />
        </div>

        <q-form class="flex flex-center bg-white forgot" @submit.prevent="handlePasswordReset">
          <div class="col-12 col-sm-6 col-xs-10 full-width">
            <p class="col-12 text-h5 text-center">Digite seu email.</p>

            <q-input
              color="primary"
              label="Email"
              v-model="email"
              >
              <template v-slot:prepend>
                <q-icon name="email" color="primary"/>
              </template>
            </q-input>

            <div class="q-pt-md">
                <q-btn
                  label="Solicitar Email"
                  color="primary"
                  class="full-width"
                  rounded
                  type="submit"
                  no-caps
                />
            </div>
            <div class="q-pt-md">
              <q-btn
                  label="Voltar"
                  class="bg-white text-primary back"
                  rounded
                  to="/login"
                />
            </div>

          </div>
        </q-form>

  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuth from 'src/composables/useAuth'

export default defineComponent({

  setup () {
    const { sendPasswordRestEmail } = useAuth()

    const email = ref('')

    const handlePasswordReset = async () => {
      try {
        await sendPasswordRestEmail(email.value)
        alert(`Um email foi enviado para ${email.value}`)
      } catch (error) {
        console.log('Erro ao enviar o Email', error.message)
      }
    }

    return {
      email,
      handlePasswordReset
    }
  }
})

</script>
