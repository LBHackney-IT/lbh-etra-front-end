export interface IIssueLocation 
{
   LocationId:string
   LocationName:string
} 

export class IssueLocation implements IIssueLocation
{
   public LocationId:string
   public LocationName:string

   public constructor(locationId:string, locationName:string){
      this.LocationId = locationId;
      this.LocationName = locationName;
   }
} 