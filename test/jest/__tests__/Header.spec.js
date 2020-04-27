import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { mount, createLocalVue } from '@vue/test-utils';
import Header from '../../../src/modules/shared/components/Header';
import * as All from 'quasar'

const { Quasar } = All

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VueRouter)

const components = Object.keys(All).reduce((object, key) => {
	const val = All[key]
	if (val && val.component && val.component.name != null) {
		object[key] = val
	}
	return object
}, {})

localVue.use(Quasar, { components })

const router = new VueRouter()

const spy = jest.fn()

describe('Header.vue', () => {
	let store
	let wrapper
	
	beforeEach(() => {
		const authModule = {
			namespaced: true,
			state: {
				user: {
					name: 'Lester',
					imageUrl: '',
					unreadNotifications: []
				},
				loading: false
			},
			getters: {
				user(state) {
					return state.user.name
				},
				loading(state) {
					return state.loading
				},
				imageUrl(state) {
					return state.user.imageUrl
				}
			}
		}
		
		const settingsModule = {
			namespaced: true,
			state: {
				dark: false
			}
		}
		
		store = new Vuex.Store({
			modules: {
				auth: authModule,
				settings: settingsModule
			}
		})
		
		wrapper = mount(Header, {
			store,
			router,
			localVue
		})
	})
	
	it('renders toolbar when mounted', () => {
		
		expect(wrapper.name()).toMatch('AppHeader')
		
		expect(wrapper.text()).toMatch('Investment Programming and Management System')
		
		expect(wrapper.find('img').exists()).toBe(true)
		
		expect(wrapper.find('.q-separator').exists()).toBe(true)
		
		expect(wrapper.contains('button')).toBe(true)
		
	})
	
	it('calls router when img is clicked',() => {
		wrapper.vm.$router.push = spy
		
		wrapper.find('img').trigger('click')
		
		expect(spy).toHaveBeenCalledWith({ name: 'home' })
	})
	
})
