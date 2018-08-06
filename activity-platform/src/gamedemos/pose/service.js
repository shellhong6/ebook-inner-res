import services from 'commonJsDir/services.js';
import oauthServices from 'commonJsDir/oauthServices.js';
var ajax = require('commonJsDir/ajax.js');

$.extend(services, oauthServices, {
  getWinCard(successcallback,failcallback){
    ajax.oauthRequest('/campaign/oauth/getWinCard',{campaignId: this.campaignId},function(ret){
      let transformRet = {};

      ret = ret || [];

      ret.forEach(function(value){
        let cardMap = {};

        value.cards.forEach(card=>{
          cardMap[card.cardId] = card.unchangeCount;
        })
        transformRet[value.prizeGroupId] = cardMap;
      });

      transformRet.original = ret;

      successcallback(transformRet);

    },failcallback);
  },
  exchangeCard(prizeGroupId, successcallback, failcallback){

    ajax.oauthRequest('/campaign/oauth/exchangeCard',{campaignId: this.campaignId, prizeGroupId: prizeGroupId},successcallback,failcallback);
  }
});

module.exports = services;