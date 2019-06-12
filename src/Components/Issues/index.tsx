import React from 'react';
import  { IIssueType } from '../IssueType'
import { ILocation } from '../Location'

export interface IIssue  
{
  IssueType:string
  Location:string
  Notes:string
}