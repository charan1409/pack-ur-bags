import React from "react";
import "./style.css";
import Component from "./PlacesHotelComponent";
import Header from "../Navbar/Header";
import img from "../viewplaces/img.jpg";
import { useLocation } from "react-router-dom";
import photo11 from "../viewplaces/places/beach/blue-ocean-resort.jpg";
import photo12 from "../viewplaces/places/beach/paradise.jpg";
import photo13 from "../viewplaces/places/beach/radisson.jpg";
import photo21 from "./images/GatewayHotel.webp";
import photo22 from "./images/taj.webp";
import photo23 from "./images/TajGanges.webp";
import photo31 from "./images/GatewayHotel.webp";
import photo32 from "./images/taj.webp";
import photo33 from "./images/TajGanges.webp";
import photo41 from "../viewplaces/places/beach/blue-ocean-resort.jpg";
import photo42 from "../viewplaces/places/beach/paradise.jpg";
import photo43 from "../viewplaces/places/beach/radisson.jpg";
import photo51 from "./images/GatewayHotel.webp";
import photo52 from "./images/taj.webp";
import photo53 from "./images/TajGanges.webp";
import photo61 from "./images/GatewayHotel.webp";
import photo62 from "./images/taj.webp";
import photo63 from "./images/TajGanges.webp";

const desc1 =
  "If you’re among the one in six Australians to experience the bitter pain of a marine stinger such as abluebottle, you’ll know how quickly they can end a fun day at the beach.We can’t stop the summer winds that deliver these creatures to our shores, but we can choose the safestspots to swim.Our recent research provides the first evidence of what transports bluebottles to Australian beaches.We found the direction a beach faces, relative to wind direction, largely determines how manybluebottles are pushed to shore. We hope these findings will help beachgoers safely plan where to taketheir next dip.";
const desc2 =
  "Karnataka is a state in southwest India with Arabian Sea coastlines. The capital, Bengaluru(formerly Bangalore), is a high-tech hub known for its shopping and nightlife. To the southwest,Mysore is home to lavish temples including Mysore Palace, former seat of the region’s maharajas. Hampi, once the medieval Vijayanagara empire’s capital, contains ruins of Hindu temples,elephant stables and a stone chariot";
const desc3 =
  "Manali is a town in the Indian state of Himachal Pradesh.[2] It is situated in the northern endof the Kullu Valley, formed by the Beas River. The town is located in the Kullu district,approximately 270 kilometres (170 mi) north of the state capital of Shimla and 544 kilometres(338 mi) northeast of the national capital of Delhi. With a population of 8,096 people recordedin the 2011 Indian census Manali is the beginning of an ancient trade route through Lahaul andLadakh, over the Karakoram Pass and onto Yarkand and Hotan in the Tarim Basin of China. Manaliis a popular tourist destination in India and serves as the gatewayto the Lahaul and Spiti district as well as the city of Leh in Ladakh.";
const desc4 =
  "smallest town located in north side of Vypin island. This town connects to kochin, North pravur and Kodungallur. It is a region in Kochi Taluk, a suburb of the city of Kochi, in the state of Kerala, India. It is at a distance of about 22.6km from the High Court Junction, Kochi. Cherai has the longest beach in Kochi - the Cherai beach. The beach is located towards the centre-north of the Vypin island. The Cherai Beach is 10 km long.[citation needed] Dolphins are occasionally seen here. Cherai has played an important role in the history of modern Kerala by becoming the birthplace of two prominent political personsages of modern Kerala - Mathai Manjooran and Sahodaran Ayyappan. Cherai Gowreeshwara Temple is one of the main Hindu temples. The temple is maintained by Vijnana Vardhini Sabha (V. V Sabha). It also known as Kerala palani. The festival in the temple is the biggest festival in Eranakulam district. The festival happens every year towards the last 2 weeks of January or first 2 weeks of February.";
const desc5 =
  'It is not known who first used this name or what they intended it to mean.The word Kodaikanal is an amalgamation of two words: kodai and kanal. The Tamil language has atleast four possible interpretations of the name Kodaikanal. By pronouncing the first syllable ofKodaikanal with a long Tamil \'O\', as in koe-dei (கொடை), it means "summer", whilst the final twosyllables kanal (காணல்) means "to see", rendering Kodaikanal as a "place to see in summer".Kodaikanal is a summer forest, and it is a place that the first missionaries used as a refuge toescape the overbearing and mosquito-ridden heat of the plains – a place that they would havecounted on seeing in the summer.';
