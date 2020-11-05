import * as _ from 'lodash'

interface Stats {
	periodLength : number;
	trainigDays : number;
	success : boolean;
	rating : number;
	ratingDescription : string;
	target : number;
	average: number;
}

const calculateExercises = (days:number[], goal:number) : Stats => {
	const periodLength : number = days.length;
	const trainigDays : number = days.filter(day => day > 0).length;
	const target : number = goal;
	const success : boolean = (_.mean(days) >= target ? true:false);
	const average : number = _.mean(days);
	let rating : number = NaN;
	let ratingDescription : string = '';
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
	}
	console.log(res)
	return res
}

calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2);

