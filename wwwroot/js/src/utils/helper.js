import {
	green500,
	lightGreen500,
	lightGreenA400,
	lime500,
	limeA400,
	yellow500,
	yellowA400,
	amber500,
	amberA400,
	orange500,
	orangeA400,
	deepOrange500,
	deepOrangeA400,
	deepOrangeA700

} from 'material-ui/styles/colors';

export function getColorForCost(cost, income){
	const part = cost / income;

	if (part < 0.5){
		return {
			color: green500,
			textColor: '#00FF00'
		};
	}else if (part < 0.6){
		return {
			color: lightGreen500,
			textColor: lightGreenA400
		};
	}else if (part < 0.7){
		return {
			color: lime500,
			textColor: limeA400
		};
	}else if (part < 0.8){
		return {
			color: yellow500,
			textColor: yellowA400
		};
	}else if (part < 0.9){
		return {
			color: amber500,
			textColor: amberA400
		};
	}else if (part < 1){
		return {
			color: orange500,
			textColor: orangeA400
		};
	}else if (part < 1.1){
		return {
			color: deepOrange500,
			textColor: deepOrangeA400
		};
	} else {
		return {
			color: deepOrangeA700,
			textColor: deepOrangeA700
		};
	}
}


export function formatNumber(number){
	return number.toLocaleString();
}
