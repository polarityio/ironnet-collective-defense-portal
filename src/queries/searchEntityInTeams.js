const { map } = require("lodash/fp");
const { requestsInParallel } = require("../request");

// DOCUMENTATION: https://learn.microsoft.com/en-us/graph/search-concept-chat-messages?tabs=http
const searchEntityInTeams = async (entities, options) => {
  const queryRequestOptions = map(
    (entity) => ({
      entity,
      method: 'POST',
      site: 'teams',
      route: 'v1.0/search/query',
      body: {
        requests: [
          {
            entityTypes: ['chatMessages'],
            query: {
              queryString: entity.value
              /** if adding KQL use this
               * replace(
                  /{{ENTITY}}/gi,
                  escapeQuotes(entityValue),
                  options.kustoQueryString
                )
              */
            },
            from: 0,
            size: 25
          }
        ]
      },
      options
    }),
    entities
  );

  const queryResults = await requestsInParallel(queryRequestOptions, 'body.value');

  //TODO add post processing to get just message search results
  return queryResults;
};

module.exports = searchEntityInTeams;

/* 
RESPONSE: 
{
    "value": [
        {
            "searchTerms": [
                "test"
            ],
            "hitsContainers": [
                {
                    "hits": [
                        {
                            "hitId": "AAMkAGIwMDA5MmY0LWY5ZTgtNGY5YS04NzczLWNhNjc0ZGIyZDBjYgBGAAAAAADm35sgHbzESapJ8+BjBlhEBwDAYtphe7dsRbDrOT/HAHoKAAAAAAEpAADAYtphe7dsRbDrOT/HAHoKAAFwxQGaAAA=",
                            "rank": 1,
                            "summary": "...Test with the TDF account",
                            "resource": {
                                "@odata.type": "microsoft.graph.chatMessage",
                                "id": "1657782060227",
                                "createdDateTime": "2022-07-14T07:01:01Z",
                                "lastModifiedDateTime": "2022-07-14T07:01:03Z",
                                "subject": "",
                                "importance": "normal",
                                "webLink": "https://outlook.office365.com/owa/?ItemID=AAMkAGIwMDA5MmY0LWY5ZTgtNGY5YS04NzczLWNhNjc0ZGIyZDBjYgBGAAAAAADm35sgHbzESapJ8%2BBjBlhEBwDAYtphe7dsRbDrOT%2FHAHoKAAAAAAEpAADAYtphe7dsRbDrOT%2FHAHoKAAFwxQGaAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
                                "from": {
                                    "emailAddress": {
                                        "name": "Goncalo Torres",
                                        "address": "gtorres@contoso.com"
                                    }
                                },
                                "channelIdentity": {},
                                "etag": "1657782060227",
                                "chatId": "19:bdeff6bfed7f4b159cdf7fdd61aeacaa@thread.v2"
                            }
                        }
                    ],
                    "total": 1,
                    "moreResultsAvailable": false
                }
            ]
        }
    ]
}
*/
