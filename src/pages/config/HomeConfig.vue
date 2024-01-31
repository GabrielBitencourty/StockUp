<template>
  <q-page padding>

    <div>
      <h6>Bem vindo a pagina de configuração da sua loja.</h6>
    </div>

    <q-card class="my-card q-ma-md">
      <q-card-section class="bg-primary text-white flex flex-center justify-between">
        <div class="text-h6">Informações da Loja</div>
        <div class="text-subititle">Nome da Loja</div>
      </q-card-section>

      <q-card-section>
        <div>
          <q-form class="flex justify-between" padding>

            <q-input
              label="Nome da sua loja"
              class="myInput"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Por favor Digite um nome valido']"
            >
             <template v-slot:prepend>
               <q-icon name="mdi-store" color="primary"/>
             </template>
            </q-input>

            <q-input
              label="Numero do Whatsapp"
              mask="(##)#####-####"
              class="myInput"
              unmasked-value
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Digite um nome valido']"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-whatsapp" color="primary"/>
              </template>

              <template v-slot:append>
                <q-icon
                  name="mdi-information-outline"
                  class="cursor-pointer"
                />
              </template>
            </q-input>

            <q-input
              label="Menssagem Padrão"
              class="myInput"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Digite Alguma menssagem']"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-message-text-outline" color="primary"/>
              </template>

              <template v-slot:append>
                <q-icon
                  name="mdi-information-outline"
                  class="cursor-pointer"
                />
              </template>

            </q-input>

            <q-input
              label="Selecionar banner da loja"
              class="myInput"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Digite Alguma menssagem']"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-image-filter-hdr" color="primary"/>
              </template>
            </q-input>

            <div class="flex flex-center q-gutter-x-xl q-pt-md">
              <q-btn
                label="Selecionar Cor Primaria"
                rounded
                no-caps
                color="primary"
              />
              <q-btn
                label="Selecionar Cor Secondaria"
                rounded
                no-caps
                color="secondary"
              />
            </div>

          </q-form>

          <div class="flex flex-center q-pt-xl">
            <q-btn
              label="Salvar Configurções"
              type="submit"
              no-caps
              rounded
              color="primary"
            />
          </div>

        </div>
      </q-card-section>

    </q-card>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeConfigPage',

  setup () {
    return {
    }
  }
})
</script>
