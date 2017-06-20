## Datamodel

Working on a datamodel that can represent all the info necessary. This is going to be from a backend point of view. Some information I'm puting here shouldn't be shared with the browser. (Opposing team picks, players internal IDs, etc etc.) 
```javascript
{
    match: {
        type: 'standard',
        bestOf: 3,
        'red-score': 1,
        'blue-score': 0,
        phase: { // team-pick, blind-pick, map-pick, in-game
            // Team pick
            type: 'team-pick',
            team: 'red',
            first-pick: true, // false = show opponents pick
            timer: 180,

            // Blind Pick
            type: 'blind-pick'
            timer: 180,

            // Map
            type: 'map-pick',
            team: 'blue',
            timer: 180,

            // In Game
            type: 'in-game', // basically just have the site say a match is being played.
        },
        maps: [
            {
                name: 'Nagrand Arena',
                played: true,
                winner: 'red-team'
            }, 
            {
                name: 'Blade\'s Edge Arena',
                played: false,
                winner: null
            },
            //....
        ]
        'red-team': {
            players: [
                {
                    'id': '123456asdfg',
                    nickname: 'Aweb',
                    'blizz-id': 'aweb#1521',
                    character: 'Chiweb',
                    class: 'Monk'
                    spec: 'Mistweaver',
                    faction: 'alliance',
                    leader: true
                },
                // ...
            ]
        }, 
        'blue-team': {
            // ...
        }
    }
}
```