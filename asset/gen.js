window.onload = function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var fileInput = document.getElementById('fileInput');

    fileInput.addEventListener('change', function(event) {
        var file = event.target.files[0];
        var reader = new FileReader();

        reader.onload = function(readerEvent) {
            var img = new Image();
            img.onload = function() {
                var windowWidth = window.innerWidth;
                var windowHeight = window.innerHeight;
                var maxWidth = windowWidth - 40;
                var maxHeight = windowHeight - 100;

                var widthRatio = maxWidth / img.width;
                var heightRatio = maxHeight / img.height;
                var ratio = Math.min(widthRatio, heightRatio);

                canvas.width = img.width * ratio;
                canvas.height = img.height * ratio;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                //Change Monochrome 
                var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                var data = imageData.data;
                for (var i = 0; i < data.length; i += 4) {
                    var avg = (data[i] + data[i + 1] + data[i + 2]) / 3; 
                    data[i] = avg; //R
                    data[i + 1] = avg; //G
                    data[i + 2] = avg; //B
                    data[i] += Math.random() * 20 - 10;
                    data[i + 1] += Math.random() * 20 - 10;
                    data[i + 2] += Math.random() * 20 - 10;
                }
                ctx.putImageData(imageData, 0, 0);
            };
            img.src = readerEvent.target.result;
        };

        reader.readAsDataURL(file);
    });
    //auto resize
    window.addEventListener('resize', function() {
        var canvasContainer = document.querySelector('.container');
        var maxWidth = canvasContainer.offsetWidth - 40;
        var maxHeight = window.innerHeight - 100;
        var img = canvas.querySelector('img');
        if (img) {
            var widthRatio = maxWidth / img.width;
            var heightRatio = maxHeight / img.height;
            var ratio = Math.min(widthRatio, heightRatio);
            canvas.width = img.width * ratio;
            canvas.height = img.height * ratio;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
    });
};
