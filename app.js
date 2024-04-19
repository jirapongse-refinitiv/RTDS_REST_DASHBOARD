'use strict'

/**
 * Module dependencies.
 */
const http = require('http');
var express = require('express');
var logger = require('morgan');
var path = require('path');
var app = express();

var port = 9999;
var rest_url = "http://127.0.0.1:9998";

// log requests
app.use(logger('dev'));

// express on its own has no notion
// of a "file". The express.static()
// middleware checks for a file matching
// the `req.path` within the directory
// that you pass it. In this case "GET /js/app.js"
// will look for "./public/js/app.js".

app.use(express.static(path.join(__dirname, 'public')));

// if you wanted to "prefix" you may use
// the mounting feature of Connect, for example
// "GET /static/js/app.js" instead of "GET /js/app.js".
// The mount-path "/static" is simply removed before
// passing control to the express.static() middleware,
// thus it serves the file correctly by ignoring "/static"
app.use('/static', express.static(path.join(__dirname, 'public')));

// if for some reason you want to serve files from
// several directories, you can use express.static()
// multiple times! Here we're passing "./public/css",
// this will allow "GET /style.css" instead of "GET /css/style.css":
app.use(express.static(path.join(__dirname, 'public', 'css')));



app.get('/api/sharedmem/service/state',(req, res)=>{

    var instance = req.query.instance;
    console.log(req.url);
    const data = fetch(rest_url+'/sharedmem/print/services')
        .then(response => response.json())
        .then(data => {    
            var serviceObj={}
            data.forEach((service)=>{
                console.log(service);
                if(service.Instance == instance){
                    serviceObj.instance = service.Instance;
                    serviceObj.state = service.State;
                    return;                    
                }
            });
           
            console.log(serviceObj);
            res.send(serviceObj);
    })

});

app.get('/api/sharedmem/mount/datastream',(req,response)=>{
    console.log(req.url);

    var serviceurl = rest_url+"/sharedmem/classes/ConsumerDataStream/instances/"+req.query.instance;

    const data = fetch(serviceurl)
        .then(response =>{
            console.log(response);
            if(response.status == 200){
                return response.json();
            }else{
                return undefined;
            }

        })
        .then(data => {
            var mountDataStreamInfo = {};
            if(data){
                data.Variables.forEach((attrib)=>{
                    switch(attrib.Name){
                        case "opens":
                            mountDataStreamInfo.opens = attrib.Value;
                            break;
                        case "normalOpens":
                            mountDataStreamInfo.normalOpens = attrib.Value;
                            break;
                        case "snapshotOpens":
                            mountDataStreamInfo.snapshotOpens = attrib.Value;
                            break;
                        case "recoverableOpens":
                            mountDataStreamInfo.recoverableOpens = attrib.Value;
                            break;
                        case "nonRecoverableOpens":
                            mountDataStreamInfo.nonRecoverableOpens = attrib.Value;
                            break;
                        case "viewRequests":
                            mountDataStreamInfo.viewRequests = attrib.Value;
                            break;
                        case "total":
                            mountDataStreamInfo.total = attrib.Value;
                            break;
                        case "active":
                            mountDataStreamInfo.active = attrib.Value;
                            break;
                        case "stale":
                            mountDataStreamInfo.stale = attrib.Value;
                            break;
                        case "pending":
                            mountDataStreamInfo.pending = attrib.Value;
                            break;
                        case "recoverableCloses":
                            mountDataStreamInfo.recoverableCloses = attrib.Value;
                            break;
                        case "nonRecoverableCloses":
                            mountDataStreamInfo.nonRecoverableCloses = attrib.Value;
                            break;
                        
                        
                    }

                });

            }
            console.log(mountDataStreamInfo);
            response.send(mountDataStreamInfo);

        });
});

