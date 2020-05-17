import { date } from 'quasar'

export const handleResponse = (response) => {
  console.dir('handleResponse:')
  console.dir(response.data)
  return response.data
}

export const handleError = (err) => {
  console.error(`error: ${err.message}`)
}

export const displayDateDifference = (data) => {
	if (!data) {
		return null;
	}

	const today = new Date()

	let diff
	

	diff = date.getDateDiff(today, data, 'days')

	if (diff == 0) {
		diff = date.getDateDiff(today, data, 'hours') + ' hours ago'
	} 
	else if (diff >= 7) {
		diff = date.getDateDiff(today, data, 'weeks') + ' weeks ago'
	} else {
		diff = diff + ' days ago'
	}

	return diff
}