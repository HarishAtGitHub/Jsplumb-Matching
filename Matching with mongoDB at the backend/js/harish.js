$(document).ready(function() {
	var exampleDropOptions = {
				tolerance:'touch',
				hoverClass:'dropHover',
				activeClass:'dragActive'
			};
        		var example3Color = "#01A3C6";
			exampleEndpoint3 = {
				endpoint:["Dot", {radius:17} ],
				anchor:"BottomLeft",
				paintStyle:{ fillStyle:example3Color, opacity:0.5 },
				isSource:true,
				scope:'yellow dot',
				connectorStyle:{ strokeStyle:example3Color, lineWidth:4 },
				connector : "Bezier",
				isTarget:false,
			/*	connectorOverlays:[ ["PlainArrow", { events : {click :function(conn, originalEvent){  alert("hai");if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?")) jsPlumb.detach(conn);  } } }, { fillStyle:"#09098e", width:15, length:15,location:0.15 } ] ], */
                                connectorOverlays:[ ["Arrow", { events : {click :function(diamondOverlay, originalEvent){  console.log(diamondOverlay.component);var src = $("#"+ diamondOverlay.component.sourceId).find('li').text() ; var dest = $("#"+ diamondOverlay.component.targetId).find('li').text(); if (confirm("Delete mapping of " + src + " to " + dest + "?")) jsPlumb.detach(diamondOverlay.component);  } } }, { width:15, length:9,location:0.15 } ],["Arrow", { events : {click :function(diamondOverlay, originalEvent){  console.log(diamondOverlay.component);var src = $("#"+ diamondOverlay.component.sourceId).find('li').text() ; var dest = $("#"+ diamondOverlay.component.targetId).find('li').text(); if (confirm("Delete mapping of " + src + " to " + dest + "?")) jsPlumb.detach(diamondOverlay.component);  } } }, { strokeStyle:"#000000" ,width:15, length:9,location:0.17, direction: -1 } ] ],
				
				maxConnections : -1,
				connectorHoverStyle : {lineWidth:4,strokeStyle:"red"} ,
				
				
			
				dropOptions : exampleDropOptions,
				//beforeDetach:function(conn) { 
				//	return confirm("Detach connection?"); 
				//},
				onMaxConnections:function(info) {
					alert("Cannot drop connection " + info.connection.id + " : maxConnections has been reached on Endpoint " + info.endpoint.id);
				}
			};
			var example4Color = "red";
			exampleEndpoint4 = {
				endpoint:"Rectangle",
				anchor:"BottomLeft",
				paintStyle:{ fillStyle:example3Color, opacity:0.5 },
				isSource:false,
				scope:'yellow dot',
				connectorStyle:{ strokeStyle:example3Color, lineWidth:4 },
				connector : "Bezier",
				isTarget:true,
				maxConnections : -1,
				
				dropOptions : exampleDropOptions,
				//beforeDetach:function(conn) { 
				//	return confirm("Detach connection?"); 
				//},
				onMaxConnections:function(info) {
					alert("Cannot drop connection " + info.connection.id + " : maxConnections has been reached on Endpoint " + info.endpoint.id);
				}
			};
                        


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/*		

			//Setting async to false
			$.ajaxSetup( { "async": false } );

			/////////////Getting Tracker Fields..For initial display before forming conections , this is just a demo , the actual values comes from soap request to ctf//////////////////////////////////////////////////////
			$.getJSON('http://localhost:8123/getTrackerFields', function(data) {
				var rows = data.fields;
				var noOfRows = rows.length;
				for (var i = noOfRows-1; i >= 0; i--) {
					var name = rows[i]['name']; 
					var myDiv = $('table').find('td:first').find('div:first');
					myDiv.clone().attr('id' , "window"+(i+1)).insertAfter(myDiv);
				
				}
				$('#window0').remove(); // to remove the reference element of cloning	
				for(i =0 ; i < noOfRows  ; i=i+1) {
					var name = rows[i]['name']; 
					jsPlumb.addEndpoint("window"+(i+1), { anchor:"RightMiddle",uuid: "ctf_field:"+name }, exampleEndpoint3);
					$("#window"+(i+1)).find('li').text(name); // the data denoting track info from server				// better take the data itself can act as uuid for our ease , so its easy to connect .Just take the data that comes for col1, let it be data1, and see the corresponding data , let it be data2 . and now jsPlumb.connect({uuids:["window1", "flow3"]})  .. similarly jsPlumb.connect({uuids:[data1, data2]}) does the magic   ....
				}
				
				
			});
			
			///////Getting Flow Fields..For initial display before forming conections , this is just a demo , the actual values comes from soap request to ctf//////////////////////////////////////////////////////
			$.getJSON('http://localhost:8123/getFlowFields', function(data) {
				var rows = data.fields;
				var noOfRows = rows.length;
				for (var i = noOfRows-1; i >= 0; i--) {
					var name = rows[i]['name'];
					var myDiv = $('table').find('td:first').next().find('div:first');
					myDiv.clone().attr('id' , 'flow'+(i+1)).insertAfter(myDiv);
				}
				$('#flow0').remove();     // to remove the reference element of cloning
				for(i =0 ; i < noOfRows  ; i=i+1) {
					var name = rows[i]['name'];
					jsPlumb.addEndpoint('flow'+ (i+1), { anchor:"LeftMiddle",uuid:"flow_field:"+name }, exampleEndpoint4);
					$('#flow'+(i+1)).find('li').text(name) // the data denoting flow info from server
				}
				
			});


			//////////Get connections on loading////////////////////////////////////////
			$.getJSON('http://localhost:8123/getConnections', {'page': 'page1'}, function(data) {
				var rows = data.connections;
				var noOfRows = rows.length;
				
				console.log("Response: " + rows);
				for( var i = 0; i < noOfRows; i++) {
					jsPlumb.connect({
								'uuids': ['ctf_field:'+rows[i].ctf_field, 
									  'flow_field:'+rows[i].flow_field]
							});
				}

			});
			


			//Setting async back to true....
			$.ajaxSetup( { "async": true } );
*/
////////////////////////////////////////////////give a try	/////////////////////////////////		
			

	var hpooGetters = {
		
		

		init: function() {
			this.getTrackerFields();
			this.regEventSaveButton();
		},


		getTrackerFields: function() {
			/////////////Getting Tracker Fields..For initial display before forming conections , this is just a demo , the actual values comes from soap request to ctf//////////////////////////////////////////////////////
			$.getJSON('http://localhost:8123/getTrackerFields', function(data) {
				var rows = data.fields;
				var noOfRows = rows.length;
				for (var i = noOfRows-1; i >= 0; i--) {
					var name = rows[i]['name']; 
					var myDiv = $('table').find('td:first').find('div:first');
					myDiv.clone().attr('id' , "window"+(i+1)).insertAfter(myDiv);
				
				}
				$('#window0').remove(); // to remove the reference element of cloning	
				for(i =0 ; i < noOfRows  ; i=i+1) {
					var name = rows[i]['name']; 
					jsPlumb.addEndpoint("window"+(i+1), { anchor:"RightMiddle",uuid: "ctf_field:"+name }, exampleEndpoint3);
					$("#window"+(i+1)).find('li').text(name); // the data denoting track info from server				// better take the data itself can act as uuid for our ease , so its easy to connect .Just take the data that comes for col1, let it be data1, and see the corresponding data , let it be data2 . and now jsPlumb.connect({uuids:["window1", "flow3"]})  .. similarly jsPlumb.connect({uuids:[data1, data2]}) does the magic   ....
				}


				//Call getFlowFields next..
				hpooGetters.getFlowFields();
			});

		},


		

		getFlowFields: function() {
			///////Getting Flow Fields..For initial display before forming conections , this is just a demo , the actual values comes from soap request to ctf//////////////////////////////////////////////////////
			$.getJSON('http://localhost:8123/getFlowFields', function(data) {
				var rows = data.fields;
				var noOfRows = rows.length;
				for (var i = noOfRows-1; i >= 0; i--) {
					var name = rows[i]['name'];
					var myDiv = $('table').find('td:first').next().find('div:first');
					myDiv.clone().attr('id' , 'flow'+(i+1)).insertAfter(myDiv);
				}
				$('#flow0').remove();     // to remove the reference element of cloning
				for(i =0 ; i < noOfRows  ; i=i+1) {
					var name = rows[i]['name'];
					jsPlumb.addEndpoint('flow'+ (i+1), { anchor:"LeftMiddle",uuid:"flow_field:"+name }, exampleEndpoint4);
					$('#flow'+(i+1)).find('li').text(name) // the data denoting flow info from server
				}

				//Call getConnections next..
				hpooGetters.getConnections();
		
			 });
		},


		

		getConnections: function() {			
			//Getting connections and connecting them using connect.
			//This must happen only after getTrackerFields and getFlowFields have been executed.

			$.getJSON('http://localhost:8123/getConnections', {'page': 'page1'}, function(data) {
				var rows = data.connections;
				var noOfRows = rows.length;
				
				console.log("Response: " + rows);
				for( var i = 0; i < noOfRows; i++) {
					jsPlumb.connect({
							'uuids': ['ctf_field:'+rows[i].ctf_field, 
								  'flow_field:'+rows[i].flow_field]
						       });
				}
			});
		},




		regEventSaveButton: function() {
			//////////Adding Click Event listener to saveButton//////////////////////////
			$('#saveButton').click(function(){
				//Now I'm going to use `connections` variable that's 
				//exposed in draggableConnectorsDemo.js
				var reqData = { 'page': 'page1', 'connections': [] };
				for (var i = 0; i < connections.length; i++) {
					var sourceField = $("#"+connections[i].sourceId+" > li").text();
					var targetField = $("#"+connections[i].targetId+" > li").text();
					reqData['connections'].push({'ctf_field': sourceField, 'flow_field': targetField});
                                }
				$.ajax({
					url: "http://localhost:8123/setConnections",
					type: "POST",
					data: {'reqdata': JSON.stringify(reqData)}
				}).done(function() { 
					alert('Saved your settings!');
				});
			});
			//done... :)
		}


	};//End of hpooGetters	



	//////////////////////////Initialize//////////////////////////////////////
	hpooGetters.init();

	
});
