import {apiCall,exception} from '../ApiCall'

export default{
    async getMainGuilds(page = 0,count = 15){
        try {
            let request = await apiCall.get(`Guild/GetGuilds?page=${page}&count=${count}`);
            let json = await request.data;
            return this.returnGuilds(json)            
        } catch  {
            return exception;
        }
    },
    async getGuilds(page,count){
        try {
            let request = await apiCall.get(`Guild/GetGuilds?page=${page}&count=${count}`)
            let json = await request.data;
            return this.returnGuilds(json);
        }
        catch  {
            return exception
        }
    },
    returnGuilds :(json)=>({
        status:json.status,
        title:json.title,
        message:json.message,
        pageCount:json.result.pageCount,
        guilds:json.result.guilds
    })
}