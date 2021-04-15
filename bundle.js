(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let preview = document.getElementById("preview");
let recording = document.getElementById("recording");
let startButton = document.getElementById("startButton");
let stopButton = document.getElementById("stopButton");
let downloadButton = document.getElementById("downloadButton");
let logElement = document.getElementById("log");

let recordingTimeMS = 5000;
//var ffmetadata = require('ffmetadata');

//sends message
function log(msg) {
  logElement.innerHTML += msg + "\n";
}


function wait(delayInMS) {
  return new Promise(resolve => setTimeout(resolve, delayInMS));
}

function startRecording(stream, lengthInMS) {
  let recorder = new MediaRecorder(stream);
  let data = [];

  recorder.ondataavailable = event => data.push(event.data);
  recorder.start();
  log(recorder.state + " for " + (lengthInMS/1000) + " seconds...");

  let stopped = new Promise((resolve, reject) => {
    recorder.onstop = resolve;
    recorder.onerror = event => reject(event.name);
  });

  let recorded = wait(lengthInMS).then(
    () => recorder.state == "recording" && recorder.stop()
  );

  return Promise.all([
    stopped,
    recorded
  ])
  .then(() => data);
}

function stop(stream) {
  stream.getTracks().forEach(track => track.stop());
}

startButton.addEventListener("click", function() {
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  }).then(stream => {
    preview.srcObject = stream;
    downloadButton.href = stream;
    preview.captureStream = preview.captureStream || preview.mozCaptureStream;
    return new Promise(resolve => preview.onplaying = resolve);
  }).then(() => startRecording(preview.captureStream(), recordingTimeMS))
  .then (recordedChunks => {
    let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
    recording.src = URL.createObjectURL(recordedBlob);
    downloadButton.href = recording.src;
    downloadButton.download = "/submits/RecordedVideo.webm";
    console.log(downloadButton);
    log("Successfully recorded " + recordedBlob.size + " bytes of " +
        recordedBlob.type + " media.");
  })
  .catch(log);
}, false);


stopButton.addEventListener("click", function() {
  stop(preview.srcObject);
}, false);





},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImxldCBwcmV2aWV3ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmV2aWV3XCIpO1xubGV0IHJlY29yZGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVjb3JkaW5nXCIpO1xubGV0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydEJ1dHRvblwiKTtcbmxldCBzdG9wQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdG9wQnV0dG9uXCIpO1xubGV0IGRvd25sb2FkQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb3dubG9hZEJ1dHRvblwiKTtcbmxldCBsb2dFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dcIik7XG5cbmxldCByZWNvcmRpbmdUaW1lTVMgPSA1MDAwO1xuLy92YXIgZmZtZXRhZGF0YSA9IHJlcXVpcmUoJ2ZmbWV0YWRhdGEnKTtcblxuLy9zZW5kcyBtZXNzYWdlXG5mdW5jdGlvbiBsb2cobXNnKSB7XG4gIGxvZ0VsZW1lbnQuaW5uZXJIVE1MICs9IG1zZyArIFwiXFxuXCI7XG59XG5cblxuZnVuY3Rpb24gd2FpdChkZWxheUluTVMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBkZWxheUluTVMpKTtcbn1cblxuZnVuY3Rpb24gc3RhcnRSZWNvcmRpbmcoc3RyZWFtLCBsZW5ndGhJbk1TKSB7XG4gIGxldCByZWNvcmRlciA9IG5ldyBNZWRpYVJlY29yZGVyKHN0cmVhbSk7XG4gIGxldCBkYXRhID0gW107XG5cbiAgcmVjb3JkZXIub25kYXRhYXZhaWxhYmxlID0gZXZlbnQgPT4gZGF0YS5wdXNoKGV2ZW50LmRhdGEpO1xuICByZWNvcmRlci5zdGFydCgpO1xuICBsb2cocmVjb3JkZXIuc3RhdGUgKyBcIiBmb3IgXCIgKyAobGVuZ3RoSW5NUy8xMDAwKSArIFwiIHNlY29uZHMuLi5cIik7XG5cbiAgbGV0IHN0b3BwZWQgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgcmVjb3JkZXIub25zdG9wID0gcmVzb2x2ZTtcbiAgICByZWNvcmRlci5vbmVycm9yID0gZXZlbnQgPT4gcmVqZWN0KGV2ZW50Lm5hbWUpO1xuICB9KTtcblxuICBsZXQgcmVjb3JkZWQgPSB3YWl0KGxlbmd0aEluTVMpLnRoZW4oXG4gICAgKCkgPT4gcmVjb3JkZXIuc3RhdGUgPT0gXCJyZWNvcmRpbmdcIiAmJiByZWNvcmRlci5zdG9wKClcbiAgKTtcblxuICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgIHN0b3BwZWQsXG4gICAgcmVjb3JkZWRcbiAgXSlcbiAgLnRoZW4oKCkgPT4gZGF0YSk7XG59XG5cbmZ1bmN0aW9uIHN0b3Aoc3RyZWFtKSB7XG4gIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKHRyYWNrID0+IHRyYWNrLnN0b3AoKSk7XG59XG5cbnN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoe1xuICAgIHZpZGVvOiB0cnVlLFxuICAgIGF1ZGlvOiB0cnVlXG4gIH0pLnRoZW4oc3RyZWFtID0+IHtcbiAgICBwcmV2aWV3LnNyY09iamVjdCA9IHN0cmVhbTtcbiAgICBkb3dubG9hZEJ1dHRvbi5ocmVmID0gc3RyZWFtO1xuICAgIHByZXZpZXcuY2FwdHVyZVN0cmVhbSA9IHByZXZpZXcuY2FwdHVyZVN0cmVhbSB8fCBwcmV2aWV3Lm1vekNhcHR1cmVTdHJlYW07XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gcHJldmlldy5vbnBsYXlpbmcgPSByZXNvbHZlKTtcbiAgfSkudGhlbigoKSA9PiBzdGFydFJlY29yZGluZyhwcmV2aWV3LmNhcHR1cmVTdHJlYW0oKSwgcmVjb3JkaW5nVGltZU1TKSlcbiAgLnRoZW4gKHJlY29yZGVkQ2h1bmtzID0+IHtcbiAgICBsZXQgcmVjb3JkZWRCbG9iID0gbmV3IEJsb2IocmVjb3JkZWRDaHVua3MsIHsgdHlwZTogXCJ2aWRlby93ZWJtXCIgfSk7XG4gICAgcmVjb3JkaW5nLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwocmVjb3JkZWRCbG9iKTtcbiAgICBkb3dubG9hZEJ1dHRvbi5ocmVmID0gcmVjb3JkaW5nLnNyYztcbiAgICBkb3dubG9hZEJ1dHRvbi5kb3dubG9hZCA9IFwiL3N1Ym1pdHMvUmVjb3JkZWRWaWRlby53ZWJtXCI7XG4gICAgY29uc29sZS5sb2coZG93bmxvYWRCdXR0b24pO1xuICAgIGxvZyhcIlN1Y2Nlc3NmdWxseSByZWNvcmRlZCBcIiArIHJlY29yZGVkQmxvYi5zaXplICsgXCIgYnl0ZXMgb2YgXCIgK1xuICAgICAgICByZWNvcmRlZEJsb2IudHlwZSArIFwiIG1lZGlhLlwiKTtcbiAgfSlcbiAgLmNhdGNoKGxvZyk7XG59LCBmYWxzZSk7XG5cblxuc3RvcEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gIHN0b3AocHJldmlldy5zcmNPYmplY3QpO1xufSwgZmFsc2UpO1xuXG5cblxuXG4iXX0=
