function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}

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
	          img.setAttribute('crossOrigin', 'anonymous');
	          if(window.innerWidth <= 512){
	          	var imgwidth = window.innerWidth;
	          } else{
	          	var imgwidth = 512;
	          }
	          var cw = imgwidth, ch = imgwidth, cx = 0, cy = 0, degree = 0;
	          var c=document.getElementById("myCanvas");
			  var ctx=c.getContext("2d");
			  var imageObj1 = new Image();
			  var imageObj2 = new Image();
			  imageObj2.setAttribute('crossOrigin', 'anonymous');
			  imageObj1.src = e.target.result;
			  imageObj2.src = "img/fists.png";
		 	  imageObj1.onload = function() {
				   EXIF.getData(imageObj1, function() {
			            console.log('Exif=', EXIF.getTag(this, "Orientation"));
			            switch(parseInt(EXIF.getTag(this, "Orientation"))) {
			                case 2:
			                    break;
			                case 3:
			                    cx = imgwidth * (-1);
          						cy = imgwidth * (-1);
          						imageObj2.src = "img/fists180.png";
								degree = 180;
          						break;
			                case 4:
			                    cx = imgwidth * (-1);
          						cy = imgwidth * (-1);
          						imageObj2.src = "img/fists180.png";
								degree = 180;
          						break;
			                case 5:
			                    cw = imgwidth;
          						ch = imgwidth;
          						cx = imgwidth * (-1);
          						imageObj2.src = "img/fists270.png";
          						degree = 270;
          						break;
			                case 6:
          						cw = imgwidth;
          						ch = imgwidth;
          						cy = imgwidth * (-1);
          						imageObj2.src = "img/fists90.png";
								degree = 90;
          						break;
			                case 7:
			                    cw = imgwidth;
          						ch = imgwidth;
          						cy = imgwidth * (-1);
          						imageObj2.src = "img/fists90.png";
								degree = 90;
          						break;
			                case 8:
			                    cw = imgwidth;
          						ch = imgwidth;
          						cx = imgwidth * (-1);
          						imageObj2.src = "img/fists270.png";
          						degree = 180;
          						break;
			            }
			            console.log('cx=', cx);
			            console.log('cy=', cy);
			            console.log('cw=', cw);
			            console.log('ch=', ch);
			            console.log('imageObj1.width=', imageObj1.width);
			            console.log('imageObj1.height=', imageObj1.height);
			            console.log('degree=', degree);
			            console.log('imageObj2.src=', imageObj2.src);
			       });
				   c.setAttribute('width', cw);
			       c.setAttribute('height', ch);
			       ctx.rotate(degree*Math.PI/180);

			       if(imageObj1.width >= imageObj1.height){
			       	 ctx.drawImage(imageObj1, cx, cy, cw * (imageObj1.width/imageObj1.height), ch);
			       }else{
			       	 ctx.drawImage(imageObj1, cx, cy, cw, ch * (imageObj1.height/imageObj1.width));
			       }

				   imageObj2.onload = function() {
				      ctx.drawImage(imageObj2, cx, cy, cw, ch);
				      $(".description").append("<div class=\"text-center\">"+
							"<a id=\"download\" hidden>Download as image</a>"+
							"<script type=\"text/javascript\">"+
								"document.getElementById('download').addEventListener('click', function() {"+
						    	"downloadCanvas(this, 'myCanvas', 'fists.png');"+
								"}, false);"+
							"</script>"+
						"</div>");
				      document.getElementById("buttons").innerHTML = "<a id='download' hidden>Download as image</a>";
				   }

				};
	        };
	      })(f);
	      reader.readAsDataURL(f);
	    }
	  }