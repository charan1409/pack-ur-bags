import React from "react";
import Heading from "./ViewplacesComponents/heading";
import "./style.css";
import Header from "../Navbar/Header";
import Components from "./ViewplacesComponents/PlacesComponent";
import photo1 from "./places/countryside/puthur.jpg";
import photo2 from "./places/countryside/thert.jpg";
import photo3 from "./places/countryside/shyam gaon.jpg";
import photo4 from "./places/countryside/chitrakote.jpg";
import photo5 from "./places/countryside/lachen.jpg";
import photo6 from "./places/countryside/hodka.jpg";
import { useNavigate } from "react-router-dom";

const countryside = [
  {
    id: 1,
    photo: photo1,
    to: "Puttur, Andhra Pradesh",
    details:
      "This small village in Andhra Pradesh is popular for its agriculture, mangroves and the prominent silk business.",
  },
  {
    id: 2,
    photo: photo2,
    to: "Theerthamalai, Tamil Nadu",
    details:
      "The name of the village translates to mean ‘The Hill of holy Water' and has a temple that dates back to the 7th century. Enjoy the calm and quiet that only such villages can provide.",
  },
  {
    id: 3,
    photo: photo3,
    to: "Shyam Gaon, Assam",
    details:
      "The small Buddhist locality in Jorhat district known as Shyam Gaon can provide an interesting rural journey in Assam.",
  },
  {
    id: 4,
    photo: photo4,
    to: "Chitrakote, Chhattisgarh",
    details:
      "Popular for the folk arts and handicrafts that are made in the village, Chitrakote is also popular for the Chitrakoot waterfalls.",
  },
  {
    id: 5,
    photo: photo5,
    to: "Lachen, Sikkim",
    details:
      "This is a small village that is set against a backdrop of snow-capped mountains and conifer trees.",
  },
  {
    id: 6,
    photo: photo6,
    to: "Hodka, Gujarat",
    details:
      "The village located in the Kutch or Kachchh district of Gujarat is a beautiful place that has a mix of both the desert of clay and sand that makes the region so unique.",
  },
];

const beaches = [
  {
    id: 1,
    photo: photo1,
    to: "Blue Ocean",
    details:
      "Located on the beach front, over the paradisiacal beaches of white sand and turquoise water of Bavaro, the Ocean Blue & Sand hotel boasts a complete structure perfectly integrated to its setting.",
    rate: "4",
  },
  {
    id: 2,
    photo: photo2,
    to: "Mangalore",
    details:
      "The river cruises start from Tourist Jetty on Mandovi river in Panaji town on Old Panaji Road. Each cruise is triple decked and a lovely panoramic view of the city of Panjim.",
    rate: "4",
  },
  {
    id: 3,
    photo: photo3,
    to: "Manali",
    details:
      "The top things to do in Himachal pradesh are Manali, Shimla, Mcleodganj, Dalhousie, Spiti,Kasol.You can see all the places to visit in Himachal pradesh here",
    rate: "4",
  },
  {
    id: 4,
    photo: photo4,
    to: "Cherai",
    details:
      "Imagine a mix of everything that Cherai has to offer, the beach, the backwaters, the smell of the palm trees, the view of the tall coconut trees and the far-stretched paddy fields all at one place; Cherai Beach Resort is that very place!",
    rate: "4",
  },
  {
    id: 5,
    photo: photo5,
    to: "Kodaikanal",
    details:
      "Kodaikanal is a hill town in the southern Indian state of Tamil Nadu. It’s set in an area of granite cliffs, forested valleys, lakes, waterfalls and grassy hills.",
    rate: "4",
  },
  {
    id: 6,
    photo: photo6,
    to: "Delhi",
    details:
      "Delhi showcases an ancient culture and a rapidly modernising country. Dotted with monuments there is much to discover here.",
    rate: "4",
  },
];

