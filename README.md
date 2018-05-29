## Setup
Local Install:

```bash
brew install redis
npm install
```

Startup:
```bash
redis-server & # only needs to be executed once
npm start
```

Stop Redis:
```bash
pkill redis-server
```

Clear Redis Cached data:
```
redis-cli flushall
```

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
        teams: {
            red: {
                players: [
                    {
                        'id': '123456asdfg',
                        nickname: 'Aweb',
                        blizzardId: 'aweb#1521',
                        characterName: 'Chiweb',
                        classSpec: 'monk-mistweaver',
                        faction: 'alliance',
                        leader: true
                    },
                    // ...
                ]
            },
            blue: {
                // ...
            }
        }
    }
}
```

## Phase Order
`form-team` -> `blind-pick` -> `round-1` -> `map-pick-1` -> `winner-pick-1` -> `loser-pick-1` ->
`round-2` -> `map-pick-2` -> `winner-pick-2` -> `loser-pick-2` -> `round-3` -> `results`

__`form-team`:__ Players join teams. Once each team has 3 or 4 players, the leaders can ready up and proceed to `blind-pick`.

__`blind-pick`:__ Both teams simultaneously pick their compositions. Each team must have exactly 3 characters selected all the same faction. The first map will always be Nagrand Arena..

**_foreach round as `n`_**

__`round-n`:__ Teams will form and wargame played (all of this will be handled by the users), leaders will be responsible for reporting who won the match.

__`map-pick-n`:__ The losing team's leader will determine the next map to play on.

__`winner-pick-n`:__ The winning team picks their composition.

__`loser-pick-n`:__ The winning team's composition will be displayed, and the losing team can form their team.

__`results`:__ Display results, game ends.
