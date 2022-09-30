$(document).ready(function () {
  const url='http://ad7a1eb0ffcb.0bc3c855.hbtn-cod.io:5001/api/v1/status'
  $.get(url, function (data) {
  if (data.status === 'OK') {
    $('div#api_status').addClass('available');
  } else {
    $('div#api_status').removeClass('available');
  }
})

  let amenityDict = {}

  $('input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      amenityDict[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenityDict[$(this).attr('data-id')];
    }
    $('.amenities h4').text(Object.values(amenityDict).join(', '));
  });
});
