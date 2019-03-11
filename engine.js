window.onload = function() {
	if (!('webkitSpeechRecognition' in window)) {
		showError("Unsupported Browser. Please use the latest Google Chrome.");
	}

	// initialize speech recognition
	var finalTranscript = "";
	var recognition = new webkitSpeechRecognition();
	recognition.interimResults = true;

	recognition.onstart = function() {
		console.log("Speech Recognition is initializing.");
		$(".microphone").addClass("active");

		clearTranscript();
		finalTranscript = "";
	};

	recognition.onresult = function(event) {
		var interimTranscript = "";
		for (var i = event.resultIndex; i < event.results.length; ++i) {
			if (event.results[i].isFinal) {
				finalTranscript += event.results[i][0].transcript;
			} else {
				interimTranscript += event.results[i][0].transcript;
			}
		}

		showTranscript(interimTranscript, false);
		showTranscript(finalTranscript, true);
	};

	recognition.onerror = function(event) {
		console.error("Speech recognition error detected: " + event.error);
		console.error("Additional information: " + event.message);
	};

	recognition.onend = function() {
		console.log("Speech Recognition is ended.");
		$(".microphone").removeClass("active");

		var query = Parser.parse(finalTranscript);
		query.execute();
	};

	// trigger speech recognition
	$(".microphone").click(function() {
		recognition.start();
	});
}

function showError(msg) {
	console.error(msg);
	$(".error").text(msg);
	$(".error").removeClass("hidden");
	$(".microphone").addClass("hidden");
}

function showTranscript(transcript, isFinal) {
	if (isFinal) {
		$(".transcript .final").text(transcript);
	} else {
		$(".transcript .interim").text(transcript);
	}
}

function clearTranscript() {
	showTranscript("", false);
	showTranscript("", true);
}
