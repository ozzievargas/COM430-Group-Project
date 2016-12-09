var Conversations=function(){var b="",l=[],p=void 0,q=void 0,d="",h=[],k=[],n={},g=void 0,v=!1,w=!1,m=[],r=!1;$(function(){var a=function(a){jsGrid.Field.call(this,a)},e=function(a){jsGrid.Field.call(this,a)},c=function(a){jsGrid.Field.call(this,a)};a.prototype=new jsGrid.Field({sorter:function(a,c){return new Date(a)-new Date(c)},itemTemplate:function(a){return(new Date(a)).toLocaleString()},insertTemplate:function(a){return""},editTemplate:function(a){return""},insertValue:function(){return""},
editValue:function(){return""}});$("#onlyMyConversations").click(function(){v=$(this).is(":checked");f()});$("#includeDeleted").click(function(){w=$(this).is(":checked");f()});e.prototype=new jsGrid.Field({sorter:function(a,c){return 0},itemTemplate:function(a,c){if("importing"in c){var b=c.stageProgress.numerator,e=c.stageProgress.denominator,d=c.stageProgress.name;return $("<div/>").append($("<progress/>",{value:b,max:e,text:sprintf("%s out of %s",b,e)})).append($("<div/>",{text:d}))}return y(c)?
$("<a/>",{href:sprintf("/editConversation?conversationJid=%s",c.jid),text:"Edit"}):""},insertTemplate:function(a){return""},editTemplate:function(a){return""},insertValue:function(){return""},editValue:function(){return""}});c.prototype=new jsGrid.Field({sorter:function(a,c){return 0},itemTemplate:function(a,c){if("importing"in c){var b=c.overallProgress.numerator,e=c.overallProgress.denominator,d=c.overallProgress.name;return $("<div/>").append($("<progress/>",{value:b,max:e,text:sprintf("%s out of %s",
b,e)})).append($("<div/>",{text:d}))}return a},insertTemplate:function(a){return""},editTemplate:function(a){return""},insertValue:function(){return""},editValue:function(){return""}});jsGrid.fields.dateField=a;jsGrid.fields.editConversationField=e;jsGrid.fields.joinConversationField=function(a){jsGrid.Field.call(this,a)};jsGrid.fields.conversationSharingField=c;g=$("#conversationsDataGrid");g.jsGrid({width:"100%",height:"auto",inserting:!1,editing:!1,sorting:!0,paging:!0,noDataContent:"No conversations match your query",
rowClick:function(a){"jid"in a.item&&!("importing"in a.item)&&(window.location.href=sprintf("/board?conversationJid=%s&unique=true",a.item.jid))},controller:{loadData:function(a){if("sortField"in a){var c=_.sortBy(m,function(c){return c[a.sortField]});v&&(c=_.filter(c,function(a){return a.author==b}));"sortOrder"in a&&"desc"==a.sortOrder&&(c=_.reverse(c));return c}return m}},pageLoading:!1,fields:[{name:"lifecycle",type:"text",title:"Lifecycle",readOnly:!0,itemTemplate:function(a,c){var b=$("<span/>");
switch(a){case "deleted":b.addClass("deletedConversationTag").text("archived");break;case "new":b.addClass("newConversationTag").text("new");break;default:b.text("")}return b}},{name:"title",type:"text",title:"Title",readOnly:!0},{name:"creation",type:"dateField",title:"Created"},{name:"author",type:"text",title:"Author",readOnly:!0},{name:"subject",type:"conversationSharingField",title:"Sharing",readOnly:!0},{name:"edit",type:"editConversationField",title:"Edit",sorting:!1,width:30,css:"gridAction"}]});
g.jsGrid("sort",{field:"creation",order:"desc"});$("#activeImportsListing").hide();$("#importConversationInputElementContainer").hide();$("#showImportConversationWorkflow").click(function(){$("#importConversationInputElement").click()});$("#importConversationInputElement").fileupload({dataType:"json",add:function(a,c){$("#importConversationProgress").css("width","0%");$("#importConversationProgressBar").show();$("#activeImportsListing").show();c.submit()},progressall:function(a,c){var b=parseInt(c.loaded/
c.total*100,10)+"%";$("#importConversationProgressBar").css("width",b)},done:function(a,c){$.each(c.files,function(a,c){$("<p/>").text(c.name).appendTo(document.body)});$("#importConversationProgress").fadeOut()}});p=$("#conversationContainerListing");p.find(".conversationContainer").clone();p.empty();q=$("#activeImportsListing");q.find(".importContainer").clone();q.empty();a=$("#conversationSearchBox");n=$("<input/>",{type:"text",val:d});a.append(n);n.on("keyup",function(a){d=$(this).val().toLowerCase().trim();
13==a.keyCode&&r&&t(d)});$("#createConversationButton").on("click",function(){var a=sprintf("%s at %s",b,(new Date).toString());createConversation(a)});x()});var x=function(){r=!0;$("#searchButton").off("click").attr("disabled",!1).on("click",function(){t(d)})},y=function(a){return a.author==b||_.some(l,function(a){var c=a.name?a.name:a.value;return"special"==(a.key?a.key:a.ouType)&&"superuser"==c})},z=function(a){var e=a.subject.toLowerCase().trim(),c=a.title.toLowerCase().trim();a=a.author;var f=
d;return(f==a||-1<c.indexOf(f))&&("deleted"!=e||w&&a==b)&&(a==b||_.some(l,function(a){var c=a.name?a.name:a.value;return"special"==(a.key?a.key:a.ouType)&&"superuser"==c||c.toLowerCase().trim()==e}))},f=function(){var a=_.filter(_.map(k,function(a){return"result"in a&&"a"in a.result?{importing:!0,title:sprintf("%s - %s - %s","import failure",a.name,a.a),author:a.author,jid:a.id,newConversation:!0,creation:(new Date).getTime(),overallProgress:a.overallProgress,stageProgress:a.stageProgress}:"result"in
a&&"b"in a.result?(a=a.result.b,!("creation"in a)&&"created"in a&&_.isNumber(a.created)&&(a.creation=a.created,a.created=new Date(a.creation)),a.newConversation=!0,a):{lifecycle:"new",importing:!0,title:a.name,author:a.author,jid:a.id,newConversation:!0,creation:(new Date).getTime(),overallProgress:a.overallProgress,stageProgress:a.stageProgress}}),function(a){return"importing"in a&&1==a.importing||!_.some(h,function(b){return b.jid==a.jid})}),b=(new Date).getTime()-18E5;m=_.map(_.concat(a,_.filter(h,
z)),function(a){a.lifecycle="deleted"==a.subject?"deleted":a.creation>b?"new":"available";return a});void 0!=g&&(g.jsGrid("loadData"),a=g.jsGrid("getSorting"),"field"in a&&g.jsGrid("sort",a));a=m;a=sprintf("%s result%s",a.length,1==a.length?"":"s");$("#conversationListing").find(".aggregateContainer").find(".count").text(a)},t=function(a){$("#searchButton").attr("disabled",!0).off("click");r=!1;d=a.toLowerCase().trim();u();getSearchResult(d)},u=function(){console.log("updating queryparams:",d,window.location);
if(void 0!=window&&"history"in window&&"pushState"in window.history){var a=window.location,b=d,a=sprintf("%s//%s%s",a.protocol,a.host,a.pathname);void 0!=b&&(a=sprintf("%s?query=%s",a,b));window.history.replaceState({path:a,url:a},a,a)}};return{receiveUsername:function(a){b=a},receiveUserGroups:function(a){l=a},receiveConversationDetails:function(a){h=_.uniq(_.concat([a],_.filter(h,function(b){return b.jid!=a.jid})));f()},receiveSearchResults:function(a){h=a;x();u();f()},receiveNewConversationDetails:function(a){a.newConversation=
!0;h.push(a);f()},receiveImportDescription:function(a){k=_.filter(k,function(b){return b.id!=a.id});k.push(a);f()},receiveImportDescriptions:function(a){k=a;f()},receiveQuery:function(a){d=a.toLowerCase().trim();u();n.val(d);f()},getConversationListing:function(){return m},getImportListing:function(){return k},getQuery:function(){return d},getUsername:function(){return b},getUserGroups:function(){return l},search:t,create:function(a){createConversation(a)},getUserGroups:function(){return l},getUsername:function(){return b}}}();
function augmentArguments(b){b[_.size(b)]=(new Date).getTime();return b}function serverResponse(b){}function receiveUsername(b){Conversations.receiveUsername(b)}function receiveUserGroups(b){Conversations.receiveUserGroups(b)}function receiveConversationDetails(b){Conversations.receiveConversationDetails(b)}function receiveConversations(b){Conversations.receiveSearchResults(b)}function receiveNewConversationDetails(b){Conversations.receiveNewConversationDetails(b)}
function receiveImportDescription(b){Conversations.receiveImportDescription(b)}function receiveImportDescriptions(b){Conversations.receiveImportDescriptions(b)}function receiveQuery(b){Conversations.receiveQuery(b)};
