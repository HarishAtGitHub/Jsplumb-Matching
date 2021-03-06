;(function() {
	
	window.jsPlumbDemo = {
		init : function() {
		
			jsPlumb.importDefaults({
				DragOptions : { cursor: 'pointer', zIndex:2000 },
				PaintStyle : { strokeStyle:'#666' },
				EndpointStyle : { width:20, height:16, strokeStyle:'#666' },
				Endpoint : "Rectangle",
				Anchors : ["TopCenter", "TopCenter"]
			});						

			connections = [];
			
			var updateConnections = function(conn, remove) {
				console.log(conn);
                                //console.log(conn.targetId);
				if (!remove) {
                                        //console.log(connections.length);
                                        
                                        if ( connections.length == 0) { 
						
						connections.push(conn);
						//conn.targetId = "window4" ;
					        //connections.push(conn); 	
						//console.log(connections[0].sourceId);
					}	
                                        else {
					//outerloop : 
					var a = 0;
					for (var i = 0; i < connections.length; i++) {
						
				          if (connections[i].sourceId == conn.sourceId && connections[i].targetId == conn.targetId) {
                                                        console.log(connections[i].sourceId);
							console.log(conn.sourceId);
							console.log(connections[i].targetId);
							console.log(conn.targetId);
							//idx = i; break;
							//alert("Dont attempt duplicating connections");
							a = a + 1;
                                                        //break outerloop ;
							
					   }
						
                                        }
					if ( a == 0) { 
                                              connections.push(conn);  
				        }  
					else  {
						alert("Dont attempt duplicating connections");	
					}
                                        }
                                }
				else {
					var idx = -1;
					for (var i = 0; i < connections.length; i++) {
						if (connections[i] == conn) {
							idx = i; break;
						}
					}
					if (idx != -1) connections.splice(idx, 1);
				}
				if (connections.length > 0) {
					var s = "<span>current connections</span><br/><br/><table><tr><th>scope</th><th>source</th><th>target</th></tr>";
					for (var j = 0; j < connections.length; j++) {
						s = s + "<tr><td>" + connections[j].scope + "</td>" + "<td>" + connections[j].sourceId + "</td><td>" + connections[j].targetId + "</td></tr>";
                                                //console.log(connections[j].sourceId + "  and  " +connections[j].targetId );
					}
					jsPlumbDemo.showConnectionInfo(s);
                                        console.log("connections are");
                                        for ( var k = 0; k < connections.length; k++){
 					       //console.log(connections[k].sourceId + "  and  " +connections[k].targetId );
                                               //console.log(connections[k].scope);
                                               //console.log(connections[k]);
                                               
                                               var h1 = $("#"+ connections[k].sourceId).find('li').text();
                                               var h2 = $("#"+ connections[k].targetId).find('li').text();
					       
                                               console.log(h1 + "  fed to  " + h2);
                                        }
				} else 
					jsPlumbDemo.hideConnectionInfo();
			};				

			jsPlumb.bind("connection", function(info, originalEvent) {
                                //console.log(info.connection);
				updateConnections(info.connection);
			});
			jsPlumb.bind("connectionDetached", function(info, originalEvent) {
				updateConnections(info.connection, true);
			});
                        //jsPlumb.bind("click", function(conn, originalEvent) {
			//	if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
			//		jsPlumb.detach(conn); 
			//});

			var exampleDropOptions = {
				tolerance:'touch',
				hoverClass:'dropHover',
				activeClass:'dragActive'
			};

			/**
				first example endpoint.  it's a 25x21 rectangle (the size is provided in the 'style' arg to the Endpoint), and it's both a source
				and target.  the 'scope' of this Endpoint is 'exampleConnection', meaning any connection starting from this Endpoint is of type
				'exampleConnection' and can only be dropped on an Endpoint target that declares 'exampleEndpoint' as its drop scope, and also that
				only 'exampleConnection' types can be dropped here.

				the connection style for this endpoint is a Bezier curve (we didn't provide one, so we use the default), with a lineWidth of
				5 pixels, and a gradient.		

			*/
			var exampleColor = "#00f";
			var exampleEndpoint = {
				endpoint:"Rectangle",
				paintStyle:{ width:25, height:21, fillStyle:exampleColor },
				isSource:true,
				reattach:true,
				scope:"blue rectangle",
				connectorStyle : {
					gradient:{stops:[[0, exampleColor], [0.5, "#09098e"], [1, exampleColor]]},
					lineWidth:5,
					strokeStyle:exampleColor,
					dashstyle:"2 2"
				},
				isTarget:true,
				beforeDrop:function(params) { 
					return confirm("Connect " + params.sourceId + " to " + params.targetId + "?"); 
				},				
				dropOptions : exampleDropOptions
			};			

			/**
				the second example uses a Dot of radius 15 as the endpoint marker, is both a source and target, and has scope
				'exampleConnection2'.
			*/
			var color2 = "#316b31";
			var exampleEndpoint2 = {
				endpoint:["Dot", { radius:15 }],
				paintStyle:{ fillStyle:color2 },
				isSource:true,
				scope:"green dot",
				connectorStyle:{ strokeStyle:color2, lineWidth:8 },
				connector: ["Bezier", { curviness:63}],
				maxConnections:3,
				isTarget:true,
				dropOptions : exampleDropOptions
			};

			/**
			the third example uses a Dot of radius 17 as the endpoint marker, is both a source and target, and has scope
			'exampleConnection3'.  it uses a Straight connector, and the Anchor is created here (bottom left corner) and never
			overriden, so it appears in the same place on every element.

			this example also demonstrates the beforeDetach interceptor, which allows you to intercept 
			a connection detach and decide whether or not you wish to allow it to proceed.

			*/
			var example3Color = "#01A3C6";
			var exampleEndpoint3 = {
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
			//overlays = [ ["Diamond", { fillStyle:"#09098e", width:15, length:15 } ] ];
                        var example4Color = "red";
			var exampleEndpoint4 = {
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

			// setup some empty endpoints.  again note the use of the three-arg method to reuse all the parameters except the location
			// of the anchor (purely because we want to move the anchor around here; you could set it one time and forget about it though.)
			//var e1 = jsPlumb.addEndpoint('window1', { anchor:[0.5, 1, 0, 1] }, exampleEndpoint2);

			//
			// here's an example of how the SelectiveAnchor stuff added to 1.2.3 works with
			// drag and drop connectors.
			//
			var anchors = [[1, 0.2, 1, 0], [0.8, 1, 0, 1], [0, 0.8, -1, 0], [0.2, 0, 0, -1] ],
				maxConnectionsCallback = function(info) {
					alert("Cannot drop connection " + info.connection.id + " : maxConnections has been reached on Endpoint " + info.endpoint.id);
				};
			/*	
			var e1 = jsPlumb.addEndpoint("window1", { anchor:anchors }, exampleEndpoint);
			// you can bind for a maxConnections callback using a standard bind call, but you can also supply 'onMaxConnections' in an Endpoint definition - see exampleEndpoint3 above.
			e1.bind("maxConnections", maxConnectionsCallback);

			var e2 = jsPlumb.addEndpoint('window2', { anchor:[0.5, 1, 0, 1] }, exampleEndpoint);
			// again we bind manually. it's starting to get tedious.  but now that i've done one of the blue endpoints this way, i have to do them all...
			e2.bind("maxConnections", maxConnectionsCallback);
			jsPlumb.addEndpoint('window2', { anchor:"RightMiddle" }, exampleEndpoint2);

			var e3 = jsPlumb.addEndpoint("window3", { anchor:[0.25, 0, 0, -1] }, exampleEndpoint);
			e3.bind("maxConnections", maxConnectionsCallback);
			jsPlumb.addEndpoint("window3", { anchor:[0.75, 0, 0, -1] }, exampleEndpoint2);

			var e4 = jsPlumb.addEndpoint("window4", { anchor:[1, 0.5, 1, 0] }, exampleEndpoint);
			e4.bind("maxConnections", maxConnectionsCallback);			
			jsPlumb.addEndpoint("window4", { anchor:[0.25, 0, 0, -1] }, exampleEndpoint2);

			// three ways to do this - an id, a list of ids, or a selector (note the two different types of selectors shown here...anything that is valid jquery will work of course)
			//jsPlumb.draggable("window1");
			//jsPlumb.draggable(["window1", "window2"]);
			//jsPlumb.draggable($("#window1"));
*/
			var divsWithWindowClass = jsPlumb.CurrentLibrary.getSelector(".window");
			//jsPlumb.draggable(divsWithWindowClass);
                        
                        //e1.bind("maxConnections", maxConnectionsCallback);
                       
                        //e2.bind("maxConnections", maxConnectionsCallback);
                        
                        //e3.bind("maxConnections", maxConnectionsCallback);
			
			
                        
			jsPlumbDemo.attachBehaviour();	
		/*	jsPlumb.addEndpoint('window'+'1', { anchor:"RightMiddle" }, exampleEndpoint3);
			jsPlumb.addEndpoint('window2', { anchor:"RightMiddle" }, exampleEndpoint3);
			jsPlumb.addEndpoint('window3', { anchor:"RightMiddle" }, exampleEndpoint3);
			jsPlumb.addEndpoint('window4', { anchor:"RightMiddle" }, exampleEndpoint3);
 			jsPlumb.addEndpoint('window5', { anchor:"RightMiddle" }, exampleEndpoint3);
 			jsPlumb.addEndpoint('window6', { anchor:"RightMiddle" }, exampleEndpoint3);
 			jsPlumb.addEndpoint('window7', { anchor:"RightMiddle" }, exampleEndpoint3);
 			jsPlumb.addEndpoint('window8', { anchor:"RightMiddle" }, exampleEndpoint3);
			
			
			jsPlumb.addEndpoint('flow1', { anchor:"LeftMiddle" }, exampleEndpoint4);
			jsPlumb.addEndpoint('flow2', { anchor:"LeftMiddle" }, exampleEndpoint4);
			jsPlumb.addEndpoint('flow3', { anchor:"LeftMiddle" }, exampleEndpoint4);
			jsPlumb.addEndpoint('flow4', { anchor:"LeftMiddle" }, exampleEndpoint4);
			jsPlumb.addEndpoint('flow5', { anchor:"LeftMiddle" }, exampleEndpoint4);
			
	*/		



//var e5 = jsPlumb.addEndpoint('window6', { anchor:"LeftMiddle" }, exampleEndpoint4);
                        //e4.bind("maxConnections", maxConnectionsCallback);
			// add the third example using the '.window' class.				
			//jsPlumb.addEndpoint(divsWithWindowClass, exampleEndpoint3);

			// each library uses different syntax for event stuff, so it is handed off
			// to the draggableConnectorsDemo-<library>.js files.
					
			
                       

		
		}
	};
	
})();
