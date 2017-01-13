exports.up = function(knex, Promise) {

  const query = knex('allevents')
    .insert([
      {
        title: 'Cooking with Chef Rich Mead | Braising',
        host: 'Rogers Gardens',
        desc: 'Learn from Chef Rich mead, owner and chef of Farmhouse at Roger\'s Gardens, as he shares his technique for braising food. When braising a meal, it can be prepared ahead (always better if made the day before) and reassembled, heated, and plated. Be inspired by the fresh seasonal ingredient combinations he uses to create these delectable dishes. Field-to-fork food from Farmhouse to your house.',
        attendees: 4020,
        costlower: 0,
        costupper: 0,
        starttime: new Date(2017, 1, 24, 13, 30),
        endtime: new Date(2017, 1, 24, 16, 0),
        longitude: null,
        latitude: null,
        address: '2301 San Joaquin Hills Road, Corona del Mar, CA 92625',
        image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F26865179%2F36721670842%2F1%2Foriginal.jpg?w=800&rect=0%2C24%2C700%2C350&s=dc6eddebba7a55bcb6dc2e56623bb158'
      },
      {
        title: 'Beachie Beauty Classic Movie Night',
        host: 'Beachie Beauty',
        desc: 'Join us for an exclusive look at a pastime that will get your classic juices growing for the season. Yes folks, it\'s movie night with Beachie Beauty. Movie, activities, and more will be announced closer to the event so grab your tickets. You don\'t want to miss it.\nCalling all SPONSORS, if you would like to sponsor our event, email us at beachiebeauty@yahoo.com',
        attendees: 131,
        costlower: 20,
        costupper: 20,
        starttime: new Date(2017, 3, 24, 19, 0),
        endtime: new Date(2017, 3, 24, 22, 0),
        longitude: null,
        latitude: null,
        address: 'Newport Beach, CA',
        image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F24298594%2F55458999395%2F1%2Foriginal.jpg?w=800&rect=60%2C0%2C598%2C299&s=9373564fc7ba24a66301bbcdc451e3f5'
      },
      {
        title: 'VIP Passes - Vegan Street Fair LA 2017',
        host: 'Vegan Street Fair',
        desc: 'Vegan Street Fair is an annual vegan food celebration where local vegan and vegan-friendly restaurants and vendors come together to serve you bite-size portions of vegan eats all in one place.\nThe best part? All bite-sized portions are $4 max and entrance is FREE for the general public.\nThis year, VSF is offering a VIP pass that acts as a fast pass ticket for those interested in getting the VIP experience. These passes WILL sell out so do not miss out! FOOD IS NOT INCLUDED.\nVIP passes are $40 each.',
        attendees: 441,
        costlower: 40,
        costupper: 40,
        starttime: new Date(2017, 2, 26, 11, 0),
        endtime: new Date(2017, 2, 26, 19, 0),
        longitude: null,
        latitude: null,
        address: '11223 Chandler Blvd, North Hollywood, CA 91354',
        image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F26988155%2F161481167599%2F1%2Foriginal.jpg?w=800&rect=0%2C19%2C1920%2C960&s=0d529b7cdc8491ff18c1739bd2f9e3bc'
      },
      {
        title: 'SoCal Retro Gaming Expo 2017 SCRGE',
        host: 'SoCal Retro Gaming Expo',
        desc: 'On February 4th and 5th 2017, we will be holding the SoCal Retro Gaming Expo 2017 at the Ontario Convention Center in Southern California.\nWe will have many of your favorite YouTube talent attending this event, for panels, meet & greets and signings. There will be a large FREE play arcade for everyone to enjoy. We will be hosting Retro Gaming tournametns throughout the weekend. The hall will be full of retro gaming vendors, giveaways, photo ops and so much more! Hope to see you at the Expo!',
        attendees: 1020,
        costlower: 18,
        costupper: 30,
        starttime: new Date(2017, 1, 4, 9, 0),
        endtime: new Date(2017, 1, 5, 17, 0),
        longitude: null,
        latitude: null,
        address: '2000 East Convention Center Way, Ontario, CA 91764',
        image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F23284183%2F183793827498%2F1%2Foriginal.jpg?w=800&rect=0%2C153%2C8000%2C4000&s=63938c4b9c730091a3f07030c5fcb396'
      },
      {
        title: 'Sweet Tarts Class',
        host: 'Saute Culinary Academy',
        desc: 'This sweet tart making class wil explore techniques for making tart dough and amazing fillings to dazzle your friends. Ever wonder how to make these? Under the careful eye of a professional Chef, you\'ll make flaky tarts all from scratch.',
        attendees: 14,
        costlower: 75,
        costupper: 75,
        starttime: new Date(2017, 1, 19, 10, 0),
        endtime: new Date(2017, 1, 19, 13, 0),
        longitude: null,
        latitude: null,
        address: '150 E Colorado Blvd, Monrovia, CA 91016',
        image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F26881551%2F5210355959%2F1%2Foriginal.jpg?w=800&rect=0%2C43%2C298%2C149&s=a37dbfa14aad39127f0401bd75b93bef'
      },
      {
        title: 'Peter Gunz Celebrity Bash',
        host: 'MarieDriven',
        desc: 'You\'re invited to attend TV Personality Peter Gunz\'s Celebrity Birthday Bash\nLocation: Hayaty NYC 103 Avenue A NY,NY\nJan 12th 2017\n6pm-11:30pm\nHappy Hour $5 dollar wine, & $7 Cocktail\nFood & Hookah available',
        attendees: 250,
        costlower: 0,
        costupper: 0,
        starttime: new Date(2017, 0, 12, 18, 0),
        endtime: new Date(2017, 0, 12, 22, 30),
        longitude: null,
        latitude: null,
        address: 'Hayaty NYC, 103 Avenue A, New York, NY 10009',
        image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F27023718%2F10800984321%2F1%2Foriginal.jpg?w=800&rect=0%2C561%2C1274%2C637&s=57bb6de9ec9d648b5577da1f84ffae17'
      }
    ])

  return query

};

exports.down = function(knex, Promise) {

  const query = knex('allevents').del()
  return query

};
