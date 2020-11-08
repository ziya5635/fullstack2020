import * as _ from 'lodash';

interface Stats {
	periodLength : number;
	trainigDays : number;
	success : boolean;
	rating : number;
	ratingDescription : string;
	target : number;
	average: number;
}

interface BadType {
	error: string;
}


export const calculateExercises = (days:number[], goal:number) : Stats | BadType => {console.log(days);
	if(!Number(goal) || days.includes(NaN)){
		throw new Error('malformated parameters');
	}
	const periodLength : number = days.length;
	const trainigDays : number = days.filter(day => day > 0).length;
	const target : number = goal;
	const success : boolean = (_.mean(days) >= target ? true:false);
	const average : number = _.mean(days);
	let rating  = NaN;
	let ratingDescription  = '';
	if (average >= target) { 
		rating = 3;
		ratingDescription = 'Great job.';
	} else if (average >= target-1){
		rating = 2;
		ratingDescription = 'Not too bad but could be better.';
	}else{
		rating = 1;
		ratingDescription = 'Awfull.';
	}
	const res : Stats = {
		periodLength: periodLength,
		trainigDays: trainigDays,
		success: success,
		average: average,
		rating: rating,
		target: target,
		ratingDescription: ratingDescription
	};
	console.log(res);
	return res;
};

/*
try {
	const goal  = Number(process.argv[2]);
	const days : number[] = process.argv.slice(3).map(num => Number(num));
	if(process.argv.length != 10 || !goal){
		throw new Error("parameters not valid.");
	}
	calculateExercises(days, goal);
}catch(error){
	console.log(error.message);
}*/

