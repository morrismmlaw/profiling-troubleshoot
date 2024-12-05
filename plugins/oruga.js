
// import Oruga
import Oruga from '@oruga-ui/oruga-next'

// import Oruga Bootstrap theme config
import { bootstrapConfig } from '@oruga-ui/theme-bootstrap'

// import Bootstrap and Oruga styling
import '@oruga-ui/theme-bootstrap/dist/bootstrap.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Oruga, bootstrapConfig);
})
