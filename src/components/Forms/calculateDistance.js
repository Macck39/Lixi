export function calculateDistance (pickup,drop,directions){
    return new Promise((resolve, reject) => {
        // console.log("---^^^^^^^-------");

        // Calculate distance using the Google Maps Distance Matrix API
        
        const { pickupLat, pickupLng, dropLat, dropLng } = directions;

        if (window.google && window.google.maps && pickup && drop) {
            const origin = new window.google.maps.LatLng(pickupLat, pickupLng);
            const destination = new window.google.maps.LatLng(dropLat, dropLng);
            const service = new window.google.maps.DistanceMatrixService();
            service.getDistanceMatrix(
                {
                    origins: [origin],
                    destinations: [destination],
                    travelMode: "DRIVING",
                },
                (response, status) => {
                    // console.log(response);
                    if (    
                        status === "OK" &&
                        response.rows[0].elements[0].status === "OK"
                    ) {
                        const distance = response.rows[0].elements[0].distance.text;
                        // setFormData(updatedFormData);
                        resolve(distance);
                    } else {
                        reject("Error calculating distance");
                    }
                }
            );
        } else {
            reject("Error")
        }
    });
};


