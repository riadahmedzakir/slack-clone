(this["webpackJsonpreact-slack-clone"]=this["webpackJsonpreact-slack-clone"]||[]).push([[6],{366:function(e,t,n){},580:function(e,t,n){"use strict";n.r(t);var a=n(2),s=n.n(a),r=n(590),c=n(67),i=(n(366),n(93)),o=n(94),l=n(96),d=n(95),u=n(575),h=n(589),f=n(588),j=n(587),p=n(582),m=n(592),g=n(364),v=n(327),b=n(367),O=n(47),C=n(51),x=n(18),y=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={modal:!1,primary:"",secondary:"",user:e.props.currentUser,usersRef:O.a.database().ref("users"),userColors:[]},e.addListener=function(t){var n=[];e.state.usersRef.child("".concat(t,"/colors")).on("child_added",(function(t){n.unshift(t.val()),e.setState({userColors:n})}))},e.removeListeners=function(){e.state.usersRef.child("".concat(e.state.user.uid,"/colors")).off()},e.openModal=function(){return e.setState({modal:!0})},e.closeModal=function(){return e.setState({modal:!1})},e.handleChangePrimary=function(t){return e.setState({primary:t.hex})},e.handleChangeSecondary=function(t){return e.setState({secondary:t.hex})},e.handleSavedColor=function(){e.state.primary&&e.state.secondary&&e.saveColors(e.state.primary,e.state.secondary)},e.saveColors=function(t,n){e.state.usersRef.child("".concat(e.state.user.uid,"/colors")).push().update({primary:t,secondary:n}).then((function(){e.closeModal()})).catch((function(e){console.log(e)}))},e.displayUserColors=function(t){return t.length>0&&t.map((function(t,n){return Object(x.jsxs)(s.a.Fragment,{children:[Object(x.jsx)(u.a,{}),Object(x.jsx)("div",{className:"color__container",onClick:function(){return e.props.setColors(t.primary,t.secondary)},children:Object(x.jsx)("div",{className:"color__square",style:{background:t.primary},children:Object(x.jsx)("div",{className:"color__overlay",style:{background:t.secondary}})})})]},n)}))},e}return Object(o.a)(n,[{key:"componentDidMount",value:function(){this.state.user&&this.addListener(this.state.user.uid)}},{key:"componentWillUnmount",value:function(){this.removeListeners()}},{key:"render",value:function(){var e=this.state,t=e.modal,n=e.primary,a=e.secondary,s=e.userColors;return Object(x.jsxs)(h.a,{as:f.a,icon:"labeled",inverted:!0,vertical:!0,visible:!0,width:"very thin",children:[Object(x.jsx)(u.a,{}),Object(x.jsx)(j.a,{icon:"add",size:"small",color:"blue",onClick:this.openModal}),this.displayUserColors(s),Object(x.jsxs)(p.a,{basic:!0,open:t,onClose:this.closeModal,children:[Object(x.jsx)(p.a.Header,{}),Object(x.jsxs)(p.a.Content,{children:[Object(x.jsxs)(m.a,{inverted:!0,children:[Object(x.jsx)(g.a,{style:{marginBottom:"20px"},content:"Primary Color"}),Object(x.jsx)(b.SliderPicker,{color:n,onChange:this.handleChangePrimary})]}),Object(x.jsxs)(m.a,{inverted:!0,children:[Object(x.jsx)(g.a,{style:{marginBottom:"20px"},content:"Secondary Color"}),Object(x.jsx)(b.SliderPicker,{color:a,onChange:this.handleChangeSecondary})]})]}),Object(x.jsxs)(p.a.Actions,{children:[Object(x.jsxs)(j.a,{color:"green",onClick:this.handleSavedColor,inverted:!0,children:[Object(x.jsx)(v.a,{name:"checkmark"})," Save Colors"]}),Object(x.jsxs)(j.a,{color:"red",onClick:this.closeModal,inverted:!0,children:[Object(x.jsx)(v.a,{name:"remove"})," Cancel "]})]})]})]})}}]),n}(s.a.Component),S=Object(c.b)(null,{setColors:C.c})(y),k=n(591),R=n(584),U=n(568),L=n(576),M=n(504),T=n.n(M),P=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,s=new Array(a),r=0;r<a;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={user:e.props.currentUser,modal:!1,previewImage:"",croppedImage:"",blob:"",storageRef:O.a.storage().ref(),userRef:O.a.auth().currentUser,usersRef:O.a.database().ref("users"),metadata:{contentType:"image/jpeg"},uploadedCroppedImage:"",isAvatarUploading:!1},e.dropdownOptions=function(){return[{key:"user",text:Object(x.jsxs)("span",{children:["Signed in as ",Object(x.jsx)("strong",{children:e.state.user.displayName})]}),disabled:!0},{key:"avatar",text:Object(x.jsx)("span",{onClick:e.openModal,children:"Change Avatar"})},{key:"signout",text:Object(x.jsx)("span",{onClick:e.handleSignout,children:"Sign Out"})}]},e.openModal=function(){return e.setState({modal:!0})},e.closeModal=function(){return e.setState({modal:!1})},e.handleSignout=function(){O.a.auth().signOut().then((function(){}))},e.handleChange=function(t){var n=t.target.files[0],a=new FileReader;n&&(a.readAsDataURL(n),a.addEventListener("load",(function(){e.setState({previewImage:a.result})})))},e.handleCropImage=function(){e.avatarEditor&&e.avatarEditor.getImageScaledToCanvas().toBlob((function(t){var n=URL.createObjectURL(t);e.setState({croppedImage:n,blob:t})}))},e.uploadCroppedImage=function(){var t=e.state,n=t.storageRef,a=t.userRef,s=t.blob,r=t.metadata;n.child("avatars/users/".concat(a.uid)).put(s,r).then((function(t){t.ref.getDownloadURL().then((function(t){e.setState({uploadedCroppedImage:t},(function(){e.changeAvatar()}))}))}))},e.changeAvatar=function(){e.setState({isAvatarUploading:!0}),e.state.userRef.updateProfile({photoURL:e.state.uploadedCroppedImage}).then((function(){e.setState({isAvatarUploading:!1}),e.closeModal()})).catch((function(e){console.log(e)})),e.state.usersRef.child(e.state.user.uid).update({avatar:e.state.uploadedCroppedImage}).then((function(){})).catch((function(e){console.log(e)}))},e}return Object(o.a)(n,[{key:"componentDidMount",value:function(){this.setState({user:this.props.currentUser})}},{key:"render",value:function(){var e=this,t=this.state,n=t.primaryColor,a=t.modal,s=t.previewImage,c=t.croppedImage,i=t.isAvatarUploading;return Object(x.jsx)(r.a,{style:{background:n},children:Object(x.jsxs)(r.a.Column,{children:[Object(x.jsxs)(r.a.Row,{style:{padding:20,margin:0},children:[Object(x.jsxs)(k.a,{inverted:!0,floated:"left",as:"h3",children:[Object(x.jsx)(v.a,{name:"user secret"}),Object(x.jsx)(k.a.Content,{children:"Secret Society"})]}),Object(x.jsx)(k.a,{style:{padding:"20px"},as:"h4",inverted:!0,children:Object(x.jsx)(R.a,{style:{background:n},trigger:Object(x.jsxs)("span",{children:[Object(x.jsx)(U.a,{src:this.state.user.photoURL,spaced:"right",avatar:!0}),this.state.user.displayName]}),options:this.dropdownOptions()})})]}),Object(x.jsxs)(p.a,{basic:!0,open:a,onClose:this.closeModal,children:[Object(x.jsx)(p.a.Header,{children:"Change avatar"}),Object(x.jsxs)(p.a.Content,{children:[Object(x.jsx)(L.a,{onChange:this.handleChange,fluid:!0,type:"file",label:"New avatar",name:"previewImage"}),Object(x.jsx)(r.a,{centered:!0,stackable:!0,columns:2,children:Object(x.jsxs)(r.a.Row,{centered:!0,children:[Object(x.jsx)(r.a.Column,{style:{marginTop:"20px"},className:"ui center aligned grid",children:s&&Object(x.jsx)(T.a,{image:s,width:300,height:300,border:50,ref:function(t){return e.avatarEditor=t}})}),Object(x.jsx)(r.a.Column,{children:c&&Object(x.jsx)(U.a,{style:{margin:"20px auto"},width:300,height:300,src:c})})]})})]}),Object(x.jsxs)(p.a.Actions,{children:[c&&Object(x.jsxs)(j.a,{color:"green",inverted:!0,onClick:this.uploadCroppedImage,disabled:i,children:[Object(x.jsx)(v.a,{name:"save"}),"Change Avatar"]}),Object(x.jsxs)(j.a,{color:"green",inverted:!0,onClick:this.handleCropImage,children:[Object(x.jsx)(v.a,{name:"image"}),"Preview"]}),Object(x.jsxs)(j.a,{color:"red",inverted:!0,onClick:this.closeModal,children:[Object(x.jsx)(v.a,{name:"remove"}),"Cancel"]})]})]})]})})}}]),n}(s.a.Component),N=P,A=n(326),I=n(100),w=n(581),_=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,s=new Array(a),r=0;r<a;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={user:e.props.currentUser,channel:null,channels:[],channelName:"",channelDetails:"",modal:!1,channelsRef:O.a.database().ref("channels"),messagesRef:O.a.database().ref("messages"),typingRef:O.a.database().ref("typing"),notifications:[],firstLoad:!0,activeChannel:""},e.addListeners=function(){var t=[];e.state.channelsRef.on("child_added",(function(n){t.push(n.val()),e.setState({channels:t}),e.addNotificationListeners(n.key)}))},e.addNotificationListeners=function(t){e.state.messagesRef.child(t).on("value",(function(n){e.state.channel&&e.handleNotifications(t,e.state.channel.id,e.state.notifications,n)}))},e.handleNotifications=function(t,n,a,s){var r=0,c=a.findIndex((function(e){return e.id===t}));-1!==c?(t!==n&&(r=a[c].total,s.numChildren()-r>0&&(a[c].count=s.numChildren()-r)),a[c].lastKnowTotal=s.numChildren()):a.push({id:t,total:s.numChildren(),lastKnowTotal:s.numChildren(),count:0}),e.setState({notifications:a})},e.removeListeners=function(){e.state.channelsRef.off(),e.state.channels.forEach((function(t){e.state.messagesRef.child(t.id).off()}))},e.setFirstChannel=function(){var t=e.state.channels[0];e.state.firstLoad&&e.state.channels.length>0&&(e.props.setCurrentChannel(t),e.setState({firstLoad:!1,activeChannel:t.id}),e.setState({channel:t})),e.setState({firstLoad:!1})},e.closeModal=function(){return e.setState({modal:!1})},e.openModal=function(){return e.setState({modal:!0})},e.handleChange=function(t){e.setState(Object(I.a)({},t.target.name,t.target.value))},e.addChannel=function(){var t=e.state,n=t.channelsRef,a=t.channelName,s=t.channelDetails,r=t.user,c=n.push().key,i={id:c,name:a,details:s,createdBy:r.uid};n.child(c).update(i).then((function(){e.setState({channelName:"",channelDetails:"",modal:!1})})).catch((function(e){console.log(e)}))},e.getNotificationCount=function(t){var n=0;if(e.state.notifications.forEach((function(e){e.id===t.id&&(n=e.count)})),n>0)return n},e.displayChannels=function(t){return t.length>0&&t.map((function(t){return Object(x.jsxs)(f.a.Item,{onClick:function(){return e.changeChannel(t)},name:t.name,style:{opacity:.7},active:t.id===e.state.activeChannel,children:[e.getNotificationCount(t)&&Object(x.jsx)(g.a,{color:"red",children:e.getNotificationCount(t)}),"# ",t.name]},t.id)}))},e.changeChannel=function(t){e.setActiveChannel(t),e.props.setCurrentChannel(t),e.props.setPrivateChannel(!1),e.setState({channel:t}),t&&e.state.typingRef.child(t.id).child(e.state.user.uid).remove(),e.clearNotifications()},e.clearNotifications=function(){var t=e.state.notifications.findIndex((function(t){return t.id===e.state.channel.id}));if(-1!==t){var n=Object(A.a)(e.state.notifications);n[t].total=e.state.notifications[t].lastKnowTotal,n[t].count=0,e.setState({notifications:n})}},e.setActiveChannel=function(t){e.setState({activeChannel:t.id})},e.handleSubmit=function(t){t.preventDefault(),e.isFormValid(e.state)&&e.addChannel()},e.isFormValid=function(e){var t=e.channelName,n=e.channelDetails;return t&&n},e}return Object(o.a)(n,[{key:"componentDidMount",value:function(){this.addListeners()}},{key:"componentWillUnmount",value:function(){this.removeListeners()}},{key:"render",value:function(){var e=this.state,t=e.channels,n=e.modal;return Object(x.jsxs)(s.a.Fragment,{children:[Object(x.jsxs)(f.a.Menu,{className:"menu",children:[Object(x.jsxs)(f.a.Item,{children:[Object(x.jsxs)("span",{children:[Object(x.jsx)(v.a,{name:"exchange"}),"CHANNELS"]})," "," ","(",t.length,") ",Object(x.jsx)(v.a,{name:"add",onClick:this.openModal,style:{cursor:"pointer"}})]}),this.displayChannels(t)]}),Object(x.jsxs)(p.a,{basic:!0,open:n,onClose:this.closeModal,children:[Object(x.jsx)(p.a.Header,{children:"Add a Channel"}),Object(x.jsx)(p.a.Content,{children:Object(x.jsxs)(w.a,{onSubmit:this.handleSubmit,children:[Object(x.jsx)(w.a.Field,{children:Object(x.jsx)(L.a,{fluid:!0,label:"Name of Channel",name:"channelName",onChange:this.handleChange})}),Object(x.jsx)(w.a.Field,{children:Object(x.jsx)(L.a,{fluid:!0,label:"Description",name:"channelDetails",onChange:this.handleChange})})]})}),Object(x.jsxs)(p.a.Actions,{children:[Object(x.jsxs)(j.a,{color:"green",inverted:!0,onClick:this.handleSubmit,children:[Object(x.jsx)(v.a,{name:"checkmark"}),"Add"]}),Object(x.jsxs)(j.a,{color:"red",inverted:!0,onClick:this.closeModal,children:[Object(x.jsx)(v.a,{name:"remove"}),"Cancel"]})]})]})]})}}]),n}(s.a.Component),D=Object(c.b)(null,{setCurrentChannel:C.d,setPrivateChannel:C.e})(_),F=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,s=new Array(a),r=0;r<a;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={activeChannel:"",user:e.props.currentUser,users:[],usersRef:O.a.database().ref("users"),connectedRef:O.a.database().ref(".info/connected"),presenceRef:O.a.database().ref("presence")},e.remvoeListeners=function(){e.state.usersRef.off(),e.state.presenceRef.off(),e.state.connectedRef.off()},e.addListeners=function(t){var n=[];e.state.usersRef.on("child_added",(function(a){if(t!==a.key){var s=a.val();s.uid=a.key,s.status="offline",n.push(s),e.setState({users:n})}})),e.state.connectedRef.on("value",(function(n){if(!0===n.val()){var a=e.state.presenceRef.child(t);a.set(!0),a.onDisconnect().remove((function(e){}))}})),e.state.presenceRef.on("child_added",(function(n){t!==n.key&&e.addStatusToUser(n.key)})),e.state.presenceRef.on("child_removed",(function(n){t!==n.key&&e.addStatusToUser(n.key,!1)}))},e.addStatusToUser=function(t){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],a=e.state.users.reduce((function(e,a){return a.uid===t&&(a.status="".concat(n?"online":"offline")),e.concat(a)}),[]);e.setState({users:a})},e.isUserOnline=function(e){return"online"===e.status},e.changeChannel=function(t){var n={id:e.getChannelId(t.uid),name:t.name};e.props.setCurrentChannel(n),e.props.setPrivateChannel(!0),e.setActiveChannel(t.uid)},e.setActiveChannel=function(t){e.setState({activeChannel:t})},e.getChannelId=function(t){var n=e.state.user.uid;return t<n?"".concat(t,"/").concat(n):"".concat(n,"/").concat(t)},e}return Object(o.a)(n,[{key:"componentDidMount",value:function(){this.state.user&&this.addListeners(this.state.user.uid)}},{key:"componentWillUnmount",value:function(){this.remvoeListeners()}},{key:"render",value:function(){var e=this,t=this.state,n=t.users,a=t.activeChannel;return Object(x.jsxs)(f.a.Menu,{className:"menu",children:[Object(x.jsxs)(f.a.Item,{children:[Object(x.jsxs)("span",{children:[Object(x.jsx)(v.a,{name:"mail"})," MESSAGES"]})," ","(",n.length,")"]}),n.map((function(t){return Object(x.jsxs)(f.a.Item,{onClick:function(){return e.changeChannel(t)},active:t.uid===a,style:{opacity:.7,fontStyle:"italic"},children:[Object(x.jsx)(v.a,{name:"circle",color:e.isUserOnline(t)?"green":"red"}),"@ ",t.name]},t.uid)}))]})}}]),n}(s.a.Component),E=Object(c.b)(null,{setCurrentChannel:C.d,setPrivateChannel:C.e})(F),B=n(24),z=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,s=new Array(a),r=0;r<a;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={user:e.props.currentUser,usersRef:O.a.database().ref("users"),starredChannels:[],activeChannel:""},e.removeListeners=function(){e.state.usersRef.child("".concat(e.state.user.uid,"/starred")).off()},e.addListeners=function(t){e.state.usersRef.child(t).child("starred").on("child_added",(function(t){var n=Object(B.a)({id:t.key},t.val());e.setState({starredChannels:[].concat(Object(A.a)(e.state.starredChannels),[n])})})),e.state.usersRef.child(t).child("starred").on("child_removed",(function(t){var n=Object(B.a)({id:t.key},t.val()),a=e.state.starredChannels.filter((function(e){return e.id!==n.id}));e.setState({starredChannels:a})}))},e.changeChannel=function(t){e.setActiveChannel(t),e.props.setCurrentChannel(t),e.props.setPrivateChannel(!1)},e.setActiveChannel=function(t){e.setState({activeChannel:t.id})},e.displayChannels=function(t){return t.length>0&&t.map((function(t){return Object(x.jsxs)(f.a.Item,{onClick:function(){return e.changeChannel(t)},name:t.name,style:{opacity:.7},active:t.id===e.state.activeChannel,children:["# ",t.name]},t.id)}))},e}return Object(o.a)(n,[{key:"componentDidMount",value:function(){this.state.user&&this.addListeners(this.state.user.uid)}},{key:"componentWillUnmount",value:function(){this.removeListeners()}},{key:"render",value:function(){var e=this.state.starredChannels;return Object(x.jsxs)(f.a.Menu,{className:"menu",children:[Object(x.jsxs)(f.a.Item,{children:[Object(x.jsxs)("span",{children:[Object(x.jsx)(v.a,{name:"heart"}),"FAVORITE"]})," "," ","(",e.length,")"]}),this.displayChannels(e)]})}}]),n}(s.a.Component),q=Object(c.b)(null,{setCurrentChannel:C.d,setPrivateChannel:C.e})(z),W=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){var e=this.props,t=e.currentUser,n=e.primaryColor;return Object(x.jsxs)(f.a,{size:"large",inverted:!0,fixed:"left",vertical:!0,style:{background:n,fontSize:"20px"},children:[Object(x.jsx)(N,{currentUser:t,primaryColor:n}),Object(x.jsx)(q,{currentUser:t}),Object(x.jsx)(D,{currentUser:t}),Object(x.jsx)(E,{currentUser:t})]})}}]),n}(s.a.Component),H=W,K=n(583),V=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){var e=this.props,t=e.channelName,n=e.numUniqUsers,a=e.handleSearchChange,s=e.searchLoading,r=e.isPrivateChannel,c=e.handleStar,i=e.isChannelStarred;return Object(x.jsxs)(m.a,{clearing:!0,children:[Object(x.jsxs)(k.a,{fluid:"true",as:"h2",floated:"left",style:{marginBottom:0},children:[Object(x.jsxs)("span",{children:[t,!r&&Object(x.jsx)(v.a,{onClick:c,name:i?"star":"star outline",color:i?"yellow":"black",style:{cursor:"pointer"}})]}),Object(x.jsx)(k.a.Subheader,{children:n})]}),Object(x.jsx)(k.a,{floated:"right",children:Object(x.jsx)(L.a,{size:"mini",icon:"search",name:"searchTerm",placeholder:"Search Messages",onChange:a,loading:s})})]})}}]),n}(s.a.Component),G=V,J=n(522),Y=n.n(J),Z=n(565),Q=(n(553),n(554)),X=n.n(Q),$=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,s=new Array(a),r=0;r<a;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={file:null,authorized:["image/jpeg","image/png"]},e.addFile=function(t){var n=t.target.files[0];n&&e.setState({file:n})},e.sendFile=function(){var t=e.state.file,n=e.props,a=n.uploadFile,s=n.closeModal;null!==t&&(e.isAuthorized(t.name)&&(a(t,{contentType:X.a.lookup(t.name)}),s(),e.clearFile()))},e.clearFile=function(){return e.setState({file:null})},e.isAuthorized=function(t){return e.state.authorized.includes(X.a.lookup(t))},e}return Object(o.a)(n,[{key:"render",value:function(){var e=this.props,t=e.modal,n=e.closeModal;return Object(x.jsxs)(p.a,{basic:!0,open:t,onClose:n,children:[Object(x.jsx)(p.a.Header,{children:"Select an Image File"}),Object(x.jsx)(p.a.Content,{children:Object(x.jsx)(L.a,{fluid:!0,label:"File types: jpg, png",name:"file",type:"file",onChange:this.addFile})}),Object(x.jsxs)(p.a.Actions,{children:[Object(x.jsxs)(j.a,{onClick:this.sendFile,color:"green",inverted:!0,children:[Object(x.jsx)(v.a,{name:"checkmark"})," Upload"]}),Object(x.jsxs)(j.a,{color:"red",inverted:!0,children:[Object(x.jsx)(v.a,{name:"remove"})," Cancel"]})]})]})}}]),n}(s.a.Component),ee=$,te=n(577),ne=function(e){var t=e.uploadState,n=e.percentUploaded;return"uploading"===t&&Object(x.jsx)(te.a,{className:"progress__bar",percent:n,progress:!0,indicating:!0,size:"medium",inverted:!0})},ae=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,s=new Array(a),r=0;r<a;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={message:"",channel:e.props.currentChannel,user:e.props.currentUser,loading:!1,errors:[],modal:!1,uploadState:"",uploadTask:null,storageRef:O.a.storage().ref(),typingRef:O.a.database().ref("typing"),percentUploaded:0,emojiPicker:!1},e.handleChange=function(t){e.setState(Object(I.a)({},t.target.name,t.target.value))},e.handleKeyDown=function(t){13===t.keyCode&&e.sendMessage();var n=e.state,a=n.message,s=n.typingRef,r=n.channel,c=n.user;a?s.child(r.id).child(c.uid).set(c.displayName):e.removeTypingRef(r.id,c.uid)},e.createMessage=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n={timestamp:O.a.database.ServerValue.TIMESTAMP,user:{id:e.state.user.uid,name:e.state.user.displayName}};return null!==t?n.image=t:n.content=e.state.message,n},e.openModal=function(){return e.setState({modal:!0})},e.closeModal=function(){return e.setState({modal:!1})},e.sendMessage=function(){var t=e.props.getMessagesRef,n=e.state,a=n.message,s=n.channel,r=n.user;a?(e.setState({loading:!0}),t().child(s.id).push().set(e.createMessage()).then((function(){e.setState({loading:!1,message:"",error:[]}),e.removeTypingRef(s.id,r.uid)})).catch((function(t){e.setState({loading:!1,errors:e.state.errors.concat(t)})}))):e.setState({errors:e.state.errors.concat({message:"Add a message"})})},e.getPath=function(){return e.props.isPrivateChannel?"chat/private/".concat(e.state.channel.id):"chat/public"},e.uploadFile=function(t,n){var a=e.state.channel.id,s=e.props.getMessagesRef(),r="".concat(e.getPath(),"/").concat(Y()(),".jpeg");e.setState({uploadState:"uploading",uploadTask:e.state.storageRef.child(r).put(t,n)},(function(){e.state.uploadTask.on("static_changed",(function(t){var n=Math.round(t.bytesTransferred/t.totalBytes*100);e.setState({percentUploaded:n})}),(function(t){e.setState({errors:e.state.errors.concat(t),uploadState:"error",uploadTask:null})}),(function(){e.state.uploadTask.snapshot.ref.getDownloadURL().then((function(t){e.sendFileMessage(t,s,a)})).catch((function(t){e.setState({errors:e.state.errors.concat(t),uploadState:"error",uploadTask:null})}))}))}))},e.sendFileMessage=function(t,n,a){n.child(a).push().set(e.createMessage(t)).then((function(){e.setState({uploadState:"done"})})).catch((function(t){e.setState({errors:e.state.errors.concat(t)})}))},e.handleTogglePicker=function(){e.setState({emojiPicker:!e.state.emojiPicker})},e.colonToUnicode=function(e){return e.replace(/:[A-Za-z0-9_+-]+:/g,(function(e){e=e.replace(/:/g,"");var t=Z.b.emojis[e];if("undefined"!==typeof t){var n=t.native;if("undefined"!==typeof n)return n}return e=":"+e+":"}))},e.handleAddEmoji=function(t){var n=e.state.message,a=e.colonToUnicode("".concat(n," ").concat(t.colons));e.setState({message:a,emojiPicker:!1}),setTimeout((function(){e.messageInputRef.focus()}),0)},e}return Object(o.a)(n,[{key:"componentWillUnmount",value:function(){null!==this.state.uploadTask&&(this.state.uploadTask.cancel(),this.setState({uploadTask:null}))}},{key:"removeTypingRef",value:function(e,t){this.state.typingRef.child(e).child(t).remove()}},{key:"render",value:function(){var e=this,t=this.state,n=t.errors,a=t.message,s=t.loading,r=t.modal,c=t.uploadState,i=t.percentUploaded,o=t.emojiPicker;return Object(x.jsxs)(m.a,{className:"message__form",children:[o&&Object(x.jsx)(Z.a,{set:"apple",title:"Pick your emoji",emoji:"point_up",autoFocus:!0,onSelect:this.handleAddEmoji}),Object(x.jsx)(L.a,{fluid:!0,onChange:this.handleChange,name:"message",style:{marginBottom:"20px"},labelPosition:"left",label:Object(x.jsx)(j.a,{onClick:this.handleTogglePicker,icon:o?"close":"add",content:o?"Close":null}),placeholder:"Write your messages",value:a,onKeyDown:this.handleKeyDown,className:n.some((function(e){return e.message.toLowerCase().includes("message")}))?"error":"",ref:function(t){return e.messageInputRef=t}}),Object(x.jsxs)(j.a.Group,{icon:!0,widths:"2",children:[Object(x.jsx)(j.a,{color:"orange",onClick:this.sendMessage,content:"Add reply",labelPosition:"left",icon:"edit",disabled:s}),Object(x.jsx)(j.a,{color:"teal",onClick:this.openModal,disabled:"uploading"===c,content:"Upload media",labelPosition:"right",icon:"cloud upload"})]}),Object(x.jsx)(ee,{modal:r,closeModal:this.closeModal,uploadFile:this.uploadFile}),Object(x.jsx)(ne,{uploadState:c,percentUploaded:i})]})}}]),n}(s.a.Component),se=ae,re=n(561),ce=n.n(re),ie=function(e,t){return e.user.id===t.uid?"message__self":""},oe=function(e){return e.hasOwnProperty("image")&&!e.hasOwnProperty("content")},le=function(e){var t,n=e.message,a=e.user;return Object(x.jsxs)(K.a,{children:[Object(x.jsx)(K.a.Avatar,{src:n.user.avatar}),Object(x.jsxs)(K.a.Content,{className:ie(n,a),children:[Object(x.jsx)(K.a.Author,{as:"a",children:n.user.name}),Object(x.jsx)(K.a.Metadata,{children:(t=n.timestamp,ce()(t).fromNow())}),oe(n)?Object(x.jsx)(U.a,{src:n.image,className:"message__image"}):Object(x.jsxs)(K.a.Text,{children:[" ",n.content," "]})]})]})},de=function(){return Object(x.jsxs)("div",{className:"typing",children:[Object(x.jsx)("div",{className:"typing__dot"}),Object(x.jsx)("div",{className:"typing__dot"}),Object(x.jsx)("div",{className:"typing__dot"})]})},ue=function(){return Object(x.jsxs)("div",{className:"skeleton",children:[Object(x.jsx)("div",{className:"skeleton__avatar"}),Object(x.jsx)("div",{className:"skeleton__author"}),Object(x.jsx)("div",{className:"skeleton__details"})]})},he=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={messagesRef:O.a.database().ref("messages"),privateMessagesRef:O.a.database().ref("privateMessages"),usersRef:O.a.database().ref("users"),typingRef:O.a.database().ref("typing"),connectedRef:O.a.database().ref(".info/connected"),channel:e.props.currentChannel,privateChannel:e.props.isPrivateChannel,isChannelStarred:!1,user:e.props.currentUser,messages:[],messagesLoading:!0,numUniqUsers:"",searchTerm:"",searchLoading:!1,searchResults:[],userList:e.props.userList,typingUsers:[],listeners:[]},e.scrollToBottom=function(){e.messagesEnd.scrollIntoView({behavior:"smooth"})},e.addListeners=function(t,n){e.addMessageListener(t),e.addUserStarsListeners(t,n),e.addTypingListeners(t,n)},e.addToListeners=function(t,n,a){if(-1===e.state.listeners.findIndex((function(e){return e.id===t&&e.ref===n&&e.event===a}))){var s={id:t,ref:n,event:a};e.setState({listeners:e.state.listeners.concat(s)})}},e.removeListeners=function(e){e.forEach((function(e){e.ref.child(e.id).off(e.event)}))},e.addMessageListener=function(t){var n=[],a=e.getMessagesRef();a.child(t).on("child_added",(function(t){var a=t.val(),s=e.getPostCreator(t.val(),e.state.userList);a.user.avatar=s.userData.avatar,n.push(a),e.setState({messages:n,messagesLoading:!1}),e.countUniqUsers(n),e.countUserPosts(n)})),e.addToListeners(t,a,"child_added")},e.addTypingListeners=function(t,n){var a=[];e.state.typingRef.child(t).on("child_added",(function(t){t.key!==n&&(a=a.concat({id:t.key,name:t.val()}),e.setState({typingUsers:a}))})),e.addToListeners(t,e.state.typingRef,"child_added"),e.state.typingRef.child(t).on("child_removed",(function(t){-1!==a.findIndex((function(e){return e.id===t.key}))&&(a=a.filter((function(e){return e.id!==t.key})),e.setState({typingUsers:a}))})),e.addToListeners(t,e.state.typingRef,"child_removed"),e.state.connectedRef.on("value",(function(n){!0===n.val()&&e.state.typingRef.child(t).child(e.state.user.uid).onDisconnect().remove((function(e){null!==e&&console.log(e)}))}))},e.getPostCreator=function(e,t){var n=e.user;return t.find((function(e){return e.userId===n.id}))},e.addUserStarsListeners=function(t,n){e.state.usersRef.child(n).child("starred").once("value").then((function(n){if(null!==n.val()){var a=Object.keys(n.val()).includes(t);e.setState({isChannelStarred:a})}}))},e.getMessagesRef=function(){var t=e.state,n=t.messagesRef,a=t.privateMessagesRef;return t.privateChannel?a:n},e.countUniqUsers=function(t){var n=t.reduce((function(e,t){return e.includes(t.user.name)||e.push(t.user.name),e}),[]),a="".concat(n.length," users");e.setState({numUniqUsers:a})},e.countUserPosts=function(t){var n=t.reduce((function(e,t){return t.user.name in e?e[t.user.name].count+=1:e[t.user.name]={avatar:t.user.avatar,count:1},e}),[]);e.props.setUserPosts(n)},e.displayMessages=function(t){return t.length>0&&t.map((function(t){return Object(x.jsx)(le,{message:t,user:e.state.user},t.timestamp)}))},e.displayChannelName=function(t){return t?"".concat(e.state.privateChannel?"@":"#").concat(t.name):""},e.handleSearchChange=function(t){e.setState({searchTerm:t.target.value,searchLoading:!0},(function(){e.handleSearchMessages()}))},e.handleSearchMessages=function(){var t=Object(A.a)(e.state.messages),n=new RegExp(e.state.searchTerm,"gi"),a=t.reduce((function(e,t){return(t.content&&t.content.match(n)||t.user.name.match(n))&&e.push(t),e}),[]);e.setState({searchResults:a}),setTimeout((function(){e.setState({searchLoading:!1})}),1e3)},e.handleStar=function(){e.setState((function(e){return{isChannelStarred:!e.isChannelStarred}}),(function(){return e.starChannel()}))},e.starChannel=function(){e.state.isChannelStarred?e.state.usersRef.child("".concat(e.state.user.uid,"/starred")).update(Object(I.a)({},e.state.channel.id,{name:e.state.channel.name,details:e.state.channel.details,createdBy:e.state.channel.createdBy})):e.state.usersRef.child("".concat(e.state.user.uid,"/starred")).child(e.state.channel.id).remove((function(e){null!==e&&console.log(e)}))},e.displayTypingUsers=function(e){return e.length>0&&e.map((function(e){return Object(x.jsxs)("div",{style:{display:"flex",alignItems:"center",marginBottom:"4px"},children:[Object(x.jsx)("span",{className:"user__typing",children:e.name})," ",Object(x.jsx)(de,{})]},e.id)}))},e.displayMessageSkeleton=function(e){return e?Object(x.jsx)(s.a.Fragment,{children:Object(A.a)(Array(10)).map((function(e,t){return Object(x.jsx)(ue,{},t)}))}):null},e}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=this.state,t=e.channel,n=e.user,a=e.listeners;t&&n&&(this.removeListeners(a),this.addListeners(t.id,n.uid))}},{key:"componentWillReceiveProps",value:function(e){var t=this,n=this.state.messages;n.forEach((function(n){var a=t.getPostCreator(n,e.userList);n.user.avatar=a.userData.avatar})),this.setState({messages:n})}},{key:"componentDidUpdate",value:function(e,t){this.messagesEnd&&this.scrollToBottom()}},{key:"componentWillUnmount",value:function(){this.removeListeners(this.state.listeners),this.state.connectedRef.off()}},{key:"render",value:function(){var e=this,t=this.state,n=t.messagesRef,a=t.channel,r=t.user,c=t.messages,i=t.numUniqUsers,o=t.searchTerm,l=t.searchResults,d=t.searchLoading,u=t.privateChannel,h=t.isChannelStarred,f=t.typingUsers,j=t.messagesLoading;return Object(x.jsxs)(s.a.Fragment,{children:[Object(x.jsx)(G,{channelName:this.displayChannelName(a),numUniqUsers:i,handleSearchChange:this.handleSearchChange,searchLoading:d,isPrivateChannel:u,handleStar:this.handleStar,isChannelStarred:h}),Object(x.jsx)(m.a,{children:Object(x.jsxs)(K.a.Group,{className:"messages",children:[this.displayMessageSkeleton(j),o?this.displayMessages(l):this.displayMessages(c),this.displayTypingUsers(f),Object(x.jsx)("div",{ref:function(t){return e.messagesEnd=t}})]})}),Object(x.jsx)(se,{messagesRef:n,currentChannel:a,currentUser:r,isPrivateChannel:u,getMessagesRef:this.getMessagesRef})]})}}]),n}(s.a.Component),fe=Object(c.b)(null,{setUserPosts:C.g})(he),je=n(567),pe=n(585),me=n(586),ge=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,s=new Array(a),r=0;r<a;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={activeIndex:0,channel:e.props.currentChannel,privateChannel:e.props.isPrivateChannel,userList:e.props.userList},e.getChannelCreator=function(e,t){var n=e.createdBy;return t.find((function(e){return e.userId===n}))},e.setActiveIndex=function(t,n){var a=n.index,s=e.state.activeIndex===a?-1:a;e.setState({activeIndex:s})},e.displayTopPosters=function(e){return Object.entries(e).sort((function(e,t){return t[1]-e[1]})).map((function(e,t){var n=Object(je.a)(e,2),a=n[0],s=n[1];return Object(x.jsxs)(pe.a.Item,{children:[Object(x.jsx)(U.a,{avatar:!0,src:s.avatar}),Object(x.jsxs)(pe.a.Content,{children:[Object(x.jsx)(pe.a.Header,{as:"a",children:a}),Object(x.jsxs)(pe.a.Description,{children:[s.count," posts"]})]})]},t)})).splice(0,3)},e}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=this.state,t=e.channel,n=e.userList,a=e.privateChannel;if(t&&n.length&&!a){var s=this.getChannelCreator(t,n);t.creatorData=s.userData,this.setState({channel:t})}}},{key:"componentWillReceiveProps",value:function(e){var t=this.state,n=t.channel,a=t.privateChannel;if(n&&e.userList.length&&!a){var s=this.getChannelCreator(n,e.userList);n.creatorData=s.userData,this.setState({channel:n})}}},{key:"render",value:function(){var e=this.state,t=e.activeIndex,n=e.privateChannel,a=e.channel,s=this.props.userPosts;return n?null:Object(x.jsxs)(m.a,{loading:!a,children:[Object(x.jsxs)(k.a,{as:"h3",attached:"top",children:["About # ",a&&a.name]}),Object(x.jsxs)(me.a,{styled:!0,attached:"true",children:[Object(x.jsxs)(me.a.Title,{active:0===t,index:0,onClick:this.setActiveIndex,children:[Object(x.jsx)(v.a,{name:"dropdown"}),Object(x.jsx)(v.a,{name:"info"}),"DETAILS"]}),Object(x.jsx)(me.a.Content,{active:0===t,children:a&&a.details}),Object(x.jsxs)(me.a.Title,{active:1===t,index:1,onClick:this.setActiveIndex,children:[Object(x.jsx)(v.a,{name:"dropdown"}),Object(x.jsx)(v.a,{name:"user circle"}),"TOP POSTERS"]}),Object(x.jsx)(me.a.Content,{active:1===t,children:Object(x.jsx)(pe.a,{children:s&&this.displayTopPosters(s)})}),Object(x.jsxs)(me.a.Title,{active:2===t,index:2,onClick:this.setActiveIndex,children:[Object(x.jsx)(v.a,{name:"dropdown"}),Object(x.jsx)(v.a,{name:"pencil alternate"}),"CREATED BY"]}),Object(x.jsx)(me.a.Content,{active:2===t,children:Object(x.jsxs)(k.a,{as:"h3",children:[Object(x.jsx)(U.a,{circular:!0,src:a&&a.creatorData&&a.creatorData.avatar}),a&&a.creatorData&&a.creatorData.name]})})]})]})}}]),n}(s.a.Component),ve=ge;t.default=Object(c.b)((function(e){return{currentUser:e.user.currentUser,currentChannel:e.channel.currentChannel,isPrivateChannel:e.channel.isPrivateChannel,userPosts:e.channel.userPosts,primaryColor:e.colors.primaryColor,secondaryColor:e.colors.secondaryColor,userList:e.userCache.userList}}))((function(e){var t=e.currentUser,n=e.currentChannel,a=e.isPrivateChannel,s=e.userPosts,c=e.primaryColor,i=e.secondaryColor,o=e.userList;return Object(x.jsxs)(r.a,{columns:"equal",className:"app",style:{background:i,margin:-20},children:[Object(x.jsx)(S,{currentUser:t},t&&t.name),Object(x.jsx)(H,{currentUser:t,primaryColor:c},t&&t.uid),n&&Object(x.jsx)(r.a.Column,{style:{marginLeft:340,marginTop:20},children:Object(x.jsx)(fe,{currentChannel:n,currentUser:t,isPrivateChannel:a,userList:o},n&&n.id)}),n&&Object(x.jsx)(r.a.Column,{style:{marginTop:20,marginRight:20},width:4,children:Object(x.jsx)(ve,{currentChannel:n,isPrivateChannel:a,userPosts:s,userList:o},n&&n.name)}),!n&&Object(x.jsx)(r.a.Column,{style:{marginLeft:320},children:Object(x.jsxs)("div",{className:"notfound",children:[Object(x.jsx)("div",{className:"notfound-404",children:Object(x.jsxs)("h1",{children:[" ",Object(x.jsx)("span",{children:"Secret Society"})]})}),Object(x.jsx)("h2",{children:"No channels, please select or create a channel to get started"})]})})]})}))}}]);
//# sourceMappingURL=6.f6768d43.chunk.js.map