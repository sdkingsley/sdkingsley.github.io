function handleFileSelect(evt) {
	    var files = evt.target.files; // FileList object

	    // Loop through the FileList and render image files as thumbnails.
	    for (var i = 0, f; f = files[i]; i++) {

	      // Only process image files.
	      if (!f.type.match('image.*')) {
	        continue;
	      }

	      var reader = new FileReader();

	    //TODO: have it save photo
	    reader.onload = (function(theFile) {
	        return function(e) {
	          var span = document.createElement('span');
	          var img = new Image();
	          var cw = window.innerWidth, ch = window.innerWidth, cx = 0, cy = 0, degree = 0;
			  img.setAttribute('crossOrigin', 'anonymous');
	          var c=document.getElementById("myCanvas");
			  var ctx=c.getContext("2d");
			  var imageObj1 = new Image();
			  var imageObj2 = new Image();
			  imageObj1.src = e.target.result;
			  imageObj2.src = "img/fists.png";
		 	  imageObj1.onload = function() {
				   EXIF.getData(imageObj1, function() {
			            console.log('Exif=', EXIF.getTag(this, "Orientation"));
			            switch(parseInt(EXIF.getTag(this, "Orientation"))) {
			                case 2:
			                    break;
			                case 3:
			                    cx = window.innerWidth * (-1);
          						cy = window.innerWidth * (-1);
          						imageObj2.src = "img/fists180.png";
								degree = 180;
          						break;
			                case 4:
			                    cx = window.innerWidth * (-1);
          						cy = window.innerWidth * (-1);
          						imageObj2.src = "img/fists180.png";
								degree = 180;
          						break;
			                case 5:
			                    cw = window.innerWidth;
          						ch = window.innerWidth;
          						cx = window.innerWidth * (-1);
          						imageObj2.src = "img/fists270.png";
          						degree = 270;
          						break;
			                case 6:
          						cw = window.innerWidth;
          						ch = window.innerWidth;
          						cy = window.innerWidth * (-1);
          						imageObj2.src = "img/fists90.png";
								degree = 90;
          						break;
			                case 7:
			                    cw = window.innerWidth;
          						ch = window.innerWidth;
          						cy = window.innerWidth * (-1);
          						imageObj2.src = "img/fists90.png";
								degree = 90;
          						break;
			                case 8:
			                    cw = window.innerWidth;
          						ch = window.innerWidth;
          						cx = window.innerWidth * (-1);
          						imageObj2.src = "img/fists270.png";
          						degree = 180;
          						break;
			            }
			            console.log('cx=', cx);
			            console.log('cy=', cy);
			            console.log('cw=', cw);
			            console.log('ch=', ch);
			            console.log('degree=', degree);
			            console.log('imageObj2.src=', imageObj2.src);
			       });
				   c.setAttribute('width', cw);
			       c.setAttribute('height', ch);
			       ctx.rotate(degree*Math.PI/180);
				   ctx.drawImage(imageObj1, cx, cy, cw * (imageObj1.width/imageObj1.height), ch);
				   imageObj2.onload = function() {
				      ctx.drawImage(imageObj2, cx, cy, cw, ch);
  					  // ctx.canvas.width  = window.innerWidth;
  					  // ctx.canvas.height = window.innerHeight;
				      img = c.toDataURL("img/merged.png");
				      $('#myCanvas').append('<img src="' + img + '" style="width:100%; height: 100%;"/>');
				   }
				};
	        };
	      })(f);
	      reader.readAsDataURL(f);
	    }
	  }