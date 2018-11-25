/*::
//These are for the meteor/http package
type HTTPCommands = "POST" | "GET" | "PUT" | "DELETE";
type HTTPOptions = {|
  content?: string;
  data?: {};
  query?: string;
  params?: {};
  auth?: string;
  headers?: {};
  timeout?: number;
  followRedirects?: boolean;
  npmRequestOptions?: {};
  beforeSend?: function;
|};
type B1Error = {
  code:number;
  message:{
    lang:string;
    value:string;
  }
};
type B1Item = {|
  ItemCode:string;
  ItemName?:string;
|};
type B1ItemArray = Array<B1Item>;
type B1Document = {|
  DocNum:number;
  CardName?:string
|};
type B1DocumentArray = Array<B1Document>;
*/