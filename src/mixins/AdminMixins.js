import { mapState } from 'vuex';

const AdminMixins = {
  computed: {
    ...mapState('auth',['role']),
    admin() {
      return this.role === 'admin' || this.role === 'superadmin';
    }
  }
};

export default AdminMixins;
