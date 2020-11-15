import React from 'react';

interface Course{
	name: string,
	exerciseCount: number,
};

const Content: React.FC<{courseParts: Course[]}> = ({courseParts}) => {
	return (
		<div>
      		{courseParts.map(item => (
        		<p key={item.name}>
        			{item.name} {item.exerciseCount}
        		</p>
      		))}
    	</div>
		);
};


export default Content;