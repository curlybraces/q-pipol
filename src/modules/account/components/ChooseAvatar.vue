<template>
  <q-card>
    <div class="q-ma-sm q-pa-sm bg-red-1" v-if="error">
      <p>{{ error }}</p>
    </div>
    <q-uploader
      :factory="uploadFileByUploader"
      ref="uploader"
      label="Upload Avatar (Max file size (10K))"
      accept=".jpg, image/*"
      :max-file-size="10000"
    >
    </q-uploader>
  </q-card>
</template>

<script>
import { showSuccessNotification } from '../../../functions/function-show-notifications'
import { apolloClient } from '../../../boot/apollo-boost'
import { GET_CURRENT_USER } from '../../../graphql/queries'
import { UPLOAD_USER_AVATAR_MUTATION } from '../../../graphql/mutations' 

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
    uploadFileByUploader() {
      const file = this.$refs.uploader.files[0];
      return apolloClient
        .mutate({
          mutation: UPLOAD_USER_AVATAR_MUTATION,
          variables: {
            image: file
          },
          update: (store, { data: { uploadUserAvatar } }) => {
            const data = store.readQuery({
              query: GET_CURRENT_USER
            });

            data.getCurrentUser.image_url = uploadUserAvatar.image_url;

            store.writeQuery({
              query: GET_CURRENT_USER,
              data
            });
          }
        })
        .then(() => {
          showSuccessNotification({
            message: 'Successfully changed user image.'
          });
          this.$emit('close');
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
