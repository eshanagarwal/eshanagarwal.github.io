function submit() {
	var file = document.getElementById('fileInput').files[0];
	console.log(file);
	
	var reader = new FileReader();
	reader.onloadend = processFile;
  	reader.readAsDataURL(file);
}

function processFile(event) {
  	var encodedFile = event.target.result;
	//console.log(encodedFile);
  	var type = "TEXT_DETECTION";
  	
    var json = '{' +
    ' "requests": [' +
    '	{ ' +
    '	  "image": {' +
    '	    "content":"' + encodedFile.replace("data:image/jpeg;base64,", "") + '"' +
    '	  },' +
    '	  "features": [' +
    '	      {' +
    '	      	"type": "' + type + '",' +
    '			"maxResults": 200' +
    '	      }' +
    '	  ]' +
    '	}' +
    ']' +
    '}';
    
	console.log(json);
	
	$.ajax({
    	type: 'POST',
	    url: "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCp-xd4ePvub-BSgUPImn2UZuLpoejpj2I",
    	dataType: 'json',
	    data: json,
	    //Include headers, otherwise you get an odd 400 error.
	    headers: {
	      "Content-Type": "application/json",
	    },
 
	    success: function(data, textStatus, jqXHR) {
	      //displayJSON(data);
	      console.log(data);
	    },
	    error: function(jqXHR, textStatus, errorThrown) {
	      console.log('ERRORS: ' + textStatus + ' ' + errorThrown);
	    }
	});
}

