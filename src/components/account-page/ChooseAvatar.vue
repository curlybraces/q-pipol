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
import gql from 'graphql-tag';
import { showSuccessNotification } from '../../functions/function-show-notifications';
import { apolloClient } from '../../boot/apollo-boost';

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
      apolloClient
        .mutate({
          mutation: gql`
            mutation uploadUserAvatar($image: Upload!) {
              uploadUserAvatar(image: $image) {
                id
                image_url
              }
            }
          `,
          variables: {
            image: file
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
