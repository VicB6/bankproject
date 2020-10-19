const availableCurrencies =    ["AUD","BGN","BRL","CAD","CHF","CNY","CZK","DKK","EUR","GBP","HKD","HRK","HUF",
                                "IDR","ILS","INR","ISK","JPY","KRW","MXN","MYR","NOK","NZD","PHP","PLN","RON",
                                "RUB","SEK","SGD","THB","TRY","USD","ZAR"];


export class User {
    constructor(username:string,password:string,accounts:{[currency:string]:number}){
        this.username = username;
        this.password = password;
        this.accounts = accounts;
    }
    username:string;
    password:string;
    accounts:{[currency:string]:number};

    sendMoney(beneficiary:User,currency:string,amount:number){
        if (!this.accounts[currency]){
            console.log("You must open an account in this currency to send money")
        }
        else{
            if(this.accounts[currency] < amount){
                console.log("You don't have sufficient funds in this account to do the transfer")
            }
            else{
                if (beneficiary && beneficiary.accounts && beneficiary.accounts[currency]){
                    console.log(beneficiary.accounts[currency])
                    this.accounts[currency] -= amount;
                    beneficiary.accounts[currency] += amount
                }
                else{
                    console.log("The benficiary don't have an account in this currency")
                }

            }
        }
        
    }

    openNewAccount(currency:string){
        if (availableCurrencies.includes(currency)){
            if(this.accounts[currency]){
                console.log("You already have an account in this currency")
            }
            else{
                this.accounts[currency]=0;
                console.log("New account successfully opened")
            }

        }
        else{
            console.log("Currency not avalaible")
        }

    }
};

export function initUser(user:string){
    return(new User(user,user,{"EUR":1000}));
}