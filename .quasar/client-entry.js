/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding startup/initialization code.
 * Use "quasar new boot <name>" and add it there.
 * One boot file per concern. Then reference the file(s) in quasar.conf.js > boot:
 * boot: ['file', ...] // do not add ".js" extension to it.
 *
 * Boot files are your "main.js"
 **/



import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'

import '@quasar/extras/roboto-font/roboto-font.css'

import '@quasar/extras/material-icons/material-icons.css'



import '@quasar/extras/animate/zoomIn.css'

import '@quasar/extras/animate/zoomOut.css'

import '@quasar/extras/animate/fadeIn.css'

import '@quasar/extras/animate/fadeOut.css'


// We load Quasar stylesheet file
import 'quasar/dist/quasar.styl'




import 'src/css/app.styl'

import '@quasar/quasar-ui-qmarkdown/src/index.sass'


import Vue from 'vue'
import createApp from './app.js'




import qboot_Bootapollo from 'boot/apollo'

import qboot_Bootaxios from 'boot/axios'

import qboot_Bootrouterauth from 'boot/router-auth'

import qboot_Boottest from 'boot/test'

import qboot_Bootloadingdefaults from 'boot/loading-defaults'

import qboot_Quasarquasarappextensionqmarkdownsrcbootregisterjs from '@quasar/quasar-app-extension-qmarkdown/src/boot/register.js'







Vue.config.devtools = true
Vue.config.productionTip = false



console.info('[Quasar] Running SPA.')





async function start () {
  const { app, store, router } = await createApp()

  

  
  let routeUnchanged = true
  const redirect = url => {
    routeUnchanged = false
    window.location.href = url
  }

  const urlPath = window.location.href.replace(window.location.origin, '')
  const bootFiles = [qboot_Bootapollo,qboot_Bootaxios,qboot_Bootrouterauth,qboot_Boottest,qboot_Bootloadingdefaults,qboot_Quasarquasarappextensionqmarkdownsrcbootregisterjs]

  for (let i = 0; routeUnchanged === true && i < bootFiles.length; i++) {
    if (typeof bootFiles[i] !== 'function') {
      continue
    }

    try {
      await bootFiles[i]({
        app,
        router,
        store,
        Vue,
        ssrContext: null,
        redirect,
        urlPath
      })
    }
    catch (err) {
      if (err && err.url) {
        window.location.href = err.url
        return
      }

      console.error('[Quasar] boot error:', err)
      return
    }
  }

  if (routeUnchanged === false) {
    return
  }
  

  

    

    

    
      new Vue(app)
    

    

    

  

}

start()
