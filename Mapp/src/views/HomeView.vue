<script setup>
</script>

<template>
  
  <!-- <div id="map" class="col-lg-12"></div> -->
  <section>
      <h1 style="margin-left: 20px;">Location</h1>
      <p style="margin-left: 20px;">Rating ⭐⭐⭐⭐⭐</p>
      <p style="margin-left: 20px;">Description</p>
      <p style="margin-left: 20px;">This is my favourite location in my city</p>
  </section>
  <section>
      <img src="../assets/img/photo-1526679029800-3840612ca4ec.jpg" alt="brown wooden door open on restaurant" class="img-thumbnail">
  </section>
    
  
</template>

<script setup>
    // var map = L.map('map').setView([0,0], 1);

    // //osm layer
    // var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // });
    // osm.addTo(map);

    // if(!navigator.geolocation) {
    //     console.log("Your browser doesn't support geolocation feature!")
    // } else {
    //     setInterval(() => {
    //         navigator.geolocation.getCurrentPosition(getPosition)
    //     }, 2000);
    // }

    // var marker, circle;

    // function getPosition(position){
    //     // console.log(position)
    //     var lat = position.coords.latitude
    //     var long = position.coords.longitude
    //     var accuracy = position.coords.accuracy

    //     if(marker) {
    //         map.removeLayer(marker)
    //     }

    //     if(circle) {
    //         map.removeLayer(circle)
    //     }

    //     marker = L.marker([lat, long])

    //     circle = L.circle([lat, long], {radius: accuracy})

    //     var featureGroup = L.featureGroup([marker, circle]).addTo(map)
        
    //     //fit the map to the bounds
    //     //map.fitBounds(featureGroup.getBounds())

    //     // console.log("Your coordinate is: Lat: "+ lat +" Long: "+ long+ " Accuracy: "+ accuracy)
    // }
    // marker2=L.marker([0,0]).addTo(map);
</script>
