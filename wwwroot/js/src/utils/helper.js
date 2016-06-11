export function getColorForCost(cost, income){
	if (!cost || !income || isNaN(cost) || isNaN(income)){
		return '#000000';
	}
	const part = cost / income;
	if(part < 0.5){
		return '#00FF00';
	}else if (part < 0.75){
		return '#FFFF00';
	}else if (part < 1){
		return '#ff9900';
	} else {
		return '#FF0000';
	}
}


export function formatNumber(number){
	return number.toLocaleString();
}
