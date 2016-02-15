var config = {
    lang: 'en',
    time: {
        timeFormat: 12,
        displaySeconds: true,
        digitFade: false,
    },
    weather: {
        //change weather params here:
        // modified to use api.forecast.io

        params: {
            loc:  '38.8673,-104.7607',  //Colorado Springs
            apiID:  '<your api key>'
        }
    },

    },
    compliments: {
        interval: 30000,
        fadeInterval: 4000,
        morning: [
            'Good morning, handsome!',
            'Enjoy your day!',
            'Buenos Dias!',
            'Bonjour',
            'Guten Morgen!',
            'おはようございます',
            'God Morgon',
            'Who wants breakfast?',
            'How did you sleep?'
        ],
        afternoon: [
            'Hello, beauty!',
            'You look sexy!',
            'Looking good today!'
        ],
        evening: [
            'Wow, you look hot!',
            'You look nice!',
            'Who wants a beer?',
            'Time for a drink?',
            'Wine?',
            'Alcohol is a way of life, alcohol is my way of life, and I aim to keep it.',
            'What wine goes with Captain Crunch?',
            'MMMMM..beer.',
            'Everybody should believe in something. I believe I will have another drink',
            'Beer is proof that God loves us and wants us to be happy',
            'Here is to alcohol: the cause of, and solution to, all of lifes problems.',
            'Hi, sexy!'
        ]
    },
    calendar: {
        maximumEntries: 5, // Total Maximum Entries
                displaySymbol: true,
                defaultSymbol: 'calendar', // Fontawsome Symbol see http://fontawesome.io/cheatsheet/
        urls:[
              {
                        symbol: 'male',
                        url: 'https://calendar.google.com/calendar/ical/<----private---->/basic.ics',
                },

               {
                        symbol: 'female',
                        url: 'https://calendar.google.com/calendar/ical/<----private---->/basic.ics',
               },
                // {
                        // symbol: 'mars',
                        // url: "https://server/url/to/his.ics",
                // },
                // {
                        // symbol: 'venus',
                        // url: "https://server/url/to/hers.ics",
                // },
                // {
                        // symbol: 'venus-mars',
                        // url: "https://server/url/to/theirs.ics",
                // },
                ]
    },
    news: {
        feed: 'http://rss.cnn.com/rss/cnn_latest.rss'
    }
}

