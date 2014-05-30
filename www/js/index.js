
console.log("before");
document.addEventListener("deviceready", onDeviceReady, false);
console.log("after event");

function onDeviceReady() {
    console.log("onDeviceReady");
    navigator.splashscreen.hide();
    var app = new App();
    app.run();
}

function App() {
}

App.prototype = {
    resultsField: null,

    run: function() {
        console.log("run");
        var that = this,
            scanButton = document.getElementById("scanButton");

        that.resultsField = document.getElementById("result");

        scanButton.addEventListener("click",
            function() {
                that._scan.call(that);
            });
    },

    _scan: function() {
        console.log("scan");
        var that = this;
        if (window.navigator.simulator === true) {
            alert("Not Supported in Simulator.");
        }
        else {
            cordova.plugins.barcodeScanner.scan(
                function(result) {
                    if (!result.cancelled) {
                        that._addMessageToLog(result.format + " | " + result.text);
                    }
                },
                function(error) {
                    console.log("Scanning failed: " + error);
                });
        }
    },

    _addMessageToLog: function(message) {
        var that = this,
            currentMessage = that.resultsField.innerHTML;

        that.resultsField.innerHTML = currentMessage + message + '<br />';
    }
}