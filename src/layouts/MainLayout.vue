<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="$q.platform.is.mobile"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="logo">
          StockUp
        </q-toolbar-title>
        <q-btn-dropdown flat icon="mdi-account">
          <q-list>
            <q-item clickable v-close-popup @click="handleLogout">
              <q-item-section>
                <q-item-label>Sair da Conta</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import useAuth from 'src/composables/useAuth'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import useApi from 'src/composables/useApi'
import useNotify from 'src/composables/useNotify'

const linksList = [
  {
    title: 'Home',
    icon: 'mdi-home',
    routeName: 'user-page'
  },
  {
    title: 'Category',
    icon: 'mdi-shape-outline',
    routeName: 'category'
  },
  {
    title: 'Products',
    icon: 'mdi-archive',
    routeName: 'product'
  },
  {
    title: 'config',
    icon: 'mdi-cog',
    routeName: 'config'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const $q = useQuasar()
    const { notifyInfo } = useNotify()
    const router = useRouter()
    const { logout } = useAuth()
    const { getBrand } = useApi()

    onMounted(() => {
      getBrand()
    })

    const handleLogout = async () => {
      $q.dialog({
        title: 'Atenção',
        message: 'Deseja realmente sair de sua conta?',
        persistent: true,
        cancel: true
      }).onOk(async () => {
        await logout()
        notifyInfo()
        router.replace({ name: 'login' })
      })
    }

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      handleLogout
    }
  }
})
</script>
