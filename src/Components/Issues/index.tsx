import React from 'react';
import  { IIssueType } from '../IssueType'
import { ILocation } from '../Location'

export interface IIssue  
{
  IssueType:IIssueType
  Location:ILocation
  Notes:string
}