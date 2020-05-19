import { profileService } from '@/services/profile.service'

export function profile() {
	profileService.getCurrentUser()
}

export function updateProfile(payload) {
	profileService.updateProfile(payload)
}

export function uploadUserAvatar(payload) {
	profileService.uploadUserAvatar(payload)
}