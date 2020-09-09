

const initialKeyword = 'all'

export const filter = keyword => {
	return {
		type: filter,
		data: keyword
	}
}


const reducer = (keyword=initialKeyword, action) => {
	switch(action.type){
		case(filter):
			return action.data
		default:
			return keyword
	}
}

export default reducer