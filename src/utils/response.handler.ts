// 4XX status code related to client side error
// 5XX status code related to server side error


export const successResponse = (data: any, succMessage?: string,) => {
	return {
		success: true,
		message: succMessage,
		data
	}
}


export const errorResponse = (error: any, errMessage?: string,) => {
	return {
		success: false,
		message: errMessage,
		error: error
	}
}