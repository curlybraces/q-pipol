import { profileService } from '@/services/profile.service'

export function profile({}) {
	return profileService.getCurrentUser()
}

export function updateProfile({}, payload) {
	return profileService.updateProfile(payload)
}

export function uploadUserAvatar({}, payload) {
	return profileService.uploadUserAvatar(payload)
}

export function chooseAvatar({}, payload) {
	console.log(payload)
	return profileService.chooseAvatar(payload)
}