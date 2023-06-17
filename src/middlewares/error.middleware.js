const errors = {

    invalidTask: { status: 400, msg: 'Invalid task'},
    invalidModel: { status: 400, msg: 'Invalid model'},
    invalidLang: { status: 400, msg: 'Invalid language'},
    invalidYoutubeId: { status: 400, msg: 'Invalid Youtube ID'},
    cantDownloadYoutube: { status: 500, msg: 'Cant download Youtube video'},
    cantTranscriptVideo: { status: 500, msg: 'Cant transcript video'}

}

const errorHandler = (err, req, res, next) => {

    try {

        res.status(errors[err].status).json({ success: false, msg: errors[err].msg })

    } catch(err) {
        
        res.status(500).json({ success: false, msg: err })

    }

};

module.exports = errorHandler;