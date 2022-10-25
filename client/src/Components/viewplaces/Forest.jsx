import React from "react";
import Heading from "./ViewplacesComponents/heading";
import "./style.css"
import Header from "../Navbar/Header"
import Components from "./ViewplacesComponents/PlacesComponent";
import photo1 from "./places/forest/Monteverde cloud Forest,costa rica 1.jpg"
import photo2 from "./places/forest/4. DAINTREE FOREST1.jpeg"
import photo3 from "./places/forest/Amazon Rainforest, Latin America1.webp"
import photo4 from "./places/forest/Bwindi Impenetrable Forest, Uganda1.webp"
import photo5 from "./places/forest/Arashiyama Bamboo Grove, Japan1.jpg"
import photo6 from "./places/forest/BALCK FOREST1.jpeg"

function App() {
    return (<div>
        <Header user={true} />
        <Heading category="Forest" />
        <Components photo={photo1} to="Monteverde Cloud Forest, Costa Rica" details="Costa Rica’s central highlands are always shrouded in mist, making any traveller feel as
                            though they have been transported to another world entirely. Dotted with exquisite cloud
                            forests, this biodiverse region is home to some of the most beautiful landscapes in the
                            world. Costa Rica’s forests are known for their elevated and verdant nature, and the country
                            is lucky enough to be home to six different cloud forest zones." rate="4" link="/placeshotel" />
        <Components photo={photo2} to="Daintree Rainforest, Australia" details="Listed as a UNESCO World Heritage Site in 1988, Northern Queensland’s Daintree Rainforest is
                            one of the most significant ecosystems in the world. This dense green jungle is so beautiful
                            that it was used as inspiration for the landscapes of blockbuster movie Avatar. For nature
                            lovers and adventure seekers alike, the Daintree Rainforest is Australia’s best kept secret.
                            Visitors can trek through dense jungle, soar through the forest canopy on a zip line or go
                            crocodile spotting along the Daintree River. Home to an incredible 122 rare and endangered
                            species, the Daintree Rainforest is a haven for wildlife enthusiasts." rate="4" link="/placeshotel" />
        <Components photo={photo3} to="Amazon Rainforest, Latin America" details="Verdant rainforest, isolated tribes and exotic wildlife; there are few people who haven’t
                            heard of the world famous Amazon rainforest. This vast natural phenomenon spans across an
                            incredible nine countries, so travellers are spoilt for choice. In Brazil, the river is at
                            its widest, often several kilometers across. The region’s dry land means the forest trees
                            are older and taller than that of the forest elsewhere in the Amazon." rate="4" link="/placeshotel" />
        <Components photo={photo4} to="Bwindi Impenetrable Forest, Uganda" details="World-renowned for its gorilla tracking opportunities, the Bwindi Impenetrable Forest in
                            Uganda is one of our favourite forests. Home to the highest concentration of primates on
                            earth, this forest is famed for its lush jungle and tropical wildlife. Around 10 habituated
                            gorilla families live in Bwindi National Park, and the journey you take to track them is
                            nothing short of adventurous. Suited to more daring travellers, Bwindi’s terrain is such
                            that you start your trek on high ground before descending into a valley and then tackling an
                            arduous climb. Slopes can often be steep and there are no trails, giving Bwindi its
                            impenetrable reputation." rate="4" link="/placeshotel" />
        <Components photo={photo5} to="Arashiyama Bamboo Grove, Japan" details="Located in Kyoto, the Arashiyama Bamboo Grove is one of Japan’s top sights for good reason.
                            As you venture along the path that cuts through the middle of the forest, you’ll feel as
                            though you’re walking into another universe. Soaring stalks of bamboo surround either side
                            of the path, and this forest is filled with many photo opportunities. These thick bamboo
                            stalks seem to continue endlessly in every direction, and a soft light fills the gaps
                            between the trees beautifully. The grove runs from outside the north gate of the charming
                            Tenryū-ji temple to the Ōkōchi Sansō villa, and is at its most atmospheric on the approach
                            to this villa." rate="4" link="/placeshotel" />
        <Components photo={photo6} to="Black Forest" details="The Black Forest is a mountainous region in southwest Germany, bordering France. Known for
                            its dense, evergreen forests and picturesque villages, it is often associated with the
                            Brothers Grimm fairy tales. It's renowned for its spas and the cuckoo clocks produced in the
                            region since the 1700s. The region’s largest town, Freiburg, is filled with Gothic buildings
                            and surrounded by vineyards." rate="4" link="/placeshotel" />

    </div>
    )
}
export default App;