const Cultural = [
  {
    id: 1,
    photo: photo1,
    to: "Amritsar: The Golden City",
    details:
      "Amritsar is undoubtedly the heart of the Sikh culture in the country where Golden temple is located.Amritsar has many gurudwaras, museums and cultural places that make it one of the best places to experience the Sikh culture.",
  },
  {
    id: 2,
    photo: photo2,
    to: "Hampi: Ancient Kingdom Of Vijaynagar",
    details:
      "Hampi is a UNESCO world heritage site situated at the Northern part of Karnataka.This place is famous for Virupaksha temple and holding the ruins of the ancient kingdom of Vijaynagar.",
  },
  {
    id: 3,
    photo: photo3,
    to: "Lucknow: The City Of The Nawabs",
    details:
      "With an architecture that is heavily influenced by the Mughals, the Delhi Sultanate, the Nawabs of Awadh and the British, you can imagine how magnificent the heritage and culture of Lucknow is.",
  },
  {
    id: 4,
    photo: photo4,
    to: "Kolkata: The City Of Joy",
    details:
      "From the influence of the Nawabs of Bengal to the cultures set by the East India Company, the city of Kolkata has witnessed a tremendous cultural shift and emerged to have one of the most notable literary-rich crowd.Victoria Memorial, Howrah Bridge, Indian Museum, and St. Paul’s Cathedral are the most prominent tourist places in Kolkata.",
  },
  {
    id: 5,
    photo: photo5,
    to: "Kerala: God’s Own Country",
    details:
      "The diverse culture of Kerala is a blend of Aryan & Dravidian cultures, with influences drawn time-and-again from other Indian & international places. Hinduism, Islam, and Christianity have contributed majorly to the architecture, the rituals & customs, the performing arts, and the festivals of Kerala.",
  },
  {
    id: 6,
    photo: photo6,
    to: "Hyderabad: The City Of Nizams",
    details:
      "Hyderabad, established in 1591 was ruled by Sultans, Mughals, & Nizams before becoming a Princely State under the British Raj. The region was previously under the ancient kingdoms of Chalukyas and Kakatiyas. The city’s architecture is richly influenced by all these cultures.",
  },
];

const Desert = [
  {
    id: 1,
    photo: photo1,
    to: "Sahara desert",
    details:
      "The Sahara is a desert on the African continent. With an area of 9,200,000 square kilometres, it is the largest hot desert in the world and the third largest desert overall, smaller only than the deserts of Antarctica and the northern Arctic.",
  },
  {
    id: 2,
    photo: photo2,
    to: "Gobi Desert",
    details:
      "The Gobi Desert is a vast, arid region in northern China and southern Mongolia. It's known for its dunes, mountains and rare animals such as snow leopards and Bactrian camels. In the Gobi Gurvansaikhan National Park, the Khongoryn Els sand dunes are said to sing when the wind blows. The park also features…",
  },
  {
    id: 3,
    photo: photo3,
    to: "Kalahari desert",
    details:
      "The Kalahari Desert is a large semi-arid sandy savanna in Southern Africa extending for 900,000 square kilometres, covering much of Botswana, and parts of Namibia and South Africa.",
  },
  {
    id: 4,
    photo: photo4,
    to: "Thar desert",
    details:
      "The Thar Desert, also known as the Great Indian Desert, is a large arid region in the northwestern part of the Indian subcontinent that covers an area of 200,000 km² and forms a natural boundary between India and Pakistan. It is the world's 20th-largest desert, and the world's 9th-largest hot subtropical desert.",
  },
  {
    id: 5,
    photo: photo5,
    to: "Namib desert",
    details:
      "The Namib Desert is believed to be the world's oldest desert and it has been arid for at least 55 million years (Barnard 1998). The convergence of the Benguela upwelling and the hot interior have maintained, and perhaps increased this aridity in recent times, but they did not generate the aridity",
  },
  {
    id: 6,
    photo: photo6,
    to: "Atacama desert",
    details:
      "The Atacama Desert is the driest nonpolar desert in the world, as well as the only true desert to receive less precipitation than the polar deserts and the largest fog desert in the world. Both regions have been used as experimentation sites on Earth for Mars expeditionsimulations..",
  },
];

function App(props) {
  const navigate = useNavigate();
  const createPost = (val, to, det, photo) => {
    navigate("/CountrysideHotel", {
      state: {
        post_id: val,
        post_to: to,
        post_det: det,
        post_photo: photo,
      },
    });
  };
  return (
    <div>
      <Header user={true} />
      <Heading category="FEW DESTINATIONS FOR RURAL TOURISM IN INDIA" />
      <div>
        {countryside.map((x) => (
          <Components
            photo={x.photo}
            to={x.to}
            details={x.details}
            link="/CountrysideHotel"
            onClick={() => {
              createPost(x.id, x.to, x.details, x.photo);
            }}
          />
        ))}
      </div>
    </div>
  );
}
export default App;
