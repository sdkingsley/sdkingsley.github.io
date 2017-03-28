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
		 	  imageObj1.onload = function() {
				   EXIF.getData(imageObj1, function() {
			            console.log('Exif=', EXIF.getTag(this, "Orientation"));
			            switch(parseInt(EXIF.getTag(this, "Orientation"))) {
			                case 2:
			                    break;
			                case 3:
			                    cx = imageObj1.width * (-1);
          						cy = imageObj1.height * (-1);
								ctx.rotate(180 * Math.PI / 180);
          						break;
			                case 4:
			                    cx = imageObj1.width * (-1);
          						cy = imageObj1.height * (-1);
								ctx.rotate(180 * Math.PI / 180);
          						break;
			                case 5:
			                    cw = imageObj1.height;
          						ch = imageObj1.width;
          						cx = imageObj1.width * (-1);
          						ctx.rotate(270 * Math.PI / 180);
          						break;
			                case 6:
			             //        cw = imageObj1.height;
          						// ch = imageObj1.width;
          						// cy = imageObj1.height * (-1);
          						cw = 512;
          						ch = 512;
          						cy = 512 * (-1);
								// ctx.rotate(90 * Math.PI / 180);
								degree = 90;
          						break;
			                case 7:
			                    cw = imageObj1.height;
          						ch = imageObj1.width;
          						cy = imageObj1.height * (-1);
								ctx.rotate(90 * Math.PI / 180);
          						break;
			                case 8:
			                    cw = imageObj1.height;
          						ch = imageObj1.width;
          						cx = imageObj1.width * (-1);
          						ctx.rotate(270 * Math.PI / 180);
          						break;
			            }
			       });
				   c.setAttribute('width', cw);
			       c.setAttribute('height', ch);
			       ctx.rotate(degree*Math.PI/180);
				   // ctx.drawImage(imageObj1, cx, cy, 512, 512 * imageObj1.height / imageObj1.width);
				   ctx.drawImage(imageObj1, cx, cy);
				   imageObj2.src = "img/LittleOrangeHands.png";
				   imageObj2.onload = function() {
				      // ctx.drawImage(imageObj2, 0, 0, 512, 512 * imageObj1.height / imageObj1.width);
				      ctx.drawImage(imageObj2, cx, cy);
				      img = c.toDataURL("img/merged.png");
				      // document.getElementById("myCanvas").innerHTML='<img src="' + img + '" width=512'+'/>';
				      // document.write('<img src="' + img + '" width='+$(window).width()+'/>');
				      $('#myCanvas').append('<img src="' + img + '" width='+$(window).width()+'/>');
				   }
				};
	        };
	      })(f);
	      reader.readAsDataURL(f);
	    }
	  }