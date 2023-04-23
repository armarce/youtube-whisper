require('dotenv').config();
const path = require('path');
const fs = require('fs');
const { exec } = require('child-process-async');
const { formats } = require('../config/config.json');

class whisperService{

    static execute = async (pathFile, task, req) => {

        try{

            const { model } = req.params;

            const data = {};

            formats.forEach(format => {

                data[format] = `${req.protocol}://${req.hostname}:${process.env.PORT}/${task}/${path.parse(pathFile).name}.${format}`
   
            });

            const firstFormatFile = path.join(path.parse(pathFile).dir, path.parse(pathFile).name+'.'+formats[0]);

            if(fs.existsSync(firstFormatFile)){

                return data;

            }
    
            const cmd = `whisper ${pathFile} --task ${task} --model ${model} --verbose False --output_dir ${path.parse(pathFile).dir}`;

            //const cmd = `whisper ${pathFile} --task translate --model tiny --verbose False --output_dir ${pathTemp}`;

            await exec(cmd);

            return data;

        }catch{

            throw 'cantTranscriptVideo'

        }

    }

}

module.exports = whisperService;