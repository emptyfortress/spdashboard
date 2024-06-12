const sparkOptions = {
	chart: {
		sparkline: {
			enabled: true,
		},
	},
	// title: {
	// 	text: '',
	// 	style: {
	// 		fontSize: '24px',
	// 	},
	// },
	// subtitle: {
	// 	text: 'Spark chart',
	// 	style: {
	// 		fontSize: '14px',
	// 	},
	// },
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
