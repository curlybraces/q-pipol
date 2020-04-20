// hijack CTRL+F to focus on search input
const FindListener = {
	mounted() {
		window.addEventListener('keydown', e => {
			if (e.ctrlKey && e.keyCode === 70) {
				e.preventDefault();
				this.$refs.searchBox.$el.focus();
			}
		});
	}
};

export default FindListener;