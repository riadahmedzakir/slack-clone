(this["webpackJsonpreact-slack-clone"]=this["webpackJsonpreact-slack-clone"]||[]).push([[1],{16:function(e,n,t){"use strict";t.d(n,"f",(function(){return r})),t.d(n,"b",(function(){return a})),t.d(n,"a",(function(){return o})),t.d(n,"d",(function(){return c})),t.d(n,"e",(function(){return i})),t.d(n,"g",(function(){return s})),t.d(n,"c",(function(){return u}));var r="SET_USER",a="CLEAR_USER",o="CACHE_USER_DATA",c="SET_CURRENT_CHANNEL",i="SET_PRIVATE_CHANNEL",s="SET_USER_POST",u="SET_COLORS"},196:function(e,n,t){},282:function(e,n,t){"use strict";t.r(n);var r=t(93),a=t(94),o=t(96),c=t(95),i=t(2),s=t.n(i),u=t(39),l=t.n(u),d=(t(196),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));function p(e){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var f=t(48),h=(t(201),t(85)),b=t(11),g=t(37),v=t(65),j=t(142),y=t(52),O=t(25),m=t(16),C={currentUser:null,isLoading:!0},w={userList:[],isLoading:!0},k={currentChannel:null,isPrivateChannel:!1},L={primaryColor:"#201d38",secondaryColor:"#8244FF"},S=Object(g.combineReducers)({user:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:C,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case m.f:return{currentUser:n.payload.currentUser,isLoading:!1};case m.b:return Object(O.a)(Object(O.a)({},e),{},{isLoading:!1});case m.a:return Object(O.a)({},e);default:return e}},channel:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case m.d:return Object(O.a)(Object(O.a)({},e),{},{currentChannel:n.payload.currentChannel});case m.e:return Object(O.a)(Object(O.a)({},e),{},{isPrivateChannel:n.payload.isPrivateChannel});case m.g:return Object(O.a)(Object(O.a)({},e),{},{userPosts:n.payload.userPosts});default:return e}},colors:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:L,n=arguments.length>1?arguments[1]:void 0;return n.type===m.c?{primaryColor:n.payload.primaryColor,secondaryColor:n.payload.secondaryColor}:e},userCache:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,n=arguments.length>1?arguments[1]:void 0;return n.type===m.a?Object(O.a)(Object(O.a)({},e),{},{userList:n.payload.userList}):e}}),E=S,U=t(288),x=t(287),P=t(17),T=function(){return Object(P.jsx)(U.a,{active:!0,children:Object(P.jsx)(x.a,{size:"huge",content:"Preparing chat.."})})},_=Object(i.lazy)((function(){return Promise.all([t.e(0),t.e(4),t.e(6)]).then(t.bind(null,579))})),R=Object(i.lazy)((function(){return Promise.all([t.e(0),t.e(7)]).then(t.bind(null,577))})),A=Object(i.lazy)((function(){return Promise.all([t.e(0),t.e(5)]).then(t.bind(null,578))})),D=Object(g.createStore)(E,Object(j.composeWithDevTools)()),I=function(e){Object(o.a)(t,e);var n=Object(c.a)(t);function t(){return Object(r.a)(this,t),n.apply(this,arguments)}return Object(a.a)(t,[{key:"componentDidMount",value:function(){var e=this;document.title="Secret Society",f.a.auth().onAuthStateChanged((function(n){n?(e.props.setUser(n),e.props.history.push("/")):(e.props.history.push("/login"),e.props.clearUser())}));var n=[];f.a.database().ref("users").on("child_added",(function(t){var r={userId:t.key,userData:t.val()};n.push(r),e.props.cacheUserData(n)})),f.a.database().ref("users").on("child_changed",(function(t){var r={userId:t.key,userData:t.val()},a=n.reduce((function(e,n){return n.userId===r.userId?e.push(r):e.push(n),e}),[]);e.props.cacheUserData(a)}))}},{key:"render",value:function(){return this.props.isLoading?Object(P.jsx)(T,{}):Object(P.jsx)(h.a,{children:Object(P.jsx)(i.Suspense,{fallback:Object(P.jsx)("div",{children:"Loading..."}),children:Object(P.jsxs)(b.c,{children:[Object(P.jsx)(b.a,{exact:!0,path:"/",component:_}),Object(P.jsx)(b.a,{path:"/login",component:R}),Object(P.jsx)(b.a,{path:"/register",component:A})]})})})}}]),t}(s.a.Component),N=Object(b.f)(Object(v.b)((function(e){return{isLoading:e.user.isLoading}}),{setUser:y.f,clearUser:y.b,cacheUserData:y.a})(I));l.a.render(Object(P.jsx)(v.a,{store:D,children:Object(P.jsx)(h.a,{children:Object(P.jsx)(N,{})})}),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/slack-clone",window.location).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("/slack-clone","/service-worker.js");d?(!function(e){fetch(e).then((function(n){404===n.status||-1===n.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):p(e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")}))):p(e)}))}}()},48:function(e,n,t){"use strict";var r=t(64);t(199),t(200);r.a.initializeApp({apiKey:"AIzaSyDVs8ZbX5mSHcDonfm9aFwxnuBBQgn54Pg",authDomain:"react-slack-24c40.firebaseapp.com",projectId:"react-slack-24c40",storageBucket:"react-slack-24c40.appspot.com",messagingSenderId:"428423241774",appId:"1:428423241774:web:e1da556171031d9ad1ffbf",measurementId:"G-8T8NPL74F6",databaseURL:"https://react-slack-24c40-default-rtdb.asia-southeast1.firebasedatabase.app/"}),r.a.analytics(),n.a=r.a},52:function(e,n,t){"use strict";t.d(n,"f",(function(){return a})),t.d(n,"b",(function(){return o})),t.d(n,"a",(function(){return c})),t.d(n,"d",(function(){return i})),t.d(n,"e",(function(){return s})),t.d(n,"g",(function(){return u})),t.d(n,"c",(function(){return l}));var r=t(16),a=function(e){return{type:r.f,payload:{currentUser:e}}},o=function(){return{type:r.b}},c=function(e){return{type:r.a,payload:{userList:e}}},i=function(e){return{type:r.d,payload:{currentChannel:e}}},s=function(e){return{type:r.e,payload:{isPrivateChannel:e}}},u=function(e){return{type:r.g,payload:{userPosts:e}}},l=function(e,n){return{type:r.c,payload:{primaryColor:e,secondaryColor:n}}}}},[[282,2,3]]]);
//# sourceMappingURL=main.84e01246.chunk.js.map