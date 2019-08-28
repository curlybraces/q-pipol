import { register } from 'register-service-worker'
import { Dialog, Notify } from 'quasar'

// The ready(), registered(), cached(), updatefound() and updated()
// events passes a ServiceWorkerRegistration instance in their arguments.
// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration

register(process.env.SERVICE_WORKER_FILE, {
  // The registrationOptions object will be passed as the second argument
  // to ServiceWorkerContainer.register()
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Parameter

  // registrationOptions: { scope: './' },

  ready () {
    console.log('App is being served from cache by a service worker.')
  },

  registered (registration) {
    console.log('Service worker has been registered.',registration)
  },

  cached (registration) {
    console.log('Content has been cached for offline use.',registration)
  },

  updatefound (registration) {
    console.log('New content is downloading.',registration)
  },

  updated (registration) {
    console.log('New content is available; please refresh.',registration);
    Dialog.create({
      title: "Update available",
      message: "New contents are available. Please refresh by clicking OK. You may also refresh the app by pressing CTRL+F5 in your keyboard.",
      persistent: true,
      ok: {
        color: "primary",
        flat: false
      },
      cancel: true
    })
    .onOk(() => {
      window.location.reload(true);
    });
  },

  offline () {
    console.log('No internet connection found. App is running in offline mode.')
    Notify.create({
      message: "No internet connection found. App is running in offline mode. You do not have access to the latest data while offline."
    })
  },

  error (err) {
    console.error('Error during service worker registration:', err)
  }
})
