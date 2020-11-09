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
    socket.open(
        "192.168.4.1",
        80,
        function() {
            alert("Подключен!");
        },
        function(errorMessage) {
            alert("Ошибка!");
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
        send("4");
    }, false);
    document.getElementById("5").addEventListener("click", function(){
        send("5");
    }, false);
    document.getElementById("6").addEventListener("click", function(){
        send("6");
    }, false);
}




