const defaultWidget = {
	x: 0,
	y: 0,
	w: 5,
	h: 5,
	i: 0,
	set: true,
	type: 'table',
	name: '',
	design: {
		padtop: 16,
		title: {
			use: true,
			text: 'Title',
			data: true,
			useDefault: true,
			fontSize: 1.7,
			fontWeight: 600,
			fontStyle: 'normal',
			align: 'left',
			fontColor: '#333',
			translateX: 30,
			translateY: 10,
		},
		subtitle: {
			use: true,
			text: 'Subtitle',
			data: false,
			useDefault: true,
			fontSize: 0.8,
			fontWeight: 400,
			fontStyle: 'normal',
			align: 'left',
			fontColor: '#333',
			translateX: 40,
			translateY: 35,
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
