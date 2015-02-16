$(function () {
  "use strict";
  clickdetect();
});


function clickdetect() {
  $('.detect').click(function (e) {
    e.preventDefault();
    $(".picture").faceDetection({
      grayscale: true,
      error : function (code, error) {
        console.log(arguments);
      },
      complete: function (faces) {
        if(faces){
          for (var i = 0; i < faces.length; i++) {
            var xCords      = faces[i].x,
            yCords          = faces[i].y,
            faceWidth       = faces[i].width,
            faceHeight      = faces[i].height,
            scaledXCords    = xCords - (.75 * faceWidth),
            scaledYCords    = yCords - (.75 * faceHeight),
            scaledWidth     = (2.5 * faceWidth),
            scaledHeight    = (2.5 * faceHeight),
            img             = this.get(0);

            // draw cropped headshots
            var canvas = $("<canvas>", {'class':'sub-picture', 'name':'test[' + i + '][selected]'}).attr({'width':scaledWidth,'height':scaledHeight}).get(0);
            var dataURL = canvas.toDataURL();
            var context = canvas.getContext('2d');
            context.drawImage(img, scaledXCords, scaledYCords, scaledWidth, scaledHeight, , 0, scaledWidth, scaledHeight);
            $(img.parentNode).append(canvas);
            var checkbox = $("<input type='checkbox' name='test[" + i + "][selected]' >")
            $(img.parentNode).append(checkbox)
            // scaleSubImage();
            saveSubImage(dataURL);
          }
        }
      }
    });
  });
}


// function scaleSubImage () {
//   $('canvas').on('load',function(){
//     var css;
//     var ratio=$(this).width() / $(this).height();
//     var pratio=$('.sub-picture').parent().width() / $('.sub-picture').parent().height();
//     if (ratio<pratio) css={width:'auto', height:'100%'};
//     else css={width:'100%', height:'100%'};
//     $(this).css(css);
//   });
// }

function saveSubImage (dataURL) {
  $('.save-subs').click(function(){
    // iterate over all canvases add each of their todataurls to a formdata object and post formdataobject
    // http://stackoverflow.com/questions/5392344/sending-multipart-formdata-with-jquery-ajax
    $.ajax({
      url: 'http://localhost:3000/images/' + 39 + '/subimages',
      type: 'POST',
      data: {subimage: dataURL}
      // request forgery from rails
    })
  });
}

function drawRectangle(face) {
  $("<div>", {
    class:'face',
    css: {
      position: "absolute",
      left:   xCords,
      top:    yCords,
      width:  faceWidth,
      height: faceHeight,
    }
  }).appendTo(img.parentNode);
}
