const _ = require('lodash');

class MongoRepository {

    page;
    perPage;
    
    constructor() {
        // PAGINATION
        this.page = 1;
        this.perPage = 10;
    }

    // SEARCH KEYWORD SETTER NEW
    seaKeyCond(searchKeyword, searchProperties) {
        let query = [];
        searchKeyword = searchKeyword.trim();
        _.forEach(searchProperties, (value) => {
            query.push(
                {
                    [value]: {
                        $regex: '.*' + searchKeyword + '.*',
                        $options: 'i'
                    }
                }
            )
        });
        return query;
    }

    customPagination(data) {
        let limit = data.perPage || 10;
        let skip = ((data.page || 1) -1) * limit;
        return { limit, skip };
    }

}

module.exports = new MongoRepository();