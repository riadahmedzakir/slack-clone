(this["webpackJsonpreact-slack-clone"]=this["webpackJsonpreact-slack-clone"]||[]).push([[7],{565:function(e,a,t){"use strict";t.d(a,"a",(function(){return W}));var n=t(29),r=t.n(n),s=t(12),c=t.n(s),i=t(13),o=t.n(i),l=t(23),d=t.n(l),u=t(22),h=t.n(u),p=t(24),m=t.n(p),j=t(4),b=t.n(j),O=t(5),f=t.n(O),g=t(26),v=t.n(g),N=(t(293),t(33)),y=t.n(N),w=(t(8),t(2)),x=t.n(w),E=t(18),C=t(86),P=t(88),S=t(28),k=t(135),D=t(326);function I(e){var a=e.children,t=e.className,n=e.content,s=y()("content",t),c=Object(C.a)(I,e),i=Object(P.a)(I,e);return x.a.createElement(i,r()({},c,{className:s}),S.a.isNil(a)?n:a)}I.handledProps=["as","children","className","content"],I.propTypes={};var A=I;function T(e){var a=e.children,t=e.className,n=e.content,s=y()("header",t),c=Object(C.a)(T,e),i=Object(P.a)(T,e);return x.a.createElement(i,r()({},c,{className:s}),S.a.isNil(a)?n:a)}T.handledProps=["as","children","className","content"],T.propTypes={},T.create=Object(k.g)(T,(function(e){return{content:e}}));var z=T,G=t(292),K=t.n(G);function L(e){var a=e.children,t=e.className,n=e.content,s=y()("content",t),c=Object(C.a)(L,e),i=Object(P.a)(L,e);return x.a.createElement(i,r()({},c,{className:s}),S.a.isNil(a)?n:a)}L.handledProps=["as","children","className","content"],L.propTypes={},L.defaultProps={as:"li"},L.create=Object(k.g)(L,(function(e){return{content:e}}));var F=L;function J(e){var a=e.children,t=e.className,n=e.items,s=y()("list",t),c=Object(C.a)(J,e),i=Object(P.a)(J,e);return x.a.createElement(i,r()({},c,{className:s}),S.a.isNil(a)?K()(n,F.create):a)}J.handledProps=["as","children","className","items"],J.propTypes={},J.defaultProps={as:"ul"},J.create=Object(k.g)(J,(function(e){return{items:e}}));var V=J,W=function(e){function a(){var e,t;c()(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return t=d()(this,(e=h()(a)).call.apply(e,[this].concat(r))),f()(b()(b()(t)),"handleDismiss",(function(e){var a=t.props.onDismiss;a&&a(e,t.props)})),t}return m()(a,e),o()(a,[{key:"render",value:function(){var e=this.props,t=e.attached,n=e.children,s=e.className,c=e.color,i=e.compact,o=e.content,l=e.error,d=e.floating,u=e.header,h=e.hidden,p=e.icon,m=e.info,j=e.list,b=e.negative,O=e.onDismiss,f=e.positive,g=e.size,N=e.success,w=e.visible,I=e.warning,T=y()("ui",c,g,Object(E.a)(i,"compact"),Object(E.a)(l,"error"),Object(E.a)(d,"floating"),Object(E.a)(h,"hidden"),Object(E.a)(p,"icon"),Object(E.a)(m,"info"),Object(E.a)(b,"negative"),Object(E.a)(f,"positive"),Object(E.a)(N,"success"),Object(E.a)(w,"visible"),Object(E.a)(I,"warning"),Object(E.b)(t,"attached"),"message",s),G=O&&x.a.createElement(D.a,{name:"close",onClick:this.handleDismiss}),K=Object(C.a)(a,this.props),L=Object(P.a)(a,this.props);return S.a.isNil(n)?x.a.createElement(L,r()({},K,{className:T}),G,D.a.create(p,{autoGenerateKey:!1}),(!v()(u)||!v()(o)||!v()(j))&&x.a.createElement(A,null,z.create(u,{autoGenerateKey:!1}),V.create(j,{autoGenerateKey:!1}),Object(k.e)(o,{autoGenerateKey:!1}))):x.a.createElement(L,r()({},K,{className:T}),G,n)}}]),a}(w.Component);f()(W,"Content",A),f()(W,"Header",z),f()(W,"List",V),f()(W,"Item",F),f()(W,"handledProps",["as","attached","children","className","color","compact","content","error","floating","header","hidden","icon","info","list","negative","onDismiss","positive","size","success","visible","warning"]),W.propTypes={}},577:function(e,a,t){"use strict";t.r(a);var n=t(100),r=t(93),s=t(94),c=t(96),i=t(95),o=t(2),l=t.n(o),d=t(85),u=t(48),h=t(589),p=t(590),m=t(326),j=t(580),b=t(591),O=t(586),f=t(565),g=t(17),v=function(e){Object(c.a)(t,e);var a=Object(i.a)(t);function t(){var e;Object(r.a)(this,t);for(var s=arguments.length,c=new Array(s),i=0;i<s;i++)c[i]=arguments[i];return(e=a.call.apply(a,[this].concat(c))).state={email:"",password:"",errors:[],loading:!1},e.displayErrors=function(e){return e.map((function(e,a){return Object(g.jsx)("p",{children:e.message},a)}))},e.handleChange=function(a){e.setState(Object(n.a)({},a.target.name,a.target.value))},e.handleSubmit=function(a){a.preventDefault(),e.isFormValid(e.state)&&(e.setState({errors:[],loading:!0}),u.a.auth().signInWithEmailAndPassword(e.state.email,e.state.password).then((function(a){console.log(a),e.setState({loading:!1})})).catch((function(a){e.setState({errors:e.state.errors.concat(a),loading:!1})})))},e.isFormValid=function(e){var a=e.email,t=e.password;return a&&t},e.handleInputErrpr=function(e,a){return e.some((function(e){return e.message.toLowerCase().includes("email")}))?"error":""},e}return Object(s.a)(t,[{key:"render",value:function(){var e=this.state,a=e.email,t=e.password,n=e.errors,r=e.loading;return Object(g.jsx)(h.a,{textAlign:"center",verticalAlign:"middle",className:"app",children:Object(g.jsxs)(h.a.Column,{style:{maxWidth:450},children:[Object(g.jsxs)(p.a,{as:"h2",icon:!0,color:"teal",textAlign:"center",children:[Object(g.jsx)(m.a,{name:"user secret",color:"teal"}),"Login Secret Society"]}),Object(g.jsx)(j.a,{onSubmit:this.handleSubmit,size:"large",children:Object(g.jsxs)(b.a,{stacked:!0,children:[Object(g.jsx)(j.a.Input,{fluid:!0,className:this.handleInputErrpr(n,"email"),name:"email",icon:"mail",iconPosition:"left",placeholder:"Email",onChange:this.handleChange,type:"email",value:a}),Object(g.jsx)(j.a.Input,{fluid:!0,className:this.handleInputErrpr(n,"password"),name:"password",icon:"lock",iconPosition:"left",placeholder:"Password",onChange:this.handleChange,type:"password",value:t}),Object(g.jsx)(O.a,{disabled:r,className:r?"loading":"",color:"teal",fluid:!0,size:"large",children:"Submit"})]})}),n.length>0&&Object(g.jsxs)(f.a,{error:!0,children:[Object(g.jsx)("h3",{children:"Error"}),this.displayErrors(n)]}),Object(g.jsxs)(f.a,{children:["Don't have a account?",Object(g.jsx)(d.b,{to:"/register",children:"Register"})]})]})})}}]),t}(l.a.Component);a.default=v}}]);
//# sourceMappingURL=7.f1375875.chunk.js.map