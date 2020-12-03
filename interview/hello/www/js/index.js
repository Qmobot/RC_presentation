/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    var socket = new Socket();   


    function speak(text) {
        TTS.speak({
            text: text,
            locale: 'ru-RU',
            rate: 1.3,
            voiceType: "Male"
        }, function () {
            console.log('Ready !');
        }, function (reason) {
            console.log(reason);
        });
    }

    speak(document.getElementById("robot").value);


    socket.open(
        "10.101.15.136",
        80,
        function() {
            alert("Подключен!");
        },
        function(errorMessage) {
            alert("Нет соединения!");
    });
    socket.onData = function(data) {
        console.log("Data from chip:");
        console.log(data);
    };
    socket.onClose = function(hasError) {
        alert("Отключился!");
    };
    socket.onError = function(errorMessage) {
        stop_all();
        alert("Ебать, ошибка, бля!");
    };

    function send(val)
    {
        var val2 = new Uint8Array(val.length);
        for (var i = 0; i < val.length; i++) {
            val2[i] = val.charCodeAt(i);
        }
        socket.write(val2);
        return false
    }

    function startDictation(){
        window.plugins.speechRecognition.startListening(function(result){
            document.getElementById('man').value = result[0];
            think();
            document.getElementById('face').src = "img/megasmile.gif"
        }, function(err){
            document.getElementById('robot').value = "Ничего не понял, повтори пожалуйста";
            document.getElementById('face').src = "img/work.gif"
        }, {
            language: "ru-RU",
            showPopup: false
        });
    }
    
    // Verify if recognition is available
    window.plugins.speechRecognition.isRecognitionAvailable(function(available){
        if(!available){
            alert("Sorry, not available");
        }
    
        // Check if has permission to use the microphone
        window.plugins.speechRecognition.hasPermission(function (isGranted){
            if(isGranted){
                // startDictation();
            }else{
                // Request the permission
                window.plugins.speechRecognition.requestPermission(function (){
                    // Request accepted, start recognition
                    // startDictation();
                }, function (err){
                    console.log(err);
                });
            }
        }, function(err){
            console.log(err);
        });
    }, function(err){
        console.log(err);
    });


    document.getElementById("face").addEventListener("click", function(){
        startDictation();
        document.getElementById('face').src = "img/udiv.gif"
    }, false);

    function think(){
        text = document.getElementById("man").value.toLowerCase()
        if(text.includes("кто ты", 0)){
            document.getElementById("robot").value = "Меня зовут Кьюмобот, и я самый мощный и интересный образовательный робот на свете.";
            document.getElementById('face').src = "img/megadovol.gif";
            speak(document.getElementById("robot").value);
        }
        if(text.includes("создатель", 0)){
            document.getElementById("robot").value = "Меня создали компания Кьюмобот, разве не очевидно?";
            document.getElementById('face').src = "img/megadovol.gif";
            speak(document.getElementById("robot").value);
        }
        if(text.includes("умеешь", 0)){
            document.getElementById("robot").value = "У меня неограниченнный потенциал, и я могу стать роботом пожарным, роботом охранником, роботом почтальоном и многими другими.";
            document.getElementById('face').src = "img/dovol.gif";
            speak(document.getElementById("robot").value);
        }
        if(text.includes("танц", 0)){
            document.getElementById("robot").value = "Ну, ты сам попросил!";
            document.getElementById('face').src = "img/work.gif";
            speak(document.getElementById("robot").value);
            send("3");
        }
        if(text.includes("вперед", 0)){
            document.getElementById("robot").value = "Проеду немного!";
            document.getElementById('face').src = "img/work.gif";
            speak(document.getElementById("robot").value);
            send("1");
        }
        if(text.includes("назад", 0)){
            document.getElementById("robot").value = "Я не сдаю назад!";
            document.getElementById('face').src = "img/work.gif";
            speak(document.getElementById("robot").value);
            send("6");
        }
        if(text.includes("стой", 0)){
            document.getElementById("robot").value = "Уф, устал уже";
            document.getElementById('face').src = "img/work.gif";
            speak(document.getElementById("robot").value);
            send("0");
        }
    };

    document.getElementById("0").addEventListener("click", function(){
        send("0");
    }, false);
    document.getElementById("1").addEventListener("click", function(){
        send("1");
    }, false);
    document.getElementById("2").addEventListener("click", function(){
        send("2");
    }, false);
    document.getElementById("3").addEventListener("click", function(){
        send("3");
    }, false);
    document.getElementById("4").addEventListener("click", function(){
        send("5");
    }, false);
    document.getElementById("5").addEventListener("click", function(){
        send("4");
    }, false);
    document.getElementById("6").addEventListener("click", function(){
        send("6");
    }, false);

    document.getElementById("robot").addEventListener("change", function(){
        speak(document.getElementById("robot").value);
    }, false);

}
            

