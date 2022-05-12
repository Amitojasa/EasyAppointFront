const jwt = require("jsonwebtoken");
const https = require('https');

const getAccessToken = ()=>{
    return jwt.sign( {'iss': process.env.ZOOM_API_KEY, 'exp': Date.now() + 120000}, process.env.ZOOM_API_SECRET );
}

exports.createMeeting = (data,success,fail) => {
    let accessToken = getAccessToken()
    if(! data.doctorEmail || ! data.patientEmail || !data.patientName || !data.doctorName || !data.bookingTime){
        fail({message: 'Some of the data are empty'})
        return
    }

    let meetingBody = {
            "agenda": `Appointment of Doctor ${data.doctorName} and ${data.patientName}`,
            "schedule_for": data.doctorEmail,
            "default_password": false,
            "password": false,
            "settings":{
                "authentication_exception":[{"email":data.patientEmail, "name": data.patientName}],
                "calendar_type": 2,
                "join_before_host": true,
                "meeting_invitees": [{"email":data.patientEmail}]
            },
            "start_time": data.bookingTime,
            "template_id": "Dv4YdINdTk+Z5RToadh5ug==",
            "timezone": "Asia/Kolkata",
            "topic": "Appointment with doctor"       
    }

    var options = {
        host: 'api.zoom.us',
        path: '/v2/users/me/meetings',
        method: 'POST',
        port:443,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
      };

    console.log("starting request")

    var req = https.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (data) {
          if(res.statusCode==201){
              success(JSON.parse(data))
          }
          else{
              fail({message:"Some error occured",debug:data})
          }
        });
      });
      
      req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
        fail({message: 'problem with request: ' + e.message})
      });

      req.write(JSON.stringify(meetingBody))

      req.end()
}

exports.deleteMeeting = () => {

}

