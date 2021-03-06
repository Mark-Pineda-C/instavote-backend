'use-strict'

var validator = require('validator');
var Process = require('../models/Process');

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
var controller = {
    test: (req,res) => {
        return res.status(200).send({
            status: 'success',
            message: 'testeo de api'
        });
    },
    createProcess: (req,res) => {
        var params = req.body;

        var process = new Process();
        process.ProcessName = params.ProcessName
        process.InstituteName = params.InstituteName
        process.ProcessBanner = params.ProcessBanner
        process.ProcessDateStart = params.ProcessDateStart
        process.ProcessDateEnd = params.ProcessDateEnd
        process.Positions = params.Positions

        process.save((err,processStored) => {
            if(err || !processStored){
                console.log(err);
                return res.status(200).send({
                    status: 'error',
                    message: 'Error al momento de guardar'
                });
            }
            return res.status(200).send({
                status: 'success',
                processStored
            });
        })

    },
    getProcessInfo: (req,res) => {
        Process.find({}, (err, processList) => {
            if(err){
                console.log(err);
                return res.status(200).send({
                    status: 'error',
                    message: 'ocurrio un error',
                    err
                });
            }
            if(!processList){
                return res.status(200).send({
                    status: 'error',
                    message: 'No hay Procesos...'
                });
            }
            return res.status(200).send({
                status: 'success',
                message: processList
            });
        })
    },
    getProcessPositions: (req,res) => {
        var processId = req.params.id;
        Process.findById(processId, (err,process) => {
            if(err || !process){
                return res.status(200).send({
                    status: 'error',
                    message: 'El proceso no existe'
                })
            }
            return res.status(200).send({
                status: 'success',
                message: process.Positions,
                object: process
            })
        })
    }
};

module.exports = controller;