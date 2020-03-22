// import something here
import VuexPersistence from 'vuex-persist';
import localforage from 'localforage';

export const vuexLocal = new VuexPersistence({
  key: 'vuex',
  storage: localforage,
  modules: ['options', 'contacts'],
  asyncStorage: true
});

// "async" is optional
export default async (
  {
    /* app, router, Vue, ... */
  }
) => {
  // something to do
};
