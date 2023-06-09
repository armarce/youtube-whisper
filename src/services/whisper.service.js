require('dotenv').config();
const path = require('path');
const fs = require('fs');
const { exec } = require('child-process-async');
const { formats, languages } = require('../config/config.json');

class whisperService{

    static execute = async (pathFile, task, req) => {

        try{

            const { model } = req.params;

            let { language, server_port } = req.query;

            language = language ? language.toLowerCase() : "";

            const data = {};

            formats.forEach(format => {

                data[format] = `${req.protocol}://${req.hostname}:${server_port ?? process.env.PORT}/${task}/${path.parse(pathFile).name}.${format}`
   
            });

            const firstFormatFile = path.join(path.parse(pathFile).dir, path.parse(pathFile).name+'.'+formats[0]);

            if(fs.existsSync(firstFormatFile)){

                return data;

            }

            if(language.length === 2 && languages.includes(language)){

                language = `--language ${language}`;

            }else if(language.length > 0){

                throw 'invalidLang';

            }
    
            const cmd = `whisper ${pathFile} --task ${task} --model ${model} --verbose False ${language} --output_dir ${path.parse(pathFile).dir}`;

            await exec(cmd);

            return data;

        }catch(error){

            throw error

        }

    }

}

module.exports = whisperService;