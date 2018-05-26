/**
 * Responds to any HTTP request that can provide a "message" field in the body.
 *
 * @param {!Object} req Cloud Function request context.
 * @param {!Object} res Cloud Function response context.
 */
const PubSub = require('@google-cloud/pubsub');
const projectId = 'content-eng-qa';
const pubsubClient = new PubSub({
    projectId: projectId,
    keyFilename: 'keyfile.json'

});

exports.helloWorld = function(req, res)  {
    content=req.body;
    if(content){
        if(content.type){
            contentType=content.type;
            switch(contentType){
                case "clip":
                    console.log("Input entity is clip..!!");
                    publishMessage(content,"testtopicankush");
                    break;
                case "playlist":
                    console.log("Input entity is playlist..!!");
                    break;
            }
        }else{
            console.log("Invalid content")
        }
        console.log("Ankush!!")
        console.log(content);
    }

};


function publishMessage(messages,topicName){
    console.log("Publishing message to pubsub with message");
    console.log(messages);
    console.log("On topic : ");
    console.log(topicName);

    data=JSON.stringify(messages);
    const dataBuffer = Buffer.from(data);
    pubsubClient.topic(topicName).publisher().publish(dataBuffer).then(function(messageId){
        console.log("Published message successfully..with message Id : ${messageId}")
    }).catch(function(err){
        console.log("Error in publishing message",err);
    })
    console.log("Publish function finished ..!!")
}
