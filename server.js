var mongojs = require('mongojs');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var db = mongojs('contactlist', ['contactlist']);

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.get('/contactlist', function (req, res) {
    console.log("i rcved a get req");

    db.contactlist.find(function (err, docs) {

        console.log(docs);
        res.json(docs)


    });
    /* person1 = {

        name: 'Tim',
        email: 'kkjsd@.com',
        number: '22222222'
    };
    person2 = {

        name: 'john',
        email: 'john@.com',
        number: '33333'
    };

    person3 = {

        name: 'jacky',
        email: 'jacky@.com',
        number: '33333'
    };
    var contactlist = [person1, person2, person3];
    res.json(contactlist);
*/

});
app.post('/contactlist', function (req, res) {
    console.log(req.body);
    db.contactlist.insert(req.body, function (err, doc) {
        res.json(doc);

    })

})
app.delete('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.contactlist.remove({
        _id: mongojs.ObjectId(id)
    }, function (err, doc) {
        res.json(doc);


    })


})
app.get('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.contactlist.findOne({
        _id: mongojs.ObjectId(id)
    }, function (err, doc) {
        res.json(doc);


    })


})

app.put('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.contactlist.findAndModify({
            query: {
                _id: mongojs.ObjectId(id)
            },
            update: {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    number: req.body.number
                }
            },

            new: true
        },
        function (err, doc) {

            res.json(doc);





        })
})




app.listen(3000);
console.log("server running on 3000");