<template>
 <img src="https://images.pexels.com/photos/301391/pexels-photo-301391.jpeg?auto=compress&cs=tinysrgb&w=600" class="bg" alt="Background">
  <q-page class="flex flex-center q-row">
    <div class="bg-primary text-white card">
            <h4>Verificação de acesso</h4>
            <p>Para sua segurança enviaremos um email com as informações <br class="mob"> necéssarias <br class="m2"> para resetar a sua senha.</p>

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
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Digite um email valido']"
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
                  no-caps
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
import useNotify from 'src/composables/useNotify'

export default defineComponent({

  setup () {
    const { sendPasswordRestEmail } = useAuth()

    const email = ref('')

    const { notifySuccess, notifyError } = useNotify()

    const handlePasswordReset = async () => {
      try {
        await sendPasswordRestEmail(email.value)
        notifySuccess('Email enviado com suceso!')
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      email,
      handlePasswordReset
    }
  }
})

</script>
