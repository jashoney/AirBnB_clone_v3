$(document).ready(function () {
  const url='http://' + location.hostname + ':5001/api/v1/status/';
  $.get(url, function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

function getUsername (userId) {
  const url='http://' + location.hostname + ':5001/api/v1/users/' + userId;
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

  const places_url='http://' + location.hostname + ':5001/api/v1/places_search/';
  $.ajax({
    url: places_url,
    type: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: '{}',
    success: function (places) {
      for (const place of places) {
        const name = place.name;
        const price = place.price_by_night;
        const max_guest = place.max_guest;
        const number_rooms = place.number_rooms;
        const number_bathrooms = place.number_bathrooms;
        const owner = getUsername(place.user_id);
        console.log(owner);
        console.log(place.user_id);
        const description = place.description;
        const place_Html = `
          <article>
            <div class="title_box">
              <h2>${name}</h2>
              <div class="price_by_night">$${price}</div>
            </div>
            <div class="information">
              <div class="max_guest">${max_guest} ${max_guest > 1 ? 'Guests' : 'Guest'}</div>
              <div class="number_rooms">${number_rooms} ${number_rooms > 1 ? 'Bedrooms' : 'Bedroom'}</div>
              <div class="number_bathrooms">${number_bathrooms} ${number_bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}</div>
            </div>
            <div class="user">
              <b>Owner:</b> ${owner}
            </div>
            <div class="description">${description}</div>
          </article>
        `;
        $('section.places').append(place_Html);
      }
    }
  });

  let amenityDict = {}
  $('input:checkbox').change (function () {
    if ($(this).is(':checked')) {
      amenityDict[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenityDict[$(this).attr('data-id')];
    }
    $('.amenities h4').text(Object.values(amenityDict).join(', '));
  });
});
