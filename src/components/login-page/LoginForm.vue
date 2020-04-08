<template>
	<q-card class="my-card">
		<div class="row q-pa-md text-weight-light text-h6">
			{{
			tab == 'login'
			? 'Login to your IPMS Account'
			: 'Create an IPMS Account'
			}}
		</div>

		<q-separator spaced />

		<q-card-section class="q-pa-md">
			<q-form
					ref="loginForm"
					class="q-gutter-md"
					@submit="handleSubmit"
					novalidate="true"
					greedy
			>
				<q-input
						outlined
						placeholder="Email"
						type="email"
						v-model="username"
						:rules="required"
				>
					<template v-slot:prepend>
						<q-icon name="email"></q-icon>
					</template>
					<template v-slot:append>
						<q-icon
								color="green"
								name="done_outline"
								v-if="availableEmail"
						/>
					</template>
				</q-input>

				<q-input
						outlined
						placeholder="Password"
						:type="!passwordVisibility ? 'password' : 'text'"
						v-model="password"
						:rules="required"
				>
					<template v-slot:prepend>
						<q-icon name="vpn_key"></q-icon>
					</template>
					<template v-slot:append>
						<q-icon
								:name="
                      !passwordVisibility ? 'visibility' : 'visibility_off'
                    "
								@click="passwordVisibility = !passwordVisibility"
						></q-icon>
					</template>
				</q-input>

				<q-input
						v-if="tab == 'signup'"
						outlined
						placeholder="Confirm Password"
						:type="!passwordVisibility ? 'password' : 'text'"
						v-model="password_confirmation"
						:rules="required"
				>
					<template v-slot:prepend>
						<q-icon name="vpn_key"></q-icon>
					</template>
					<template v-slot:append>
						<q-icon
								:name="
                      !passwordVisibility ? 'visibility' : 'visibility_off'
                    "
								@click="passwordVisibility = !passwordVisibility"
						></q-icon>
					</template>
				</q-input>

				<div class="row">
					<q-btn
							size="lg"
							class="full-width btn-login"
							type="submit"
							:color="dark ? 'purple-1' : 'primary'"
							unelevated
							:loading="loading"
					>
						{{ tab == 'login' ? 'Login' : 'Sign up' }}
					</q-btn>
				</div>
				<div class="text-center">
                <span
										class="text-blue text-weight-lighter cursor-pointer"
										@click="showForgotPasswordDialog"
								>
                  Forgot password
                </span>
				</div>
				<div class="text-center" v-if="tab == 'login'">
					Don't have an account?
					<span
							class="text-blue text-wight-bolder cursor-pointer"
							@click="tab = 'signup'"
					>Sign up</span
					>
				</div>
				<div class="text-center" v-else>
					Already have an account?
					<span
							class="text-blue text-weight-bolder cursor-pointer"
							@click="tab = 'login'"
					>
                  Login
                </span>
				</div>
			</q-form>
		</q-card-section>
	</q-card>
</template>

<script>
export default {
  name: 'LoginForm',
  data () {
    return {}
  }
}
</script>
