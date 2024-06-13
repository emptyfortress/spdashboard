const sparkOptions = {
	chart: {
		sparkline: {
			enabled: true,
		},
	},
	// colors: ['#ff0000'],
	fill: {
		// colors: '#ff0000',
		type: 'gradient',
		gradient: {
			shade: 'light',
			type: 'vertical',
			// shadeIntensity: 0.5,
			// gradientToColors: 'yellow', // optional, if not defined - uses the shades of same color in series
			inverseColors: false,
			opacityFrom: 1,
			opacityTo: 0,
			stops: [0, 100],
			colorStops: [],
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

export { sparkOptions, areaOptions, barOptions, donutOptions }
