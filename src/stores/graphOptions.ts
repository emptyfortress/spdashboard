const sparkOptions = {
	chart: {
		sparkline: {
			enabled: true,
		},
		animations: {
			enabled: true,
		},
	},
}

const sparkOptions1 = {
	chart: {
		sparkline: {
			enabled: true,
		},
	},
	fill: {
		type: 'gradient',
		gradient: {
			shade: 'light',
			type: 'vertical',
			inverseColors: false,
			opacityFrom: 1,
			opacityTo: 0,
			stops: [0, 100],
			colorStops: [],
		},
	},
	title: {
		text: '132',
		offsetX: 0,
		style: {
			fontSize: '24px',
		},
	},
	subtitle: {
		text: 'AHT',
		offsetX: 0,
		style: {
			fontSize: '14px',
		},
	},
}

const areaOptions = {
	xaxis: {
		type: 'datetime',
		categories: [
			'2022-03-04',
			'2022-03-11',
			'2022-03-18',
			'2022-03-24',
			'2022-04-01',
			'2022-04-08',
			'2022-04-14',
		],
	},
	chart: {
		zoom: {
			enabled: false,
		},
	},
	yaxis: {
		opposite: true,
	},
}
const barOptions = {
	plotOptions: {
		bar: {
			horizontal: false,
		},
	},
}
const donutOptions = {}

export { sparkOptions, sparkOptions1, areaOptions, barOptions, donutOptions }