app.get('/api/sharedmem/mount/ripcclient',(req, response)=>{
    
    console.log(req.url);

    var serviceurl = rest_url + "/sharedmem/classes/RIPCClient/instances/"+req.query.instance;

    const data = fetch(serviceurl)
        .then(response=>{
            console.log(response);
            if(response.status == 200){
                return response.json();
            }else{
                return undefined;
            }

        })
        .then(data=>{
            var ipcInfo = {};
            if(data){
                data.Variables.forEach((attribute)=>{
                    switch(attribute.Name){
                        case "connectTime":
                            ipcInfo.connectTime = attribute.Value;
                            break;
                        case "connectType":
                            ipcInfo.connectType = attribute.Value;
                            break;
                        case "maxFragmentSize":
                            ipcInfo.maxFragmentSize = attribute.Value;
                            break;
                        case "tcpSendBufSize":
                            ipcInfo.tcpSendBufSize = attribute.Value;
                            break;
                        case "tcpRecvBufSize":
                            ipcInfo.tcpRecvBufSize = attribute.Value;
                            break;
                        case "compressionType":
                            ipcInfo.compressionType = attribute.Value;
                            break;
                        case "guaranteedOutputBuffers":
                            ipcInfo.guaranteedOutputBuffers = attribute.Value;
                            break;
                        case "maxOutputBuffers":
                            ipcInfo.maxOutputBuffers = attribute.Value;
                            break;                       
                        case "pingsSent":
                            ipcInfo.pingsSent = attribute.Value;
                            break;
                        case "pingsReceived":
                            ipcInfo.pingsReceived = attribute.Value;
                            break;
                        case "currentBufferUsage":
                            ipcInfo.currentBufferUsage = attribute.Value;
                            break;
                        case "peakBufferUsage":
                            ipcInfo.peakBufferUsage = attribute.Value;
                            break;
                        case "packetsSent":
                            ipcInfo.packetsSent = attribute.Value;
                            break;
                        case "packetsReceived":
                            ipcInfo.packetsReceived = attribute.Value;
                            break;
                    }
                });
            }
            console.log(ipcInfo);
            response.send(ipcInfo);
        });
});

app.get('/api/sharedmem/mount/wsclient',(req, response)=>{
    
    console.log(req.url);

    var serviceurl = rest_url + "/sharedmem/classes/WSOCKClient/instances/"+req.query.instance;

    const data = fetch(serviceurl)
        .then(response=>{
            console.log(response);
            if(response.status == 200){
                return response.json();
            }else{
                return undefined;
            }

        })
        .then(data=>{
            var ipcInfo = {};
            if(data){
                data.Variables.forEach((attribute)=>{
                    switch(attribute.Name){
                        case "connectTime":
                            ipcInfo.connectTime = attribute.Value;
                            break;
                        case "connectType":
                            ipcInfo.connectType = attribute.Value;
                            break;
                        case "maxFragmentSize":
                            ipcInfo.maxFragmentSize = attribute.Value;
                            break;
                        case "tcpSendBufSize":
                            ipcInfo.tcpSendBufSize = attribute.Value;
                            break;
                        case "tcpRecvBufSize":
                            ipcInfo.tcpRecvBufSize = attribute.Value;
                            break;
                        case "compressionType":
                            ipcInfo.compressionType = attribute.Value;
                            break;
                        case "guaranteedOutputBuffers":
                            ipcInfo.guaranteedOutputBuffers = attribute.Value;
                            break;
                        case "maxOutputBuffers":
                            ipcInfo.maxOutputBuffers = attribute.Value;
                            break;                       
                        case "pingsSent":
                            ipcInfo.pingsSent = attribute.Value;
                            break;
                        case "pingsReceived":
                            ipcInfo.pingsReceived = attribute.Value;
                            break;
                        case "currentBufferUsage":
                            ipcInfo.currentBufferUsage = attribute.Value;
                            break;
                        case "peakBufferUsage":
                            ipcInfo.peakBufferUsage = attribute.Value;
                            break;
                        case "packetsSent":
                            ipcInfo.packetsSent = attribute.Value;
                            break;
                        case "packetsReceived":
                            ipcInfo.packetsReceived = attribute.Value;
                            break;
                    }
                });
            }
            console.log(ipcInfo);
            response.send(ipcInfo);
        });
});

