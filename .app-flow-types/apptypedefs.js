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
*/