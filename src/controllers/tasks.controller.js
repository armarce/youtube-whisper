const path  = require('path');
const fs = require('fs');
const ytDlpService = require('../services/ytDlp.service.js');
const ytDlp = new ytDlpService();
const whisperService = require('../services/whisper.service.js');
const { tasks, models } = require('../config/config.json');

class tasksController{

    static execute = async(req, res, next) => {

        try{

            const { task, model, id } = req.params;

            if(!tasks.includes(task)){

                return next('invalidTask');

            }
            
            if(!models.includes(model)){

                return next('invalidModel');

            }

            const pathFile = path.join(__dirname, '..', '..', 'temp', task, `${model}_${id}.m4a`);

            if(!fs.existsSync(pathFile)){

                await ytDlp.download(id, pathFile);

            }
            
            const data = await whisperService.execute(pathFile, task, req);
            
            res.status(200).json({
                success: true,
                data: data 
            });

        }catch(error){
            
            return next(error);

        }

    }

}

module.exports = tasksController;