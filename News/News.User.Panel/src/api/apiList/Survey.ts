import {apiCall,exception} from '../ApiCall'

export default {
    async getProductSurveys(productId){
        try {
            let request = await apiCall.get(`Survey/GetProductSurveys?productId=${productId}`)
            let json = await request.data;
            return { 
                status: json.status,
                title: json.title,
                message: json.message,
                surveys: json.result,
            }
        } catch  {
            return exception;
        }
    }
}