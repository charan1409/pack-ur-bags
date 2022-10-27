import React from "react";
import { useNavigate } from "react-router-dom";
import Heading from "./ViewplacesComponents/heading";
import "./style.css";
import Header from "../Navbar/Header";
import Components from "./ViewplacesComponents/PlacesComponent";
import photo1 from "./places/desert/SAHARA DESERT.jpeg";
import photo2 from "./places/desert/2. GOBI DESERT.jpeg";
import photo3 from "./places/desert/3. Kalahari desert.jpeg";
import photo4 from "./places/desert/Thar desert.jpeg";
import photo5 from "./places/desert/5. Namib desert.jpeg";
import photo6 from "./places/desert/6 . Atacama desert.jpeg";

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

function App() {
  const navigate = useNavigate();
  const createPost = (val, to, det, photo) => {
    navigate("/DesertHotel", {
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
        {Desert.map((x) => (
          <Components
            photo={x.photo}
            to={x.to}
            details={x.details}
            link="/DesertHotel"
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
