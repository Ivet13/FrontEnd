import{_ as d,o as t,c as a,b as e,e as l,v as i,g as u,f as p}from"./index.610aabe5.js";const m={data(){return{username:"",password:"",error:!1}},methods:{login(){console.log(this.username),console.log(this.password)}}},c={class:"login"},_=e("h1",null,"Login",-1),f=e("label",{for:"username"},"Username",-1),w=e("label",{for:"password"},"Password",-1),g={key:0,class:"error"},h=e("button",{class:"btn"},"Submit",-1);function b(v,s,x,V,o,n){return t(),a("div",c,[_,e("form",{class:"form",onSubmit:s[2]||(s[2]=p((...r)=>n.login&&n.login(...r),["prevent"]))},[f,l(e("input",{"onUpdate:modelValue":s[0]||(s[0]=r=>o.username=r),name:"username",type:"text",class:"input",required:"",placeholder:"username"},null,512),[[i,o.username]]),w,l(e("input",{"onUpdate:modelValue":s[1]||(s[1]=r=>o.password=r),name:"password",type:"text",class:"input",required:"",placeholder:"password"},null,512),[[i,o.password]]),o.error?(t(),a("p",g,"Invalid username or password.")):u("",!0),h],32)])}const y=d(m,[["render",b]]);export{y as default};