app.get('/api/sharedmem/mount/sinkdist',(req,res)=>{
    var instance = req.query.instance;
    console.log(req.url);

    var serviceurl = rest_url + "/sharedmem/classes/Consumer.SinkDist/instances/"+req.query.instance;
    const data = fetch(serviceurl)
        .then(response=>{
            console.log(response);
            if(response.status == 200){
                return response.json();
            }else{
                return undefined;
            }
        })
        .then(data=>{
            var mountInfo = {};
            if(data){
                data.Children[0].Variables.forEach((attribute)=>{
                    switch(attribute.Name){
                        case "channel":
                            mountInfo.channel = attribute.Value;
                            break;
                        case "identifier":
                            mountInfo.identifier = attribute.Value;
                            break;
                        case "singleOpen":
                            mountInfo.singleOpen = attribute.Value;
                            break;
                        case "loginName":
                            mountInfo.loginName = attribute.Value;
                            break;
                        case "position":
                            mountInfo.position = attribute.Value;
                            break;
                        case "applicationKey":
                            mountInfo.applicationKey = attribute.Value;
                            break;
                        case "applicationName":
                            mountInfo.applicationName = attribute.Value;
                            break;
                        case "hostname":
                            mountInfo.hostname = attribute.Value;
                            break;
                        case "mountTime":
                            mountInfo.mountTime = attribute.Value;
                            break;
                        case "version":
                            mountInfo.version = attribute.Value;
                            break; 
                        case "protocol":
                            mountInfo.protocol = attribute.Value;
                            break;                       
                        
                    }
                });
            }
            console.log(mountInfo);
            res.send(mountInfo);
        });

    
});

app.get('/api/sharedmem/service/dynamic',(req, res)=>{
    console.log(req.url)
    var serviceurl = rest_url + "/sharedmem/classes/ConsumerService.SinkDist/instances/"+req.query.instance;
    const data = fetch(serviceurl)
        .then(response =>{
            console.log("service static response");
            console.log(response);
            console.log("service static response json");
            console.log(response.status);
            if(response.status != 204){
                return response.json();
            }
            else{   
                console.log("service static resposne Undefined");
                return undefined;
            }

        })
        .then(data=>{
            var serviceInfo = {};
            console.log(data);
            if(data){
                data.Variables.forEach((attrib)=>{
                    switch (attrib.Name) {                       
                        case "items":
                            serviceInfo.items = attrib.Value;                            
                            break;
                        case "active":
                            serviceInfo.active = attrib.Value;
                            break;
                        case "pending":
                            serviceInfo.pending = attrib.Value;
                            break;
                        case "stale":
                            serviceInfo.stale = attrib.Value;
                            break;                      
                    }
                });
            }
            console.log(serviceInfo);
            res.send(serviceInfo);
        });
});



