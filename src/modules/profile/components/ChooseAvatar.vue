<template>
  <q-card>
    <div class="q-ma-sm q-pa-sm bg-red-1" v-if="error">
      <p>{{ error }}</p>
    </div>
    <q-uploader
      :factory="uploadFileByUploader"
      ref="uploader"
      label="Upload Avatar (Max file size (50KB))"
      accept=".jpg, image/*"
      :max-file-size="50000"
			@finish="$emit('close')"
    >
    </q-uploader>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
import { showSuccessNotification } from '@/functions/function-show-notifications'
import { client } from '@/boot/apollo'
import { GET_CURRENT_USER } from '@/graphql/queries'
import { UPLOAD_USER_AVATAR_MUTATION } from '@/graphql/mutations'

export default {
  name: 'ChooseAvatar',
  data() {
    return {
      loading: false,
      error: '',
      image: null,
      preview: null
    };
  },
  methods: {
  	...mapActions('auth',['uploadUserAvatar']),
    uploadFileByUploader() {
      const file = this.$refs.uploader.files[0];

      const payload = {
      	image: file
			}

	    return new Promise((resolve, reject) => {
		    try {
			    resolve(this.uploadUserAvatar(payload));
		    } catch (err) {
			    reject(err);
		    }
	    });
    }
  }
};
</script>
