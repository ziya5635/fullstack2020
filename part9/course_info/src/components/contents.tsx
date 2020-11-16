import React from 'react';
import Part from './part';
import {CoursePart} from '../types';


const Content: React.FC<{courseParts: CoursePart[]}> = ({courseParts}) => {
	return (
		<div>
      		{courseParts.map(item => (
        		<Part key={item.name} part={item}/>
      		))}
    	</div>
		);
};


export default Content;