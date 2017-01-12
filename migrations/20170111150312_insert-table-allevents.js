exports.up = function(knex, Promise) {

  // console.log(moment(new Date(2017, 1, 24, 13, 30, 0)).format('MMM Do YYYY, h:mm:ss a'))
  const query = knex('allevents')
    .insert([
      {
        title: 'Cooking with Chef Rich Mead | Braising',
        host: 'Rogers Gardens',
        desc: 'Learn from Chef Rich mead, owner and chef of Farmhouse at Roger\'s Gardens, as he shares his technique for braising food. When braising a meal, it can be prepared ahead (always better if made the day before) and reassembled, heated, and plated. Be inspired by the fresh seasonal ingredient combinations he uses to create these delectable dishes. Field-to-fork food from Farmhouse to your house.',
        costlower: 0,
        costupper: 0,
        starttime: new Date(2017, 1, 24, 13, 30, 0),
        endtime: new Date(2017, 1, 24, 16, 0, 0),
        longitude: null,
        latitude: null,
        address: '2301 San Joaquin Hills Road, Corona del Mar, CA 92625',
        image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F26865179%2F36721670842%2F1%2Foriginal.jpg?w=800&rect=0%2C24%2C700%2C350&s=dc6eddebba7a55bcb6dc2e56623bb158'
      },
      {
        title: 'Beachie Beauty Classic Movie Night',
        host: 'Beachie Beauty',
        desc: 'Join us for an exclusive look at a pastime that will get your classic juices growing for the season. Yes folks, it\'s movie night with Beachie Beauty. Movie, activities, and more will be announced closer to the event so grab your tickets. You don\'t want to miss it.\nCalling all SPONSORS, if you would like to sponsor our event, email us at beachiebeauty@yahoo.com',
        costlower: 20,
        costupper: 20,
        starttime: new Date(2017, 3, 24, 19, 0, 0),
        endtime: new Date(2017, 3, 24, 22, 0, 0),
        longitude: null,
        latitude: null,
        address: 'Newport Beach, CA',
        image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F24298594%2F55458999395%2F1%2Foriginal.jpg?w=800&rect=60%2C0%2C598%2C299&s=9373564fc7ba24a66301bbcdc451e3f5'
      },
      {
        title: 'VIP Passes - Vegan Street Fair LA 2017',
        host: 'Vegan Street Fair',
        desc: 'Vegan Street Fair is an annual vegan food celebration where local vegan and vegan-friendly restaurants and vendors come together to serve you bite-size portions of vegan eats all in one place.\nThe best part? All bite-sized portions are $4 max and entrance is FREE for the general public.\nThis year, VSF is offering a VIP pass that acts as a fast pass ticket for those interested in getting the VIP experience. These passes WILL sell out so do not miss out! FOOD IS NOT INCLUDED.\nVIP passes are $40 each.',
        costlower: 40,
        costupper: 40,
        starttime: new Date(2017, 2, 26, 11, 0, 0),
        endtime: new Date(2017, 2, 26, 19, 0, 0),
        longitude: null,
        latitude: null,
        address: '11223 Chandler Blvd, North Hollywood, CA 91354',
        image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F26988155%2F161481167599%2F1%2Foriginal.jpg?w=800&rect=0%2C19%2C1920%2C960&s=0d529b7cdc8491ff18c1739bd2f9e3bc'
      }
    ])

  return query

};

exports.down = function(knex, Promise) {

  const query = knex('allevents').del()
  return query

};
