const units = {
	seconds: {
		value: 1,
		count: 0,
	},
	minutes: {
		value: 60,
		count: 0,
	},
	hours: {
		value: 3600,
		count: 0,
	},
	days: {
		value: 86400,
		count: 0,
	},
	years: {
		value: 31536000,
        count: 0
	}
}

function formatDuration(seconds) {
    let remaining = seconds
    if (remaining % units.years.value < remaining) {
        remaining -= units
    }
}

formatDuration(15768000 * 3)