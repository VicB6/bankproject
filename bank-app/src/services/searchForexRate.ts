export function searchForexRate(list:[string[],unknown[]],currency:string){
    for(let index = 0; index < list[0].length; index++){
        if(list[0][index] == currency){
            return list[1][index]
        }
    }
}