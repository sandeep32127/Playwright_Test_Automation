class APIUtils{

    constructor(apiContext,loginPayload){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken(){
            const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
                {
                    data: this.loginPayload,
                }
            );
            const loginResponsejson = await loginResponse.json();
            const token = loginResponsejson.token;
            console.log(token);
            return token;
    }

    async createOrder(orderpayload){
        let response = {};
        response.token = await this.getToken();
        const orderresponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',{
                data: orderpayload,
                headers:{
                    "Authorization": response.token,
                    "Content-Type": 'application/json',
                },
            });
        
            const orderresponseJson = await orderresponse.json();
            console.log(orderresponseJson)
            const orderID = orderresponseJson.orders[0];
            console.log(orderID);
            response.orderID = orderID;
            return response;
    }
}

module.exports = {APIUtils};