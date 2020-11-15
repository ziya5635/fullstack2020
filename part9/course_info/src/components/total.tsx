import React from 'react';

interface Course {
	name: string,
	exerciseCount: number
}


const Total: React.FC<{courseParts: Course[]}> = ({courseParts}) => (
	  <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
)

export default Total;