export default function maskUsaPhoneNumber(phoneNumber) {
	if (!phoneNumber || typeof phoneNumber !== 'string') return ''

	const x = phoneNumber.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)
	const result = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ''}`
	return result
}
