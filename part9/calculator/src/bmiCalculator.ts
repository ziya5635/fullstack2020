


const calculateBmi = (height: number, weight: number) : void => {
	const heightToMeter = height / 100;
	const res = weight / (heightToMeter**2);
	if (res < 18.5) {
		console.log('underwight');
	}else if (res >=18.5 && res < 25) {
		console.log('normal (healthy weight)');
	}else if(res >= 25 && res < 30) {
		console.log('over weight');
	}else{
		console.log('obese');
	}
}

calculateBmi(180, 74);