const desc6 =
  "A boulder conglomeration is situated on the coast of Sangwan, and the beach is covered in grainy ivory-colored sand. The beach's infrastructure is well-developed. There are sunbeds and umbrellas (they cost 100 Thai baht), showers and toilets. The descent is smooth, the sea bottom is sandy, no waves can be seen. A cafe that serves Thai and European meals and fast food operates on the slope of the hill. The simplest meal costs 150 Thai baht. The food can't be served to the beach. The beach is perfect for swimming and sunbathing. You can safely bring your children. Sangwan Beach is mostly uncrowded, even during the busiest days for Tawaen";

const hotel1 = [
  {
    val: 0,
    h: [
      {
        id: 1,
        photo: photo11,
        hotel: "Blue Ocean Hotels and Resorts",
        location:
          "Swastik Ave, Chinnadi Kuppam, Injambakkam, Chennai,Tamil Nadu 600014",
        direction:
          "A minute’s walk from the closest beach along the Bay of Bengal, this casual hotel in a residential neighbourhood is 8 km from Taramani train station and 12 km from Guindy National Park.",
        price: "1000",
      },
      {
        id: 2,
        photo: photo12,
        hotel: "Blue Bay Beach Resort",
        location:
          "Vadanemilli Village (Before Crocodile Park, SH 49,Mahabalipuram,Tamil Nadu 603104",
        direction:
          "Overlooking a sandy beach, this straightforward resort is 10 km from DakshinaChitra museum, and a 5-minute walk from The Madras Crocodile Bank Trust and Centre for Herpetology",
        price: "1200",
      },
      {
        id: 3,
        photo: photo13,
        hotel: "Sunshine Resort",
        location: "Chennai,Tamil nadu",
        direction: "10 min walk from railway station",
        price: "900",
      },
    ],
  },
  {
    val: 1,
    h: [
      {
        id: 1,
        photo: photo21,
        hotel: "Rahul Residency",
        location:
          "Kodialguttu Road OPP. R.K AUTO WORLD,575003 Mangalore, India",
        direction:
          "Located in Mangalore in the Karnataka region with Gokarnanatheshwara Temple nearby, Rahul Residency provides accommodation with free private parking.Featuring free WiFi, the units have a safety deposit box",
        price: "1000",
      },
      {
        id: 2,
        photo: photo22,
        hotel: "Gokarna camping",
        location: "Belehittal Road, 581319 Gokarna, India",
        direction:
          "This property is 1 minute walk from the beach. Gokarna camping is situated in Gokarna.A car rental service and a private beach area are available at the camping.Kārwār is 34 km from Gokarna camping, while Kumta is 17 km from the property.",
        price: "1500",
      },
      {
        id: 3,
        photo: photo23,
        hotel: "Sunny's Paradise",
        location: "Kudle Beach Road, 581326 Gokarna, India",
        direction:
          "This property is 2 minutes walk from the beach. Located in Gokarna, Sunny's Paradise offers a garden. There is a restaurant serving Chinese cuisine, and free private parking is available.",
        price: "1200",
      },
    ],
  },
  {
    val: 2,
    h: [
      {
        id: 1,
        photo: photo41,
        hotel: "Cherai Natural Beach",
        location:
          "Cherai Beach Road, Cherai, Kochi, Kerala,683514 Cherai Beach, India",
        direction:
          "This property is 1 minute walk from the beach. Cherai Natural Beach offersaccommodation in Cherai. The property is near to Cherai Beach Road, VypeenIsland.It is 30 km from Ernakulam, and 35 km from Cochin International Airport.",
        price: "1700",
      },
      {
        id: 2,
        photo: photo42,
        hotel: "Petit Elephant grand",
        location: "Petit Elephant",
        direction:
          "Situated in Cherai Beach, Petit Elephant offers beachfront accommodation lessthan1 km from Cherai Beach and features various facilities, such as a garden and aterrace.",
        price: "1900",
      },
      {
        id: 3,
        photo: photo43,
        hotel: "Sapphire Club Cherai Beach Villa",
        location:
          "Cherai Beach - Munambam Rd, Cherai Beach ,Kerala 683515, 683515 Cherai Beach, India",
        direction:
          "This property is 1 minute walk from the beach. Located in Cherai Beach, lessthan 1 km from Cherai Beach, Sapphire Club Cherai Beach Villa featuresaccommodation with free WiFi and free private parking",
        price: "1999",
      },
    ],
  },
];

