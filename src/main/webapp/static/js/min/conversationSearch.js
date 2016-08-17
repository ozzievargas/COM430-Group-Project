var Conversations=function(){var c="",p=[],l=void 0,m=void 0,q="",d=[],g=[],h={},e=void 0,r=!1,k=[];$(function(){var a=function(a){jsGrid.Field.call(this,a)},b=function(a){jsGrid.Field.call(this,a)},d=function(a){jsGrid.Field.call(this,a)};a.prototype=new jsGrid.Field({sorter:function(a,b){return new Date(a)-new Date(b)},itemTemplate:function(a){return(new Date(a)).toLocaleString()},insertTemplate:function(a){return""},editTemplate:function(a){return""},insertValue:function(){return""},editValue:function(){return""}});
$("#onlyMyConversations").click(function(){r=$(this).is(":checked");f()});b.prototype=new jsGrid.Field({sorter:function(a,b){return 0},itemTemplate:function(a,b){if("importing"in b){var t=b.stageProgress.numerator,d=b.stageProgress.denominator,e=b.stageProgress.name;return $("<div/>").append($("<progress/>",{value:t,max:d,text:sprintf("%s out of %s",t,d)})).append($("<div/>",{text:e}))}return b.author==c?$("<a/>",{href:sprintf("/editConversation?conversationJid=%s",b.jid),text:"Edit"}):""},insertTemplate:function(a){return""},
editTemplate:function(a){return""},insertValue:function(){return""},editValue:function(){return""}});d.prototype=new jsGrid.Field({sorter:function(a,b){return 0},itemTemplate:function(a,b){if("importing"in b){var c=b.overallProgress.numerator,d=b.overallProgress.denominator,e=b.overallProgress.name;return $("<div/>").append($("<progress/>",{value:c,max:d,text:sprintf("%s out of %s",c,d)})).append($("<div/>",{text:e}))}return a},insertTemplate:function(a){return""},editTemplate:function(a){return""},
insertValue:function(){return""},editValue:function(){return""}});jsGrid.fields.dateField=a;jsGrid.fields.editConversationField=b;jsGrid.fields.joinConversationField=function(a){jsGrid.Field.call(this,a)};jsGrid.fields.conversationSharingField=d;e=$("#conversationsDataGrid");e.jsGrid({width:"100%",height:"auto",inserting:!1,editing:!1,sorting:!0,paging:!0,noDataContent:"No conversations match your query",rowClick:function(a){"jid"in a.item&&!("importing"in a.item)&&(window.location.href=sprintf("/board?conversationJid=%s&unique=true",
a.item.jid))},controller:{loadData:function(a){if("sortField"in a){var b=_.sortBy(k,function(b){return b[a.sortField]});r&&(b=_.filter(b,function(a){return a.author==c}));"sortOrder"in a&&"desc"==a.sortOrder&&(b=_.reverse(b));return b}return k}},pageLoading:!1,fields:[{name:"title",type:"text",title:"Title",readOnly:!0,itemTemplate:function(a,b){if("newConversation"in b&&1==b.newConversation){var c=$("<span/>");c.append($("<span/>",{"class":"newConversation",text:"new"}));c.append($("<span/>",{html:a}));
console.log("newTag:",c.html().toString());return c}return a}},{name:"creation",type:"dateField",title:"Created"},{name:"author",type:"text",title:"Author",readOnly:!0},{name:"subject",type:"conversationSharingField",title:"Sharing",readOnly:!0},{name:"edit",type:"editConversationField",title:"Edit",sorting:!1,width:30,css:"gridAction"}]});e.jsGrid("sort",{field:"creation",order:"desc"});$("#activeImportsListing").hide();$("#importConversationInputElementContainer").hide();$("#showImportConversationWorkflow").click(function(){$("#importConversationInputElement").click()});
$("#importConversationInputElement").fileupload({dataType:"json",add:function(a,b){$("#importConversationProgress").css("width","0%");$("#importConversationProgressBar").show();$("#activeImportsListing").show();b.submit()},progressall:function(a,b){var c=parseInt(b.loaded/b.total*100,10)+"%";$("#importConversationProgressBar").css("width",c)},done:function(a,b){$.each(b.files,function(a,b){$("<p/>").text(b.name).appendTo(document.body)});$("#importConversationProgress").fadeOut()}});l=$("#conversationContainerListing");
l.find(".conversationContainer").clone();l.empty();m=$("#activeImportsListing");m.find(".importContainer").clone();m.empty();a=$("#conversationSearchBox");h=$("<input/>",{type:"text",val:q});a.append(h);h.on("keydown",function(a){var b=$(this).val();query=b;13==a.keyCode&&n(b)});$("#createConversationButton").on("click",function(){var a=sprintf("%s at %s",c,(new Date).toString());createConversation(a)});$("#searchButton").on("click",function(){n(query)})});var u=function(a){return"deleted"!=a.subject&&
(a.author==c||_.some(p,function(b){return b.value.toLowerCase().trim()==a.subject.toLowerCase().trim()}))},f=function(){var a=_.filter(_.map(g,function(a){return"result"in a&&"a"in a.result?{importing:!0,title:sprintf("%s - %s - %s","import failure",a.name,a.a),author:a.author,jid:a.id,newConversation:!0,creation:(new Date).getTime(),overallProgress:a.overallProgress,stageProgress:a.stageProgress}:"result"in a&&"b"in a.result?(a=a.result.b,!("creation"in a)&&"created"in a&&_.isNumber(a.created)&&
(a.creation=a.created,a.created=new Date(a.creation)),a.newConversation=!0,a):{importing:!0,title:a.name,author:a.author,jid:a.id,newConversation:!0,creation:(new Date).getTime(),overallProgress:a.overallProgress,stageProgress:a.stageProgress}}),function(a){return"importing"in a&&1==a.importing||!_.some(d,function(c){return c.jid==a.jid})});k=_.concat(a,_.filter(d,u));void 0!=e&&(e.jsGrid("loadData"),a=e.jsGrid("getSorting"),"field"in a&&e.jsGrid("sort",a));a=k;a=sprintf("%s result%s",a.length,1==
a.length?"":"s");$("#conversationListing").find(".aggregateContainer").find(".count").text(a)},n=function(a){q=a;getSearchResult(a)};return{receiveUsername:function(a){c=a},receiveUserGroups:function(a){p=a},receiveConversationDetails:function(a){d=_.map(d,function(b){return b.jid==a.jid?(a.newConversation=b.newConversation,a):b});f()},receiveSearchResults:function(a){d=a;f()},receiveNewConversationDetails:function(a){a.newConversation=!0;d.push(a);f()},receiveImportDescription:function(a){g=_.filter(g,
function(b){return b.id!=a.id});g.push(a);f()},receiveImportDescriptions:function(a){g=a;f()},receiveQuery:function(a){query=a;h.val(a);f()},getConversationListing:function(){return listing},getImportListing:function(){return g},getQuery:function(){return query},search:n,create:function(a){createConversation(a)}}}();function serverResponse(c){}function receiveUsername(c){Conversations.receiveUsername(c)}function receiveUserGroups(c){Conversations.receiveUserGroups(c)}
function receiveConversationDetails(c){Conversations.receiveConversationDetails(c)}function receiveConversations(c){Conversations.receiveSearchResults(c)}function receiveNewConversationDetails(c){Conversations.receiveNewConversationDetails(c)}function receiveImportDescription(c){Conversations.receiveImportDescription(c)}function receiveImportDescriptions(c){Conversations.receiveImportDescriptions(c)}function receiveQuery(c){Conversations.receiveQuery(c)};
