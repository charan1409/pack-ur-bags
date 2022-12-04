import beaches_photo1 from "./Components/viewplaces/places/beach/blue-ocean-resort.jpg";
import beaches_photo2 from "./Components/viewplaces/places/beach/paradise.jpg";
import beaches_photo3 from "./Components/viewplaces/places/beach/radisson.jpg";
import beaches_photo4 from "./Components/viewplaces/places/beach/cherai.jpg";
import beaches_photo5 from "./Components/viewplaces/places/beach/barefoot.jpg";
import beaches_photo6 from "./Components/viewplaces/places/beach/taj_fisher.jpg";

import countryside_photo1 from "./Components/viewplaces/places/countryside/puthur.jpg";
import countryside_photo2 from "./Components/viewplaces/places/countryside/thert.jpg";
import countryside_photo3 from "./Components/viewplaces/places/countryside/shyam gaon.jpg";
import countryside_photo4 from "./Components/viewplaces/places/countryside/chitrakote.jpg";
import countryside_photo5 from "./Components/viewplaces/places/countryside/lachen.jpg";
import countryside_photo6 from "./Components/viewplaces/places/countryside/hodka.jpg";

import cultural_photo1 from "./Components/viewplaces/places/cultural/goldentemp.jpg";
import cultural_photo2 from "./Components/viewplaces/places/cultural/hampi.jpg";
import cultural_photo3 from "./Components/viewplaces/places/cultural/lucknow.jpg";
import cultural_photo4 from "./Components/viewplaces/places/cultural/kolkata.jpg";
import cultural_photo5 from "./Components/viewplaces/places/cultural/kerala.jpg";
import cultural_photo6 from "./Components/viewplaces/places/cultural/hyd.jpg";

import desert_photo1 from "./Components/viewplaces/places/desert/SAHARA DESERT.jpeg";
import desert_photo2 from "./Components/viewplaces/places/desert/2. GOBI DESERT.jpeg";
import desert_photo3 from "./Components/viewplaces/places/desert/3. Kalahari desert.jpeg";
import desert_photo4 from "./Components/viewplaces/places/desert/Thar desert.jpeg";
import desert_photo5 from "./Components/viewplaces/places/desert/5. Namib desert.jpeg";
import desert_photo6 from "./Components/viewplaces/places/desert/6 . Atacama desert.jpeg";

import forest_photo1 from "./Components/viewplaces/places/forest/Monteverde cloud Forest,costa rica 1.jpg";
import forest_photo2 from "./Components/viewplaces/places/forest/4. DAINTREE FOREST1.jpeg";
import forest_photo3 from "./Components/viewplaces/places/forest/Amazon Rainforest, Latin America1.webp";
import forest_photo4 from "./Components/viewplaces/places/forest/Bwindi Impenetrable Forest, Uganda1.webp";
import forest_photo5 from "./Components/viewplaces/places/forest/Arashiyama Bamboo Grove, Japan1.jpg";
import forest_photo6 from "./Components/viewplaces/places/forest/BALCK FOREST1.jpeg";

