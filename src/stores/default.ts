const defaultWidget = {
	x: 0,
	y: 0,
	w: 3,
	h: 3,
	i: 0,
	set: true,
	type: '',
	design: {
		title: {
			text: 'Title',
			data: true,
			useDefault: true,
			fontSize: 1.7,
			fontWeight: 600,
			fontStyle: 'normal',
			align: 'left',
			fontColor: '#333',
		},
		subtitle: {
			text: 'Subtitle',
			data: true,
			useDefault: true,
			fontSize: 0.8,
			fontWeight: 400,
			fontStyle: 'normal',
			align: 'left',
			fontColor: '#333',
		},
	},
}

const des = {
	title: {
		text: '',
		data: false,
		useDefault: true,
		fontSize: 1.5,
		fontWeight: 600,
		fontStyle: 'normal',
		align: 'left',
		fontColor: '#333',
	},
	subtitle: {
		text: '',
		data: false,
		useDefault: true,
		fontSize: 0.8,
		fontWeight: 400,
		fontStyle: 'normal',
		align: 'left',
		fontColor: '#333',
	},
}

export { defaultWidget, des }