const hotel2 = [
  {
    id: 1,
    photo: photo21,
    hotel: "Rahul Residency",
    location: "Kodialguttu Road OPP. R.K AUTO WORLD,575003 Mangalore, India",
    direction:
      "Located in Mangalore in the Karnataka region with Gokarnanatheshwara Temple nearby, Rahul Residency provides accommodation with free private parking.Featuring free WiFi, the units have a safety deposit box",
    price: "1000",
  },
  {
    id: 2,
    photo: photo22,
    hotel: "Gokarna camping",
    location: "Belehittal Road, 581319 Gokarna, India",
    direction:
      "This property is 1 minute walk from the beach. Gokarna camping is situated in Gokarna.A car rental service and a private beach area are available at the camping.Kārwār is 34 km from Gokarna camping, while Kumta is 17 km from the property.",
    price: "1500",
  },
  {
    id: 3,
    photo: photo23,
    hotel: "Sunny's Paradise",
    location: "Kudle Beach Road, 581326 Gokarna, India",
    direction:
      "This property is 2 minutes walk from the beach. Located in Gokarna, Sunny's Paradise offers a garden. There is a restaurant serving Chinese cuisine, and free private parking is available.",
    price: "1200",
  },
];

const hotel3 = [
  {
    id: 1,
    photo: photo31,
    hotel: "Montana Blues Resort",
    location:
      "MDR 29 MDR29, Prini, Manali, Himachal Pradesh 175103, 175103 Manāli, India",
    direction:
      "Set in Manāli, 5 km from Hidimba Devi Temple, Montana Blues Resort offersaccommodation with a restaurant, free private parking, a shared lounge and agarden. Featuring family rooms, this property also provides guests with aterrace.",
    price: "1200",
  },
  {
    id: 2,
    photo: photo32,
    hotel: "Hotel Mountain face by Snow City Hotels",
    location:
      "Near White Meadows Resorts Prini, ManaliDistt. Kullu (H.P.), 175131 Manāli, India",
    direction:
      "Set in Manāli, 5 km from Hidimba Devi Temple, Hotel Mountain face by Snow CityHotels offers accommodationwith a restaurant, free private parking, a shared lounge and a garden",
    price: "1100",
  },
  {
    id: 3,
    photo: photo33,
    hotel: "Hotel Mountain Top",
    location: "Near Hadimba Temple, 175131 Manāli, India",
    direction:
      "Featuring free WiFi throughout the property, Hotel Mountain Top is situated in Manali, 200 m from Hidimba Devi Temple. The hotel has a sun terrace and views of the mountain.",
    price: "1400",
  },
];

const hotel4 = [
  {
    id: 1,
    photo: photo41,
    hotel: "Cherai Natural Beach",
    location:
      "Cherai Beach Road, Cherai, Kochi, Kerala,683514 Cherai Beach, India",
    direction:
      "This property is 1 minute walk from the beach. Cherai Natural Beach offersaccommodation in Cherai. The property is near to Cherai Beach Road, VypeenIsland.It is 30 km from Ernakulam, and 35 km from Cochin International Airport.",
    price: "1700",
  },
  {
    id: 2,
    photo: photo42,
    hotel: "Petit Elephant grand",
    location: "Petit Elephant",
    direction:
      "Situated in Cherai Beach, Petit Elephant offers beachfront accommodation lessthan1 km from Cherai Beach and features various facilities, such as a garden and aterrace.",
    price: "1900",
  },
  {
    id: 3,
    photo: photo43,
    hotel: "Sapphire Club Cherai Beach Villa",
    location:
      "Cherai Beach - Munambam Rd, Cherai Beach ,Kerala 683515, 683515 Cherai Beach, India",
    direction:
      "This property is 1 minute walk from the beach. Located in Cherai Beach, lessthan 1 km from Cherai Beach, Sapphire Club Cherai Beach Villa featuresaccommodation with free WiFi and free private parking",
    price: "1999",
  },
];

