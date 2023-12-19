import { useQuasar } from 'quasar'

export default function useNotify () {
  const $q = useQuasar()

  const notifySuccess = (message) => {
    $q.notify({
      type: 'positive',
      message: message || 'All rigth!',
      position: 'top',
      timeout: 2000
    })
  }

  const notifyError = (message) => {
    $q.notify({
      type: 'negative',
      message: message || 'Failled!',
      position: 'top',
      timeout: 2000
    })
  }

  const notifyInfo = (message) => {
    $q.notify({
      type: 'positive',
      icon: 'info',
      iconColor: 'white',
      message: message || 'Você saiu da sua conta!',
      position: 'top',
      timeout: 2000
    })
  }

  return {
    notifySuccess,
    notifyError,
    notifyInfo
  }
}
