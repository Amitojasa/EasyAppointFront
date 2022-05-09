
var crypto = require('crypto');
const uuid = require('uuid');
const User = require("../models/user");
const request = require('request')
const fetch = require('fetch')
exports.getPaymentHashId = (req, res, next) => {
    var cryp = crypto.createHash('sha512');
    var txnid = Date.now();
    var { entryFee, productInfo } = req.body;
    var text = process.env.MERCHANT_KEY + '|' + txnid + '|' + entryFee + '|' + productInfo + '|' + req.profile.name
        + '|' + req.profile.email + '|||||' + process.env.UDF5 + '||||||' + process.env.MERCHANT_SALT;
    // console.log(text);
    cryp.update(text);
    var hash = cryp.digest('hex');
    req.paymentProfile = { hash, txnid }
    // console.log(text)
    // console.log(hash)
    next();
}

exports.processPayment = (req, res) => {
    var { entryFee, productInfo } = req.body;
    var hash = req.paymentProfile.hash
    var key = process.env.MERCHANT_KEY;
    var salt = process.env.MERCHANT_SALT;
    var txnid = req.paymentProfile.txnid;
    var amount = entryFee
    var productinfo = productInfo;
    var firstname = req.profile.name;
    var email = req.profile.email;
    var phone = req.profile.phone;
    var udf5 = process.env.UDF5;
    var furl = "/payment/fail";
    var surl = "/payment/success";


    const pay = {
        hash, key, txnid, amount, productinfo, firstname, email, phone, udf5, furl, surl
    }

    // const encodedParams = new URLSearchParams();
    // encodedParams.set('key', key);
    // // encodedParams.set('command','');
    // encodedParams.set('salt', salt);
    // encodedParams.set('txnid', txnid);
    // encodedParams.set('amount', amount);
    // encodedParams.set('productinfo', productinfo);
    // encodedParams.set('firstname', firstname);
    // encodedParams.set('email', email);
    // encodedParams.set('phone', phone);
    // encodedParams.set('udf5', udf5);
    // encodedParams.set('surl', surl);
    // encodedParams.set('furl', furl);

    // encodedParams.set('hash', hash);

    // var url = 'https://test.payu.in/_payment'
    // const options = {
    //     method: 'POST',
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     body: encodedParams
    // };
    // fetch(url, options)
    //     .then(res => res.text())
    //     .then(txt => console.log(txt))
    //     .catch(err => console.error('error:' + err));


    request.post({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: 'https://test.payu.in/_payment', //Testing url
        form: pay
    }, function (error, httpRes, body) {
        if (error)
            res.send(
                {
                    status: false,
                    message: error.toString()
                }
            );
        if (httpRes.statusCode === 200) {
            res.send(body);
        } else if (httpRes.statusCode >= 300 &&
            httpRes.statusCode <= 400) {
            res.redirect(httpRes.headers.location.toString());
        }
    })

    // return res;
    return res.json(pay);

}