const data = [
  {
    path: "Beaches",
    place: [
      {
        id: 1,
        photo: beaches_photo1,
        to: "Blue Ocean",
        details:
          "Located on the beach front, over the paradisiacal beaches of white sand and turquoise water of Bavaro, the Ocean Blue & Sand hotel boasts a complete structure perfectly integrated to its setting.",
      },
      {
        id: 2,
        photo: beaches_photo2,
        to: "Mangalore",
        details:
          "The river cruises start from Tourist Jetty on Mandovi river in Panaji town on Old Panaji Road. Each cruise is triple decked and a lovely panoramic view of the city of Panjim.",
      },
      {
        id: 3,
        photo: beaches_photo3,
        to: "Manali",
        details:
          "The top things to do in Himachal pradesh are Manali, Shimla, Mcleodganj, Dalhousie, Spiti,Kasol.You can see all the places to visit in Himachal pradesh here",
      },
      {
        id: 4,
        photo: beaches_photo4,
        to: "Cherai",
        details:
          "Imagine a mix of everything that Cherai has to offer, the beach, the backwaters, the smell of the palm trees, the view of the tall coconut trees and the far-stretched paddy fields all at one place; Cherai Beach Resort is that very place!",
      },
      {
        id: 5,
        photo: beaches_photo5,
        to: "Kodaikanal",
        details:
          "Kodaikanal is a hill town in the southern Indian state of Tamil Nadu. It’s set in an area of granite cliffs, forested valleys, lakes, waterfalls and grassy hills.",
      },
      {
        id: 6,
        photo: beaches_photo6,
        to: "Delhi",
        details:
          "Delhi showcases an ancient culture and a rapidly modernising country. Dotted with monuments there is much to discover here.",
      },
    ],
  },
  {
    path: "Countryside",
    place: [
      {
        id: 1,
        photo: countryside_photo1,
        to: "Puttur, Andhra Pradesh",
        details:
          "This small village in Andhra Pradesh is popular for its agriculture, mangroves and the prominent silk business.",
      },
      {
        id: 2,
        photo: countryside_photo2,
        to: "Theerthamalai, Tamil Nadu",
        details:
          "The name of the village translates to mean ‘The Hill of holy Water' and has a temple that dates back to the 7th century. Enjoy the calm and quiet that only such villages can provide.",
      },
      {
        id: 3,
        photo: countryside_photo3,
        to: "Shyam Gaon, Assam",
        details:
          "The small Buddhist locality in Jorhat district known as Shyam Gaon can provide an interesting rural journey in Assam.",
      },
      {
        id: 4,
        photo: countryside_photo4,
        to: "Chitrakote, Chhattisgarh",
        details:
          "Popular for the folk arts and handicrafts that are made in the village, Chitrakote is also popular for the Chitrakoot waterfalls.",
      },
      {
        id: 5,
        photo: countryside_photo5,
        to: "Lachen, Sikkim",
        details:
          "This is a small village that is set against a backdrop of snow-capped mountains and conifer trees.",
      },
      {
        id: 6,
        photo: countryside_photo6,
        to: "Hodka, Gujarat",
        details:
          "The village located in the Kutch or Kachchh district of Gujarat is a beautiful place that has a mix of both the desert of clay and sand that makes the region so unique.",
      },
    ],
  },
  {
    path: "Cultural",
    place: [
      {
        id: 1,
        photo: cultural_photo1,
        to: "Amritsar: The Golden City",
        details:
          "Amritsar is undoubtedly the heart of the Sikh culture in the country where Golden temple is located.Amritsar has many gurudwaras, museums and cultural places that make it one of the best places to experience the Sikh culture.",
      },
      {
        id: 2,
        photo: cultural_photo2,
        to: "Hampi: Ancient Kingdom Of Vijaynagar",
        details:
          "Hampi is a UNESCO world heritage site situated at the Northern part of Karnataka.This place is famous for Virupaksha temple and holding the ruins of the ancient kingdom of Vijaynagar.",
      },
      {
        id: 3,
        photo: cultural_photo3,
        to: "Lucknow: The City Of The Nawabs",
        details:
          "With an architecture that is heavily influenced by the Mughals, the Delhi Sultanate, the Nawabs of Awadh and the British, you can imagine how magnificent the heritage and culture of Lucknow is.",
      },
      {
        id: 4,
        photo: cultural_photo4,
        to: "Kolkata: The City Of Joy",
        details:
          "From the influence of the Nawabs of Bengal to the cultures set by the East India Company, the city of Kolkata has witnessed a tremendous cultural shift and emerged to have one of the most notable literary-rich crowd.Victoria Memorial, Howrah Bridge, Indian Museum, and St. Paul’s Cathedral are the most prominent tourist places in Kolkata.",
      },
      {
        id: 5,
        photo: cultural_photo5,
        to: "Kerala: God’s Own Country",
        details:
          "The diverse culture of Kerala is a blend of Aryan & Dravidian cultures, with influences drawn time-and-again from other Indian & international places. Hinduism, Islam, and Christianity have contributed majorly to the architecture, the rituals & customs, the performing arts, and the festivals of Kerala.",
      },
      {
        id: 6,
        photo: cultural_photo6,
        to: "Hyderabad: The City Of Nizams",
        details:
          "Hyderabad, established in 1591 was ruled by Sultans, Mughals, & Nizams before becoming a Princely State under the British Raj. The region was previously under the ancient kingdoms of Chalukyas and Kakatiyas. The city’s architecture is richly influenced by all these cultures.",
      },
    ],
  },
  {
    path: "Desert",
    place: [
      {
        id: 1,
        photo: desert_photo1,
        to: "Sahara desert",
        details:
          "The Sahara is a desert on the African continent. With an area of 9,200,000 square kilometres, it is the largest hot desert in the world and the third largest desert overall, smaller only than the deserts of Antarctica and the northern Arctic.",
      },
      {
        id: 2,
        photo: desert_photo2,
        to: "Gobi Desert",
        details:
          "The Gobi Desert is a vast, arid region in northern China and southern Mongolia. It's known for its dunes, mountains and rare animals such as snow leopards and Bactrian camels. In the Gobi Gurvansaikhan National Park, the Khongoryn Els sand dunes are said to sing when the wind blows. The park also features…",
      },
      {
        id: 3,
        photo: desert_photo3,
        to: "Kalahari desert",
        details:
          "The Kalahari Desert is a large semi-arid sandy savanna in Southern Africa extending for 900,000 square kilometres, covering much of Botswana, and parts of Namibia and South Africa.",
      },
      {
        id: 4,
        photo: desert_photo4,
        to: "Thar desert",
        details:
          "The Thar Desert, also known as the Great Indian Desert, is a large arid region in the northwestern part of the Indian subcontinent that covers an area of 200,000 km² and forms a natural boundary between India and Pakistan. It is the world's 20th-largest desert, and the world's 9th-largest hot subtropical desert.",
      },
      {
        id: 5,
        photo: desert_photo5,
        to: "Namib desert",
        details:
          "The Namib Desert is believed to be the world's oldest desert and it has been arid for at least 55 million years (Barnard 1998). The convergence of the Benguela upwelling and the hot interior have maintained, and perhaps increased this aridity in recent times, but they did not generate the aridity",
      },
      {
        id: 6,
        photo: desert_photo6,
        to: "Atacama desert",
        details:
          "The Atacama Desert is the driest nonpolar desert in the world, as well as the only true desert to receive less precipitation than the polar deserts and the largest fog desert in the world. Both regions have been used as experimentation sites on Earth for Mars expeditionsimulations..",
      },
    ],
  },
  {
    path: "Forest",
    place: [
      {
        id: 1,
        photo: forest_photo1,
        to: "Monteverde Cloud Forest, Costa Rica",
        details:
          "Costa Rica’s central highlands are always shrouded in mist, making any traveller feel as though they have been transported to another world entirely. Dotted with exquisite cloud forests, this biodiverse region is home to some of the most beautiful landscapes in the world. Costa Rica’s forests are known for their elevated and verdant nature, and the country is lucky enough to be home to six different cloud forest zones.",
      },
      {
        id: 2,
        photo: forest_photo2,
        to: "Daintree Rainforest, Australia",
        details:
          "Listed as a UNESCO World Heritage Site in 1988, Northern Queensland’s Daintree Rainforest is one of the most significant ecosystems in the world. This dense green jungle is so beautiful that it was used as inspiration for the landscapes of blockbuster movie Avatar. For nature lovers and adventure seekers alike, the Daintree Rainforest is Australia’s best kept secret. Visitors can trek through dense jungle, soar through the forest canopy on a zip line or go crocodile spotting along the Daintree River. Home to an incredible 122 rare and endangered species, the Daintree Rainforest is a haven for wildlife enthusiasts.",
      },
      {
        id: 3,
        photo: forest_photo3,
        to: "Amazon Rainforest, Latin America",
        details:
          "Verdant rainforest, isolated tribes and exotic wildlife; there are few people who haven’t heard of the world famous Amazon rainforest. This vast natural phenomenon spans across an incredible nine countries, so travellers are spoilt for choice. In Brazil, the river is at its widest, often several kilometers across. The region’s dry land means the forest trees are older and taller than that of the forest elsewhere in the Amazon.",
      },
      {
        id: 4,
        photo: forest_photo4,
        to: "Bwindi Impenetrable Forest, Uganda",
        details:
          "World-renowned for its gorilla tracking opportunities, the Bwindi Impenetrable Forest in Uganda is one of our favourite forests. Home to the highest concentration of primates on earth, this forest is famed for its lush jungle and tropical wildlife. Around 10 habituated gorilla families live in Bwindi National Park, and the journey you take to track them is nothing short of adventurous. Suited to more daring travellers, Bwindi’s terrain is such that you start your trek on high ground before descending into a valley and then tackling an arduous climb. Slopes can often be steep and there are no trails, giving Bwindi its impenetrable reputation.",
      },
      {
        id: 5,
        photo: forest_photo5,
        to: "Arashiyama Bamboo Grove, Japan",
        details:
          "Located in Kyoto, the Arashiyama Bamboo Grove is one of Japan’s top sights for good reason. As you venture along the path that cuts through the middle of the forest, you’ll feel as though you’re walking into another universe. Soaring stalks of bamboo surround either side of the path, and this forest is filled with many photo opportunities. These thick bamboo stalks seem to continue endlessly in every direction, and a soft light fills the gaps between the trees beautifully. The grove runs from outside the north gate of the charming Tenryū-ji temple to the Ōkōchi Sansō villa, and is at its most atmospheric on the approach to this villa.",
      },
      {
        id: 6,
        photo: forest_photo6,
        to: "Black Forest",
        details:
          "The Black Forest is a mountainous region in southwest Germany, bordering France. Known for its dense, evergreen forests and picturesque villages, it is often associated with the Brothers Grimm fairy tales. It's renowned for its spas and the cuckoo clocks produced in the region since the 1700s. The region’s largest town, Freiburg, is filled with Gothic buildings and surrounded by vineyards.",
      },
    ],
  },
  {
    path: "Island",
    place: [
      {
        id: 1,
        photo: beaches_photo1,
        to: "Blue Ocean",
        details:
          "Located on the beach front, over the paradisiacal beaches of white sand and turquoise water of Bavaro, the Ocean Blue & Sand hotel boasts a complete structure perfectly integrated to its setting.",
      },
      {
        id: 2,
        photo: beaches_photo2,
        to: "Mangalore",
        details:
          "The river cruises start from Tourist Jetty on Mandovi river in Panaji town on Old Panaji Road. Each cruise is triple decked and a lovely panoramic view of the city of Panjim.",
      },
      {
        id: 3,
        photo: beaches_photo3,
        to: "Manali",
        details:
          "The top things to do in Himachal pradesh are Manali, Shimla, Mcleodganj, Dalhousie, Spiti,Kasol.You can see all the places to visit in Himachal pradesh here",
      },
      {
        id: 4,
        photo: beaches_photo4,
        to: "Cherai",
        details:
          "Imagine a mix of everything that Cherai has to offer, the beach, the backwaters, the smell of the palm trees, the view of the tall coconut trees and the far-stretched paddy fields all at one place; Cherai Beach Resort is that very place!",
      },
      {
        id: 5,
        photo: beaches_photo5,
        to: "Kodaikanal",
        details:
          "Kodaikanal is a hill town in the southern Indian state of Tamil Nadu. It’s set in an area of granite cliffs, forested valleys, lakes, waterfalls and grassy hills.",
      },
      {
        id: 6,
        photo: beaches_photo6,
        to: "Delhi",
        details:
          "Delhi showcases an ancient culture and a rapidly modernising country. Dotted with monuments there is much to discover here.",
      },
    ],
  },
  {
    path: "Hillstation",
    place: [
      {
        id: 1,
        photo: countryside_photo1,
        to: "Puttur, Andhra Pradesh",
        details:
          "This small village in Andhra Pradesh is popular for its agriculture, mangroves and the prominent silk business.",
      },
      {
        id: 2,
        photo: countryside_photo2,
        to: "Theerthamalai, Tamil Nadu",
        details:
          "The name of the village translates to mean ‘The Hill of holy Water' and has a temple that dates back to the 7th century. Enjoy the calm and quiet that only such villages can provide.",
      },
      {
        id: 3,
        photo: countryside_photo3,
        to: "Shyam Gaon, Assam",
        details:
          "The small Buddhist locality in Jorhat district known as Shyam Gaon can provide an interesting rural journey in Assam.",
      },
      {
        id: 4,
        photo: countryside_photo4,
        to: "Chitrakote, Chhattisgarh",
        details:
          "Popular for the folk arts and handicrafts that are made in the village, Chitrakote is also popular for the Chitrakoot waterfalls.",
      },
      {
        id: 5,
        photo: countryside_photo5,
        to: "Lachen, Sikkim",
        details:
          "This is a small village that is set against a backdrop of snow-capped mountains and conifer trees.",
      },
      {
        id: 6,
        photo: countryside_photo6,
        to: "Hodka, Gujarat",
        details:
          "The village located in the Kutch or Kachchh district of Gujarat is a beautiful place that has a mix of both the desert of clay and sand that makes the region so unique.",
      },
    ],
  },
  {
    path: "Winter",
    place: [
      {
        id: 1,
        photo: cultural_photo1,
        to: "Amritsar: The Golden City",
        details:
          "Amritsar is undoubtedly the heart of the Sikh culture in the country where Golden temple is located.Amritsar has many gurudwaras, museums and cultural places that make it one of the best places to experience the Sikh culture.",
      },
      {
        id: 2,
        photo: cultural_photo2,
        to: "Hampi: Ancient Kingdom Of Vijaynagar",
        details:
          "Hampi is a UNESCO world heritage site situated at the Northern part of Karnataka.This place is famous for Virupaksha temple and holding the ruins of the ancient kingdom of Vijaynagar.",
      },
      {
        id: 3,
        photo: cultural_photo3,
        to: "Lucknow: The City Of The Nawabs",
        details:
          "With an architecture that is heavily influenced by the Mughals, the Delhi Sultanate, the Nawabs of Awadh and the British, you can imagine how magnificent the heritage and culture of Lucknow is.",
      },
      {
        id: 4,
        photo: cultural_photo4,
        to: "Kolkata: The City Of Joy",
        details:
          "From the influence of the Nawabs of Bengal to the cultures set by the East India Company, the city of Kolkata has witnessed a tremendous cultural shift and emerged to have one of the most notable literary-rich crowd.Victoria Memorial, Howrah Bridge, Indian Museum, and St. Paul’s Cathedral are the most prominent tourist places in Kolkata.",
      },
      {
        id: 5,
        photo: cultural_photo5,
        to: "Kerala: God’s Own Country",
        details:
          "The diverse culture of Kerala is a blend of Aryan & Dravidian cultures, with influences drawn time-and-again from other Indian & international places. Hinduism, Islam, and Christianity have contributed majorly to the architecture, the rituals & customs, the performing arts, and the festivals of Kerala.",
      },
      {
        id: 6,
        photo: cultural_photo6,
        to: "Hyderabad: The City Of Nizams",
        details:
          "Hyderabad, established in 1591 was ruled by Sultans, Mughals, & Nizams before becoming a Princely State under the British Raj. The region was previously under the ancient kingdoms of Chalukyas and Kakatiyas. The city’s architecture is richly influenced by all these cultures.",
      },
    ],
  },
];
export default data;
