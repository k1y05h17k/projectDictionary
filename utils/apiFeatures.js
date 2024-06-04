class APIFeatures {
    constructor(query, queryString) {
        this.query = query,
            this.queryString = queryString;
    };

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query.sort('-createdAt');
        }

        return this;
    };

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').json(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select();
        }

        return this;

    };

    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }

    search() {
        const searchQuery = this.queryString.search;
        if (searchQuery) {
            // Busca palavras que contenham a sequência fornecida no campo 'word'
            this.query = this.query.find({ word: { $regex: searchQuery, $options: 'i' } });
        } else {
            console.log('Nenhuma consulta de pesquisa fornecida');
        }
        return this;
    }
}

module.exports = APIFeatures;

