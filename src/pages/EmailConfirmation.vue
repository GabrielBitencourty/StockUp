<template>
<img src="https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" class="bg" alt="Background">
<q-page class="flex flex-center q-row">
    <div class="bg-white card-email">
        <h4>Sejá bem vindo a equipe da <strong class="text-primary">StockUp</strong></h4>
        <p class="text-black">Um email de confirmação foi enviado para <strong>{{ $route.query.email }}</strong>, por favor verifique seu email para ter acesso a plataforma</p>
        <q-btn
        label="Verificar Email"
        color="primary"
        class="full-width"
        rounded
        target="_blank"
        href="https://mail.google.com/mail//#inbox"
        type="submit"
        no-caps
        />
    </div>
</q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageEmailConfirmation'
})
</script>