app.get('/api/sharedmem/user/static',(req, res)=>{
    console.log(req.url);
    var serviceurl = rest_url+"/sharedmem/classes/GlobalUser/instances/"+req.query.instance;

    const data = fetch(serviceurl)
    .then(response =>{
        console.log("service static response");
        console.log(response);
        console.log("service static response json");
        console.log(response.status);
        if(response.status == 200){
            return response.json();
        }
        else{   
            console.log("service static resposne Undefined");
            return undefined;
        }

    })
    .then(data=>{
        var userInfo = {};
        console.log(data);
        if(data){
            data.Variables.forEach((attrib)=>{
                switch (attrib.Name) {
                    case "aggregateItemLimit":
                        userInfo.aggregateItemLimit = attrib.Value;
                        break;
                    case "itemLimitPerMount":
                        userInfo.itemLimitPerMount = attrib.Value;
                        break;
                    case "channels":
                        userInfo.channels = attrib.Value;                            
                        break;          
                    case "maxPriorityClass":
                        userInfo.maxPriorityClass = attrib.Value;
                        break;

                }
            });

            data.Children[0].Variables.forEach((attrib)=>{
                switch(attrib.Name){
                    case "opens":
                        userInfo.opens = attrib.Value;
                        break;
                    case "normalOpens":
                        userInfo.normalOpens = attrib.Value;
                        break;
                    case "snapshotOpens":
                        userInfo.snapshotOpens = attrib.Value;
                        break;
                    case "recoverableOpens":
                        userInfo.recoverableOpens = attrib.Value;
                        break;
                    case "nonRecoverableOpens":
                        userInfo.nonRecoverableOpens = attrib.Value;
                        break;
                    case "viewRequests":
                        userInfo.viewRequests = attrib.Value;
                        break;
                    case "total":
                        userInfo.total = attrib.Value;
                        break;
                    case "active":
                        userInfo.active = attrib.Value;
                        break;
                    case "stale":
                        userInfo.stale = attrib.Value;
                        break;
                    case "pending":
                        userInfo.pending = attrib.Value;
                        break;
                    case "recoverableCloses":
                        userInfo.recoverableCloses = attrib.Value;
                        break;
                    case "nonRecoverableCloses":
                        userInfo.nonRecoverableCloses = attrib.Value;
                        break;
                    
                    
                }
            });
        }
        console.log(userInfo);
        res.send(userInfo);

})
});

app.get('/api/sharedmem/service/static',(req, res)=>{
    var domainMap={
        1:"Login",
        4:"Source",
        5:"Dictionary",
        6:"Market Price",
        7:"Market By Order",
        8:"Market By Price",
        9:"Market Maker",
        10:"Symbol List",
        11:"Service Provider Status",
        12:"History",
        13:"Headline",
        14:"Story",
        15:"Replay Headline",
        16:"Replay Story",
        17:"Transaction",
        22:"Yield Curve",
        27:"Contribution",
        29:"Provider Admin",
        30:"Analytics",
        31:"Reference",
        33:"News Text Analytics",
        34:"Economic Indicator",
        35:"Poll",
        36:"Forecast",
        37:"Market By Time",
        127:"System"
        };
    console.log(req.url);
    var serviceurl = rest_url + "/sharedmem/classes/ConsumerService.SinkDist/instances/"+req.query.instance;
    const data = fetch(serviceurl)
        .then(response =>{
            console.log("service static response");
            console.log(response);
            console.log("service static response json");
            console.log(response.status);
            if(response.status != 204){
                return response.json();
            }
            else{   
                console.log("service static resposne Undefined");
                return undefined;
            }

        })
        .then(data=>{
            var serviceInfo = {};
            console.log(data);
            if(data){
                data.Variables.forEach((attrib)=>{
                    switch (attrib.Name) {
                        case "name":
                            serviceInfo.serviceName = attrib.Value;
                            break;
                        case "serviceID":
                            serviceInfo.serviceID = attrib.Value;
                            break;
                        case "items":
                            serviceInfo.items = attrib.Value;                            
                            break;
                        case "active":
                            serviceInfo.active = attrib.Value;
                            break;
                        case "pending":
                            serviceInfo.pending = attrib.Value;
                            break;
                        case "stale":
                            serviceInfo.stale = attrib.Value;
                            break;
                        case "QoS":
                            serviceInfo.qos = attrib.Value;
                            break;
                        case "Dictionaries":
                            serviceInfo.dictionaries = attrib.Value;
                            break;
                        case "Capabilities":
                            var domainList = attrib.Value.split(",")
                            serviceInfo.capabilities = [];
                            domainList.forEach((domain)=>{
                                if (domain in domainMap){
                                    serviceInfo.capabilities.push(domainMap[domain]);
                                }else{
                                    serviceInfo.capabilities.push(domain);
                                }

                            });                          
                            break;
                    }
                });
            }
            console.log(serviceInfo);
            res.send(serviceInfo);
        });
});


