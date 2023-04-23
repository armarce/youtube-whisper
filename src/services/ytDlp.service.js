const path  = require('path');
const { exec } = require('child-process-async');

class ytDlpService{

    download = async (id, pathFile) => {

        try{

            if(!this.validateYoutubeId(id)){

                throw 'invalidYoutubeId';

            }

            const cmd = `yt-dlp --no-mtime --extractor-args "youtube:skip=dash" -f 140 -o "${pathFile}" -- ${id}`;

            await exec(cmd);

        }catch{

            throw 'cantDownloadYoutube'
            
        }

    }

    validateYoutubeId = id => {

        const regexp = /^[A-Za-z0-9_-]{11}$/g;

        const match = id.match(regexp);

        return match?.length;

    }

}

module.exports = ytDlpService;