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


// We load Quasar stylus files
import 'quasar/dist/quasar.styl'




import 'src/css/app.styl'


import Vue from 'vue'
import createApp from './app.js'


import 'app/src-pwa/register-service-worker.js'



import qboot_Bootaxios from 'boot/axios'

import qboot_Bootrouterauth from 'boot/router-auth'

import qboot_Bootloadingdefaults from 'boot/loading-defaults'

import qboot_Bootaddressbarcolor from 'boot/addressbar-color'

import qboot_Bootnotifydefaults from 'boot/notify-defaults'





import FastClick from 'fastclick'








const { app, store, router } = createApp()



// Needed only for iOS PWAs
if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && window.navigator.standalone) {

  document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body)
  }, false)
}


async function start () {
  
  const bootFiles = [qboot_Bootaxios,qboot_Bootrouterauth,qboot_Bootloadingdefaults,qboot_Bootaddressbarcolor,qboot_Bootnotifydefaults]
  for (let i = 0; i < bootFiles.length; i++) {
    if (typeof bootFiles[i] !== 'function') {
      continue
    }

    try {
      await bootFiles[i]({
        app,
        router,
        store,
        Vue,
        ssrContext: null
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
  

  

    

    

      new Vue(app)

    

  

}

start()
