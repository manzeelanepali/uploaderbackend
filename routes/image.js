var express = require('express');
var Image = require('../model/image.model');
var ImageRouter = require('express').Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads/');
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype ==='image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }
    else {
        //rejects storing file
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        filesize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

ImageRouter.route("/uploadmulter")
    .post(upload.single('imageData'), (req, res, next) => {
        console.log(req.body);
        const newImage = new Image({
            imageName: req.body.imageName,
            imageData: req.file.path
        });

        newImage.save()
            .then((result) => {
                console.log(result);
                res.status(200).json({
                    success: true,
                    document: result
                });
            })
            .catch((err) => next(err));
    });



ImageRouter.route("/uploadbase")
    .post((req, res, next) => {
        const newImage = new Image({
            imageName: req.body.imageName,
            imageData: req.body.imageData
        });

        newImage.save()
            .then((result) => {
                res.status(200).json({
                    success: true,
                    document: result
                });
            })
            .catch((err) => next(err));
    });


ImageRouter.route("/uploadbase")
    .get((req, res) => {
        Image.find()
        .then(images => res.json(images))
        .catch(err => res.status(400).json('Error: ' + err));
    
    });

ImageRouter.route("/delete/:id")
    .delete((req, res) => {
        Image.findByIdAndDelete(req.params.id)
        .then(() => res.json('Image deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    

module.exports = ImageRouter;