/**
 * @param {string} camelCase
 * @return {string}
 */
const sentenceCaseFromCamelCase = camelCase => {
	if (!camelCase) return ''
	const result = camelCase.replace(/([A-Z])/g, ' $1')
	const finalResult = result.charAt(0).toUpperCase() + result.slice(1)
	return finalResult
}

export default sentenceCaseFromCamelCase
