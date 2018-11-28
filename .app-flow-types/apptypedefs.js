/*::
//These are for the meteor/http package
type HTTPCommands = "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
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
type BoYesNoEnum = "tNO"| "tYES";
type B1DocumentArray = Array<B1Document>;
type BoActivities = "cn_Conversation" | "cn_Meeting" | "cn_Task" | "cn_Other" | "cn_Note" | "cn_Campaign";
type BoMsgPriorities = "pr_Low"|"pr_Normal"|"pr_High";
type BoDurations = "du_Seconds"|"du_Minuts"|"du_Hours"|"du_Days";
type RecurrencePatternEnum = "rpNone"|"rpDaily"|"rpWeekly"|"rpMonthly"|"rpAnnually";
type EndTypeEnum ="etNoEndDate"|"etByCounter"|"etByDate";
type RepeatOptionEnum ="roByDate"|"roByWeekDay";
type BoAddressType ="bo_ShipTo"|"bo_BillTo";

type B1Activity = {|
  ActivityCode?:number;
  CardCode?:string;
  Notes?:string;
  ActivityDate?:string | Date,
  ActivityTime?:string | Date,
  StartDate?:string | Date,
  Closed?:BoYesNoEnum;
  CloseDate?:string | Date,
  Phone?:string;
  Fax?:string;
  Subject?:number;
  DocType?:string;
  DocNum?:string;
  DocEntry?:string;
  Priority?:BoMsgPriorities;
  Details?:string;
  ActivityProperty?:BoActivities;
  ActivityType?:number;
  Location?:number;
  StartTime?:string,// | Time,
  EndTime?:string, //| Time,
  Duration?:number; //Double
  DurationType?:BoDurations;
  SalesEmployee?:number;
  ContactPersonCode?:number;
  HandledBy?:number;
  Reminder?:BoYesNoEnum;
  ReminderPeriod?:number; //Double
  ReminderType?:BoDurations;
  City?:string;
  PersonalFlag?:BoYesNoEnum;
  Street?:string;
  ParentObjectId?:number;
  ParentObjectType?:string;
  Room?:string;
  InactiveFlag?:BoYesNoEnum;
  State?:string; //This is a US state and nothing to do with the Status
  PreviousActivity?:number;
  Country?:string;
  Status?:number; // -2=Not Started, -3=Completed
  TentativeFlag?:BoYesNoEnum;
  EndDueDate?:string | Date,
  DocTypeEx?:string;
  AttachmentEntry?:number;
  RecurrencePattern?:RecurrencePatternEnum;
  EndType?:EndTypeEnum;
  SeriesStartDate?:string | Date,
  SeriesEndDate?:string | Date,
  MaxOccurrence?:number;
  Interval?:number;
  Sunday?:BoYesNoEnum;
  Monday?:BoYesNoEnum;
  Tuesday?:BoYesNoEnum;
  Wednesday?:BoYesNoEnum;
  Thursday?:BoYesNoEnum;
  Friday?:BoYesNoEnum;
  Saturday?:BoYesNoEnum;
  RepeatOption?:RepeatOptionEnum;
  BelongedSeriesNum?:number;
  IsRemoved?:BoYesNoEnum;
  AddressName?:string;
  AddressType?:BoAddressType;
  HandledByEmployee?:number;
  RecurrenceSequenceSpecifier?:string;
  RecurrenceDayInMonth?:number;
  RecurrenceMonth?:number;
  RecurrenceDayOfWeek?:string;
  SalesOpportunityId?:number;
  SalesOpportunityLine?:number;
  HandledByRecipientList?:number;
  U_XXXRefLine?:number;
  U_XXXOpType?:string;
|};

*/