app.get('/api/sharedmem/print/mounts', (req, res) => {    
    console.log(req.url);
    const data = fetch(rest_url+'/sharedmem/print/mounts')
        .then(response => {
            
            console.log("mount response");
            console.log(response);
            console.log("mount json");
            console.log(response.status);
            if(response.status != 204){
                return response.json();
            }
            else{   
                console.log("Mount Undefined");
                return undefined;
            }
            })
        .then(data => {    
            var mountList=[]
            var mountObj={}
            console.log("Mount");
            console.log(data);
            if(data){
            data.forEach((mount)=>{
                console.log(mount);
                mountObj = {};
                console.log("Mount Instance: "+mount.Instance);
                mountObj.instance = mount.Instance;
                mountObj.mountName = mount.Instance.split(".").pop();
                console.log(mountObj.mountName);

                mount.Children[0].Variables.forEach((attrib)=>{
                    console.log(attrib);
                    if(attrib.Name == "name"){
                        mountObj.userName = attrib.Value;
                    }else if(attrib.Name == "position"){
                        mountObj.position = attrib.Value;
                    }else if(attrib.Name == "applicationKey"){
                        mountObj.applicationKey = attrib.Value;
                    }

                });

                mount.Children[1].Variables.forEach((attrib)=>{
                    console.log(attrib);
                    if(attrib.Name == "total"){
                        mountObj.itemCount = attrib.Value;
                    }

                });

                mountList.push(mountObj);
            } )             
            }
            console.log(mountList);
            res.send(mountList);
        });
});

app.get('/api/sharedmem/print/users', (req, res) => {    
    console.log(req.url);
    const data = fetch(rest_url+'/sharedmem/print/users')
        .then(response => response.json())
        .then(data => {    
            var userList=[]
            var userObj={}
            if(data){
            data.forEach((user)=>{
                console.log("user");
                console.log(user);
                userObj = {};
                console.log(user.Instance);
                userObj.instance = user.Instance;
                if(user.Class == "GlobalUser"){
                 
                    user.Variables.forEach(function(obj){
                        if(obj.Name == "name"){
                            userObj.name = obj.Value;
                        }
                        if(obj.Name=="channels"){
                            userObj.connections = obj.Value;
                        }
                    });

                    userList.push(userObj);
                }     
            })
        }
            console.log("userList");
            console.log(userList);
            res.send(userList);
        });
})

app.get('/api/sharedmem/print/services', (req, res) => {

    
    console.log(req.url);
    const data = fetch(rest_url+'/sharedmem/print/services')
        .then(response => response.json())
        .then(data => {    
            var serviceList=[]
            var serviceObj={}
            data.forEach((service)=>{
                console.log(service);
                serviceObj = {};
                console.log(service.Instance);
                serviceObj.instance = service.Instance;

                console.log(service.State);
                serviceObj.state = service.State;
                service.Variables.forEach(function(obj){
                    if(obj.Name == "name"){
                        serviceObj.name = obj.Value;
                    }
                });
                serviceList.push(serviceObj);
            });
           
            console.log(serviceList);
            res.send(serviceList);
    })

});

app.get('/api/sharedmem/print/process', (req, res) => {

    
    console.log(req.url);
    const data = fetch(rest_url + '/sharedmem/print/process')
        .then(response => response.json())
        .then(data => {    
            var responseData={
                "rtdsVersion":"",
                "serverTime":"",
                "systemRelease":""
            }     
            console.log(data[0].Variables)
            data[0].Variables.forEach(function(obj){
                console.log(obj.Name);
                if(obj.Name == "releaseVersion"){
                    responseData.rtdsVersion = obj.Value;
                }else if(obj.Name == "time"){
                    responseData.serverTime = obj.Value;
                }else if(obj.Name == "systemRelease"){
                    responseData.systemRelease = obj.Value;
                }
            });
            console.log(responseData);
            res.send(responseData);
    })

});

app.listen(port);
console.log('listening on port '+port);
console.log('try:');
console.log('  GET /hello.txt');
console.log('  GET /js/app.js');
console.log('  GET /css/style.css');