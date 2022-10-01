$(document).ready(function () {
  const url = 'http://' + window.location.hostname + ':5001/api/v1/status/';
  $.get(url, function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  function getUsername (userId) {
    const url = 'http://' + window.location.hostname + ':5001/api/v1/users/' + userId;
    let userName = '';
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      async: false,
      success: function (response) {
        userName = response.first_name + ' ' + response.last_name;
      }
    });
    return userName;
  }

  const amenityDict = {};
  $('input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      amenityDict[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenityDict[$(this).attr('data-id')];
    }
    $('.amenities h4').text(Object.values(amenityDict).join(', '));
  });

  getPlaces(Object.keys(amenityDict));

  function getPlaces (amenityIds) {
    let data = '{}';
    if (amenityIds.length > 0) {
      data = JSON.stringify({ amenities: amenityIds });
    }
    const placesUrl = 'http://' + window.location.hostname + ':5001/api/v1/places_search/';
    $.ajax({
      url: placesUrl,
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: data,
      success: function (places) {
        $('section.places').empty();
        for (const place of places) {
          const name = place.name;
          const price = place.price_by_night;
          const maxGuest = place.max_guest;
          const numberRooms = place.number_rooms;
          const numberBathrooms = place.number_bathrooms;
          const owner = getUsername(place.user_id);
          const description = place.description;
          const placeHtml = `
            <article>
              <div class="title_box">
                <h2>${name}</h2>
                <div class="price_by_night">$${price}</div>
              </div>
              <div class="information">
                <div class="max_guest">${maxGuest} ${maxGuest > 1 ? 'Guests' : 'Guest'}</div>
                <div class="number_rooms">${numberRooms} ${numberRooms > 1 ? 'Bedrooms' : 'Bedroom'}</div>
                <div class="number_bathrooms">${numberBathrooms} ${numberBathrooms > 1 ? 'Bathrooms' : 'Bathroom'}</div>
              </div>
              <div class="user">
                <b>Owner:</b> ${owner}
              </div>
              <div class="description">${description}</div>
            </article>
          `;
          $('section.places').append(placeHtml);
        }
      }
    });
  }
  $('button').click(function () {
    getPlaces(Object.keys(amenityDict));
  });
});
