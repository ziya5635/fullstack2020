
const calculateBmi = (height: number, weight: number) : void => {
	const heightToMeter:number = height / 100;
	const res:number = weight / (heightToMeter**2);
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


try {
	const height:number = Number(process.argv[2]);
	const weight:number = Number(process.argv[3]);
	if(process.argv.length != 4 || !height || !weight){
		throw new Error('invalid parameters.');
	}
	calculateBmi(height, weight);
}catch(error){
	console.log(error.message)
}