var Capture = {

  init: function () {
    var width = 320;    // We will scale the photo width to this
    var height = 0;     // This will be computed based on the input stream
    var streaming = false;

    // The various HTML elements we need to configure or control. These
    // will be set by the startup() function.

    var video = null;
    var canvas = null;
    var photo = null;
    var startbutton = null;

    function startup() {
      $(".webcam").show();
      video = document.getElementById('video');
      canvas = document.getElementById('canvas');
      photo = document.getElementById('photo');
      startbutton = document.getElementById('startbutton');

      navigator.getMedia = ( navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);

        navigator.getMedia(
          {
            video: true,
            audio: false
          },
          function(stream) {
            if (navigator.mozGetUserMedia) {
              video.mozSrcObject = stream;
            } else {
              var vendorURL = window.URL || window.webkitURL;
              video.src = vendorURL.createObjectURL(stream);
            }
            video.play();
          },
          function(err) {
            console.log("An error occured! " + err);
          }
        );

        clearphoto();

        video.addEventListener('canplay', function(ev){
          if (!streaming) {
            height = video.videoHeight / (video.videoWidth/width);

            // Firefox currently has a bug where the height can't be read from
            // the video, so we will make assumptions if this happens.

            if (isNaN(height)) {
              height = width / (4/3);
            }

            video.setAttribute('width', width);
            video.setAttribute('height', height);
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            streaming = true;
          }
        }, false);

        startbutton.addEventListener('click', function(ev){
          takepicture();
          ev.preventDefault();
        }, false);
      }

      // Fill the photo with an indication that none has been
      // captured.

      function clearphoto() {
        var context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
      }

      // Capture a photo by fetching the current contents of the video
      // and drawing it into a canvas, then converting that to a PNG
      // format data URL.

      function takepicture() {
        var context = canvas.getContext('2d');
        if (width && height) {
          canvas.width = width;
          canvas.height = height;
          context.drawImage(video, 0, 0, width, height);

          var data = canvas.toDataURL('image/png');
          photo.setAttribute('src', data);
        } else {
          clearphoto();
        }
      }


      $("#new_image").on('submit', function () {
        var url = canvas.toDataURL();

        // code pasted from the internets that converts data url to a format that servers understand as uploaded files
        var blobBin = atob(url.split(',')[1]);
        var array = [];
        for(var i = 0; i < blobBin.length; i++) {
          array.push(blobBin.charCodeAt(i));
        }
        var file = new Blob([new Uint8Array(array)], {type: 'image/png'});

        // here we are building params
        var formdata = new FormData();
        formdata.append("image[image]", file);
        formdata.append("image[description]", $("#image_description").val());

        // do the thing that rails normally does automatically for us
        // to protect from cross site forgery
        var token = $('meta[name="csrf-token"]').attr('content');

        // manually make the ajax request
        $.ajax({
          url: "/images",
          type: "POST",
          data: formdata,
          headers: {
            'X-CSRF-Token': token
          },
          processData: false,
          contentType: false,
        }).done(function(response){
          document.location = response.location;
        });
        return false;
      });

    startup();
  }

};
