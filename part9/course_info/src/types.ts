  export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  }

  export interface CoursePartDescription extends CoursePartBase {
  	description: string;
  }

  export interface CoursePartOne extends CoursePartDescription {
  name: "Fundamentals";
  }

  export interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
  }

  export interface CoursePartThree extends CoursePartDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
  }

  export interface MyCourse extends CoursePartBase {
    name: 'Programming',
    exerciseCount: 24,
    language: "JavaScript and Python",
    participants: 'public'
  }

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | MyCourse;
