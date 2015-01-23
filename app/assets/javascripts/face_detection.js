$(function () {
  "use strict";
  $('.detect').click(function (e) {
    e.preventDefault();
    // when there is an error, it calls your error function, then complete <- jank!!!
    // when there is no error function, it just calls complete but faces is false <- jank!!!

    $(".picture").faceDetection({
      grayscale: true,
      error : function (code, error) {
        console.log(arguments);
      },
      complete: function (faces) {
        if(faces){
          console.log(arguments);
          // change to the plugin would be to not call this callback on error
          for (var i = 0; i < faces.length; i++) {
            var xCords          = faces[i].x,
            yCords          = faces[i].y,
            faceWidth       = faces[i].width,
            faceHeight      = faces[i].height,
            scaledXCords    = xCords - (.75 * faceWidth),
            scaledYCords    = yCords - (.75 * faceHeight),
            scaledWidth     = (2.5 * faceWidth),
            scaledHeight    = (2.5 * faceHeight),
            img             = this.get(0);

            // draw cropped headshots
            var canvas = $("<canvas>", {'class':'sub-picture'}).attr({'width':scaledWidth,'height':scaledHeight}).get(0);
            var context = canvas.getContext('2d');
            context.drawImage(img, scaledXCords, scaledYCords, scaledWidth, scaledHeight, 0, 0, scaledWidth, scaledHeight);
            $(img.parentNode).append(canvas);
            var checkbox = $("<input type='checkbox'>")
            $(img.parentNode).append(checkbox)

            // scale cropped images to fit canvas css
            $('canvas').on('load',function(){
              var css;
              var ratio=$(this).width() / $(this).height();
              var pratio=$('.sub-picture').parent().width() / $('.sub-picture').parent().height();
              if (ratio<pratio) css={width:'auto', height:'100%'};
              else css={width:'100%', height:'100%'};
              $(this).css(css);
            });

            // draw box around found faces
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
        }
      }
    });
  });
});
