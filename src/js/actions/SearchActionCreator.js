import AppDispatcher from '../dispatchers/AppDispatcher';
import Constants from '../constants/AppConstants';
import request from 'superagent';

var SearchActions = {

  startTyping(){
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.SEARCH_STARTED_TYPING
    });
  },

  setSearchResults(resp){
    if (resp.ok){
      AppDispatcher.handleServerAction({
        type: Constants.ActionTypes.SEARCH_RESULT_POPULATE,
        data: resp.body
      });
    }else{
      AppDispatcher.handleServerAction({
        type: Constants.ActionTypes.SEARCH_REQUEST_FAILED,
      });
    }
  },  

  paginateSearchResults(resp){
    if( resp.ok ){
      AppDispatcher.handleServerAction({
        type: Constants.ActionTypes.SEARCH_RESULT_PAGINATE,
        data: resp.body
      });    
    }else{
      AppDispatcher.handleServerAction({
        type: Constants.ActionTypes.SEARCH_REQUEST_FAILED
      });
    }
  },

  query(queryText){
    SearchActions.getRecipies(queryText, 0, SearchActions.setSearchResults);
  },

  paginate(queryText, pg){
    SearchActions.getRecipies(queryText, pg, SearchActions.paginateSearchResults);
  },

  getRecipies(queryText, pg, cb) {
    var pg = pg || 0;
    var cb = cb || (x)=>{};

    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.SEARCH_STARTED
    })

    request.get('http://api.bigoven.com/recipes/')
      .set('Accept', 'application/json')
      .query({
        title_kw: queryText,
        rpp: '20',
        pg: '0',
        api_key: 'dvx0miabOLS0CK5063M4b89a7wU8XkdR'
      }).end(cb);
  }

};

export default SearchActions;