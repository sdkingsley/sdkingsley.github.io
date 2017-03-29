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
	          // Render thumbnail.
	          var span = document.createElement('span');
	          var img = new Image();
	          var cw = img.width, ch = img.height, cx = 0, cy = 0, degree = 0;
			  img.setAttribute('crossOrigin', 'anonymous');
	          var c=document.getElementById("myCanvas");
	    //       c.setAttribute('width', 512);
			  // c.setAttribute('height', 512);
			  var ctx=c.getContext("2d");
			  var imageObj1 = new Image();
			  var imageObj2 = new Image();
			  imageObj1.src = e.target.result;
			  imageObj2.src = "img/LittleOrangeHands.png";
		 	  imageObj1.onload = function() {
				   EXIF.getData(imageObj1, function() {
			            console.log('Exif=', EXIF.getTag(this, "Orientation"));
			            switch(parseInt(EXIF.getTag(this, "Orientation"))) {
			                case 2:
			                    break;
			                case 3:
			                    cx = 512 * (-1);
          						cy = 512 * (-1);
          						imageObj2.src = "img/LittleOrangeHands180.png";
								ctx.rotate(180 * Math.PI / 180);
          						break;
			                case 4:
			                    cx = 512 * (-1);
          						cy = 512 * (-1);
          						imageObj2.src = "img/LittleOrangeHands180.png";
								ctx.rotate(180 * Math.PI / 180);
          						break;
			                case 5:
			                    cw = 512;
          						ch = 512;
          						cx = 512 * (-1);
          						imageObj2.src = "img/LittleOrangeHands270.png";
          						ctx.rotate(270 * Math.PI / 180);
          						break;
			                case 6:
			             //        cw = imageObj1.height;
          						// ch = imageObj1.width;
          						// cy = imageObj1.height * (-1);
          						cw = 512;
          						ch = 512;
          						cy = 512 * (-1);
          						imageObj2.src = "img/LittleOrangeHands90.png";
								// ctx.rotate(90 * Math.PI / 180);
								degree = 90;
          						break;
			                case 7:
			                    cw = 512;
          						ch = 512;
          						cy = 512 * (-1);
          						imageObj2.src = "img/LittleOrangeHands90.png";
								ctx.rotate(90 * Math.PI / 180);
          						break;
			                case 8:
			                    cw = 512;
          						ch = 512;
          						cx = 512 * (-1);
          						imageObj2.src = "img/LittleOrangeHands270.png";
          						ctx.rotate(270 * Math.PI / 180);
          						break;
			            }
			       });
				   c.setAttribute('width', cw);
			       c.setAttribute('height', ch);
			       ctx.rotate(degree*Math.PI/180);
				   ctx.drawImage(imageObj1, cx, cy, cw * (imageObj1.width/imageObj1.height), ch);
				   imageObj2.onload = function() {
				      ctx.drawImage(imageObj2, cx, cy);
				      img = c.toDataURL("img/merged.png");
				      $('#myCanvas').append('<img src="' + img + '" width='+$(window).width()+'/>');
				   }
				};
	        };
	      })(f);
	      reader.readAsDataURL(f);
	    }
	  }