
interface Bmi {
	height:number,
	weight:number,
	bmi:string,
}

export const calculateBmi = (height: number, weight: number) : Bmi => {
	const heightToMeter:number = height / 100;
	const res:number = weight / (heightToMeter**2);
	if (res < 18.5) {
		console.log('underwight');
		return {height: height, weight: weight, bmi:'underwight'};
	}else if (res >=18.5 && res < 25) {
		console.log('normal (healthy weight)');
		return {height: height, weight: weight, bmi:'normal (healthy weight)'};
	}else if(res >= 25 && res < 30) {
		console.log('over weight');
		return {height: height, weight: weight, bmi:'over weight'};
	}else{
		console.log('obese');
		return {height: height, weight: weight, bmi:'obese'};
	}
};

/*
try {
	const height:number = Number(process.argv[2]);
	const weight:number = Number(process.argv[3]);
	if(process.argv.length != 4 || !height || !weight){
		throw new Error('invalid parameters.');
	}
	calculateBmi(height, weight);
}catch(error){
	console.log(error.message)
}*/