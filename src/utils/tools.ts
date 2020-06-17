
// 拼装querystring
// export function joinParams(params:Array<string>):string{
//     let arr:string[] = [];
//     for(let item in params){
//         arr.push(`${item}=${params[item]}`);
//     }
//     return arr.join('&');
// }
// 拼装url
// export function getUri(uri:string,params:string[]):string{
//     let reg:any = /\?/;
//     let nu:string = reg.test(uri)?'&':'?';
//     return `${uri}${nu}${joinParams(params)}`;
// }

export function handleMoney(money:string):string {
    return (+money).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

export function add(x:number,y:number):number{
    return x+y;
}