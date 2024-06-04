const Dictonary = require('../models/dictionaryModel');
const History = require('./../models/historyModel');
const APIFeatures = require('./../utils/apiFeatures');
const axios = require('axios');
exports.getAllWords = async (req, res) => {
    try {
        const features = new APIFeatures(Dictonary.find(), req.query)
            .search()
            .sort()
            .limitFields()
            .paginate()
            

        const words = await features.query;
        
        // Calcular total de documentos
        const totalDocs = await Dictonary.countDocuments();

        // Calcular total de páginas
        const totalPages = Math.ceil(totalDocs / features.query.limit);
        console.log(features.query)

        // Verificar se há página anterior e próxima
        const hasNext = features.queryString.page < totalPages;
        const hasPrev = features.queryString.page > 1; 

        res.status(200).json({
            status: 'success',
            totalDocs: totalDocs,
            page: features.queryString.page || 1,
            totalPages: totalPages,
            hasNext: hasNext,
            hasPrev: hasPrev,
            data: {
                words
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.getWord = async (req, res) =>{

    try{
        const wordParams = req.params.word;
        const user = req.user.id;
        console.log(wordParams)
        const word = await Dictonary.find({word:wordParams}).populate('history');
        const wordId = word[0]._id;
    //  Search word in API for show in return 200 of request 
        const wordApi = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordParams}`);
        const wordData = wordApi.data;
        // Code vallidation datas, for add to body and send to add   
        if(!req.body.word) req.body.word = wordId;
        if(!req.body.user) req.body.user = user;
        
        await History.create(req.body);

        res.status(200).json({
            status:'sucess',
            // results:word.length,
            data:{
                wordData
            }
        });
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }

}