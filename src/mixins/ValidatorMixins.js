export const ValidatorMixins = {
	data() {
		return {
			rules: {
				required: [
					val => !!val || '* Required'
				]
			}
		}
	}
}

export default ValidatorMixins;