const hotel5 = [
  {
    id: 1,
    photo: photo51,
    hotel: "FabHotel Tranquil Heights Kodaikanal",
    location:
      "W5/935, E.C.C Road, Thiruvalluvar Nagar,Naidupuram,, 624101 Kodaikānāl",
    direction:
      "Located in Kodaikānāl, within 2.3 km of Bear Shola Falls and 2.6 km ofKodaikanal Lake, FabHotel Tranquil Heights Kodaikanal provides accommodationwith a garden and free WiFi",
    price: "2000",
  },
  {
    id: 2,
    photo: photo52,
    hotel: "JC Woodville Manor",
    location: "Opp Bus Stand, Woodville Road, , 624101Kodaikānāl, India",
    direction:
      "A 2-minute walk from Coakers Walk and Bryant Park, JC Woodville Manor offers apeaceful retreat in Kodaikkanal.It features free parking, a 24-hour front desk and rooms with a TV..",
    price: "1500",
  },
  {
    id: 3,
    photo: photo53,
    hotel: "FabHotel Roshan Residency Naidupuram",
    location: " No-2, Villpatty Road Naidupuram,, 624101Kodaikānāl, India",
    direction:
      "Situated in Kodaikānāl, within 1.6 km of Bear Shola Falls and 2 km of KodaikanalLake, FabHotel Roshan Residency Naidupuram features accommodation with a sharedlounge and free WiFi",
    price: "1000",
  },
];

const hotel6 = [
  {
    id: 1,
    photo: photo61,
    hotel: "Le Bliss Hotels Near Rock Beach",
    location: "Naga Progress Avenue, Bussy St, Puducherry, 605001",
    direction:
      "On a tree-lined main road with shops and businesses, this laid-back hotel is 7 minutes on foot from Puducherry train station and a 14-minute walk from Promenade Beach, a rocky shoreline",
    price: "1100",
  },
  {
    id: 2,
    photo: photo62,
    hotel: "TE Seaview Resorts",
    location: "No. 5, Thandirayankuppam, Kottakuppam, Near, Puducherry, 605104",
    direction:
      "No. 5, Thandirayankuppam, Kottakuppam, Near, Puducherry, 605104 097517 00057",
    price: "800",
  },
  {
    id: 3,
    photo: photo63,
    hotel: "Kempinski Ambience Hotel",
    location: "Shahdara, India",
    direction:
      "Experience the new symbol of majestic modern lighting in one of the oldestcapital cities in the world, where India’s newest landmark is born withKempinski Ambience Hotel Delhi.",
    price: "900",
  },
];
const navItems = [
  {
    title: "Home",
    path: "/index",
  },
];
function App() {
  const { state } = useLocation();
  // console.log(state.post_id);
  return (
    <div>
      <Header user={true} navItems={navItems} />
      {state.post_id === 1 && (
        <Component
          photo={state.post_photo}
          to={state.post_to}
          rate={state.post_rate}
          details={state.post_det}
          img={img}
          hotels={hotel1}
          description={desc1}
          username="kamal"
          review="good"
        />
      )}
      {state.post_id === 2 && (
        <Component
          photo={state.post_photo}
          to={state.post_to}
          rate={state.post_rate}
          details={state.post_det}
          img={img}
          hotels={hotel2}
          description={desc2}
          username="kamal"
          review="good"
        />
      )}
      {state.post_id === 3 && (
        <Component
          photo={state.post_photo}
          to={state.post_to}
          rate={state.post_rate}
          details={state.post_det}
          img={img}
          hotels={hotel3}
          description={desc3}
          username="kamal"
          review="good"
        />
      )}
      {state.post_id === 4 && (
        <Component
          photo={state.post_photo}
          to={state.post_to}
          rate={state.post_rate}
          details={state.post_det}
          img={img}
          hotels={hotel4}
          description={desc4}
          username="kamal"
          review="good"
        />
      )}
      {state.post_id === 5 && (
        <Component
          photo={state.post_photo}
          to={state.post_to}
          rate={state.post_rate}
          details={state.post_det}
          img={img}
          hotels={hotel5}
          description={desc5}
          username="kamal"
          review="good"
        />
      )}
      {state.post_id === 6 && (
        <Component
          photo={state.post_photo}
          to={state.post_to}
          rate={state.post_rate}
          details={state.post_det}
          img={img}
          hotels={hotel6}
          description={desc6}
          username="kamal"
          review="good"
        />
      )}
    </div>
  );
}
export default App;
