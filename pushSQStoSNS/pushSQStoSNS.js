console.log("Loading function");
var AWS = require("aws-sdk");

exports.handler = function(event, context) {
    var messageText = "Unable to extract message body"+JSON.stringify(event);
    var alarm = "Unable to extract alarm ARN";
    if(event["Records"]){
        messageText = String(event.Records[0].body);
        alarm = String(messageText.match(/AlarmArn.+?,/g)).replace(/\\/g, '');
        
    } else {
        alarm = event.AlarmArn;
    }
    console.log(alarm)
    var sns = new AWS.SNS();
    var params = {
        Message: alarm, 
        TopicArn: process.env.TOPIC_ARN
    };
    sns.publish(params, context.done);
};
