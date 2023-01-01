export default definePreset({
	name: 'lsiv',
	options: {
		// ...
	},
	handler: async() => {
		await extractTemplates()
		// ...
	},
})
