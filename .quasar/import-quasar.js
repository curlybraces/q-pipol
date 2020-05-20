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

import iconSet from 'quasar/icon-set/svg-material-icons'


import Vue from 'vue'

import {Quasar,QBtn,QIcon,TouchPan,Ripple,BottomSheet,Dialog,LocalStorage,Notify,LoadingBar,Dark,Loading} from 'quasar'


Vue.use(Quasar, { config: {"dark":"auto"},iconSet: iconSet,components: {QBtn,QIcon},directives: {TouchPan,Ripple},plugins: {BottomSheet,Dialog,LocalStorage,Notify,LoadingBar,Dark,Loading} })
