import React from "react";
import Header from "../Main/Header";
import '../Main/main.css';
import './PlacePage.css';

const Places = () => {
  return (
    <>
    <Header/>
    <div className="section">
      <div class="packages" id="packages">
        <h1 class="heading">
          <span>P</span>
          <span>A</span>
          <span>C</span>
          <span>K</span>
          <span>A</span>
          <span>G</span>
          <span>E</span>
          <span>S</span>
        </h1>

        <div class="box-container">
          <div class="box">
            <img src="/img/places/beach/blue-ocean-resort.jpg" alt="" />
            <div class="content">
              <h3>
                {" "}
                <i class="fas fa-map-marker-alt"></i> Blue Ocean{" "}
              </h3>
              <p>
                Located on the beach front, over the paradisiacal beaches of
                white sand and turquoise water of Bavaro, the Ocean Blue & Sand
                hotel boasts a complete structure perfectly integrated to its
                setting.
              </p>
              <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
              </div>
              <div class="price">
                {" "}
                ₹1000.00 <span>₹1200.00</span>{" "}
              </div>
              <a href="#d1" class="btn">
                visit
              </a>
            </div>
          </div>

          <div class="box">
            <img src="/img/places/beach/paradise.jpg" alt="" />
            <div class="content">
              <h3>
                {" "}
                <i class="fas fa-map-marker-alt"></i> Karnataka{" "}
              </h3>
              <p>
                The river cruises start from Tourist Jetty on Mandovi river in
                Panaji town on Old Panaji Road. Each cruise is triple decked and
                a lovely panoramic view of the city of Panjim.
              </p>
              <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
              </div>
              <div class="price">
                {" "}
                ₹1000.00 <span>₹1200.00</span>{" "}
              </div>
              <a href="#d2" class="btn">
                visit
              </a>
            </div>
          </div>

          <div class="box">
            <img src="/img/places/beach/radisson.jpg" alt="" />
            <div class="content">
              <h3>
                {" "}
                <i class="fas fa-map-marker-alt"></i> Manali{" "}
              </h3>
              <p>
                The top things to do in Himachal pradesh are Manali, Shimla,
                Mcleodganj, Dalhousie, Spiti, Kasol. You can see all the places
                to visit in Himachal pradesh here
              </p>
              <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
              </div>
              <div class="price">
                {" "}
                ₹1000.00 <span>₹1200.00</span>{" "}
              </div>
              <a href="#d3" class="btn">
                visit
              </a>
            </div>
          </div>

          <div class="box">
            <img src="/img/places/beach/cherai.jpg" alt="" />
            <div class="content">
              <h3>
                {" "}
                <i class="fas fa-map-marker-alt"></i> Cherai{" "}
              </h3>
              <p>
                Imagine a mix of everything that Cherai has to offer, the beach,
                the backwaters, the smell of the palm trees, the view of the
                tall coconut trees and the far-stretched paddy fields all at one
                place; Cherai Beach Resort is that very place!
              </p>
              <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
              </div>
              <div class="price">
                {" "}
                ₹1000.00 <span>₹1200.00</span>{" "}
              </div>
              <a href="#d4" class="btn">
                visit
              </a>
            </div>
          </div>

          <div class="box">
            <img src="/img/places/beach/barefoot.jpg" alt="" />
            <div class="content">
              <h3>
                {" "}
                <i class="fas fa-map-marker-alt"></i> Kodaikanal{" "}
              </h3>
              <p>
                Kodaikanal is a hill town in the southern Indian state of Tamil
                Nadu. It’s set in an area of granite cliffs, forested valleys,
                lakes, waterfalls and grassy hills.
              </p>
              <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
              </div>
              <div class="price">
                {" "}
                ₹1000.00 <span>₹1200.00</span>{" "}
              </div>
              <a href="#d5" class="btn">
                visit
              </a>
            </div>
          </div>

          <div class="box">
            <img src="/img/places/beach/taj_fisher.jpg" alt="" />
            <div class="content">
              <h3>
                {" "}
                <i class="fas fa-map-marker-alt"></i> Delhi{" "}
              </h3>
              <p>
                Delhi showcases an ancient culture and a rapidly modernising
                country. Dotted with monuments there is much to discover here.
              </p>
              <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
              </div>
              <div class="price">
                {" "}
                ₹1000.00 <span>₹1200.00</span>{" "}
              </div>
              <a href="#d6" class="btn">
                visit
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Places;
