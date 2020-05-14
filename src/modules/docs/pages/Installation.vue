<template>
  <q-page padding>
    <q-markdown>
## Installation
    </q-markdown>

    <div class="text-center">
      <q-markdown>
![PWA](statics/docs/progressive-web-app.jpg =400x400)
      </q-markdown>
    </div>

    <q-markdown>
### Requirement/s 

You must have a device running Android or Windows
connected to the internet. Unfortunately, Apple devices currently do not
support progressive web applications. 

### Install PWA on desktop 

It is also possible to install a desktop PWA! Many popular browsers have already
integrated the PWA Install experience to the omnibox. To install a
Progressive Web App to your desktop: 
1. Open a web app in your preferred
browser. 
2. Click on an install button in the address bar. 3. Click
Install. 

### Install PWA on Android device 
1. Open a URL address of a PWA
you want to install in your browser. 
2. Open your browser’s settings. 
3. Scroll down and tap Add to Home screen. 
4. Confirm by tapping Add. 

### Uninstall 
To uninstall from desktop, open the app and tap on the three
vertical dots ( &vellip; ) and select **Uninstall**. To uninstall from
Android device, just long press on the app and uninstall like any other
Android app.
    </q-markdown>
  </q-page>
</template>

<script>
import installation from '../../../markdowns/installation.md';

export default {
  name: 'InstallationPage',
  data() {
    return {
      installation: installation
    };
  }
};
</script>
