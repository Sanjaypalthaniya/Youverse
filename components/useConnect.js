'use client';
import {useEffect,useState} from 'react';
import {selectDemoPlan} from '../data/account';
import {useSocial} from './SocialProvider';
import {sendConnectRequest,transitionConnectRequest,blockConnectMaker,unblockConnectResult,applyConnectSettings,setConnectEnabled,connectQuota,connectDay,connectResetAt} from '../data/connect';
export function useConnect(){const{connectState,transactConnect}=useSocial();return{state:connectState,
 send:request=>transactConnect(state=>sendConnectRequest(state,request)).errors,
 transition:(id,action)=>transactConnect(state=>transitionConnectRequest(state,id,action)).error,
 block:id=>transactConnect(state=>blockConnectMaker(state,id)).error,
 unblock:id=>transactConnect(state=>unblockConnectResult(state,id)).error,
 settings:value=>transactConnect(state=>applyConnectSettings(state,value)).errors,
 setEnabled:enabled=>transactConnect(state=>({state:setConnectEnabled(state,enabled)})),
 setPlan:plan=>transactConnect(state=>({state:selectDemoPlan(state,plan)}))};}
export function useConnectQuota(){const{state}=useConnect();const[day,setDay]=useState(()=>connectDay());useEffect(()=>{let timer;function refresh(){setDay(connectDay());clearTimeout(timer);timer=setTimeout(refresh,connectResetAt().getTime()-Date.now()+100);}refresh();window.addEventListener('focus',refresh);return()=>{clearTimeout(timer);window.removeEventListener('focus',refresh);};},[]);return{...connectQuota(state,day),day,resetAt:connectResetAt()};}
