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
import { gql } from 'apollo-boost';
import { uploadClient } from '../../boot/apollo-upload';
import { showSuccessNotification } from '../../functions/function-show-notifications';

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
      uploadClient
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

<style>
.q-img.active {
  -moz-box-shadow: 0px 0px 2px 3px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 0px 2px 3px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 0px 2px 3px rgba(0, 0, 0, 0.3);
}
</style>
