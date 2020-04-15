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
			@uploaded="uploadComplete"
			>
		</q-uploader>
  </q-card>
</template>

<script>
import { AVATARS } from '../../data/avatars';
import { mapState, mapActions } from 'vuex';
import { gql } from 'apollo-boost'
import { uploadClient } from '../../boot/apollo-upload';
import {showSuccessNotification} from '../../functions/function-show-notifications';

export default {
  name: 'ChooseAvatar',
  props: ['avatar'],
  computed: {
    ...mapState('auth', ['image_url'])
  },
  data() {
    return {
      AVATARS,
      selectedAvatar: '',
      loading: false,
      error: '',
			image: null,
	    preview: null
    };
  },
  methods: {
    ...mapActions('auth', ['setImageUrl']),
	  uploadComplete() {
    	console.log('completed')
		},
		uploadFileByUploader() {
    	const file = this.$refs.uploader.files[0]
			uploadClient.mutate({
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
						})
						this.$emit('close')
					})
					.catch(err => {
						console.log(err)
					})
		},
	  uploadFile() {
    	console.log(this.$refs.uploader.files[0])
			uploadClient.mutate({
				mutation: gql`
					mutation uploadUserAvatar($image: Upload!) {
						uploadUserAvatar(image: $image) {
							id
							image_url
						}
					}
				`,
				variables: {
					image: this.$refs.uploader.files[0]
				}
			})
				.then(({ data }) => {
					console.log(data)
				})
				.catch(err => {
					console.log(err)
					return false;
				})
		},
	  showPreview() {
		  // const preview = document.querySelector('img');
		  const file = this.$refs.uploadedImage.files
		  const reader = new FileReader();

		  reader.addEventListener('load', function () {
			  // convert image file to base64 string
			  this.preview = reader.result;
		  }, false);

		  if (file) {
			  reader.readAsDataURL(file);
		  }

		  console.log(reader)
	  },
    select(i) {
      this.selectedAvatar = i;
    },
    saveAvatar() {
      this.error = '';
      this.loading = true;
      if (this.selectedAvatar === '') {
        this.loading = false;
        this.error = 'Please select avatar.';
      } else {
        this.setImageUrl(this.selectedAvatar);
        setTimeout(() => {
          this.$emit('close');
          this.loading = false;
        }, 1000);
      }
    }
  },
  mounted() {
    if (this.$props.avatar) {
      this.selectedAvatar = this.$props.avatar;
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
