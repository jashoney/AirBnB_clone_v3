$(document).ready(function () {
  $.ajax({
    url:'http://82583f63b2ad.baaeebfa.hbtn-cod.io:5001/api/v1/status',
    type: 'get',
    dataType: 'json'
  })
  .done((data, status) => {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
	$('div#api_status').removeClass('available');
    };
  });

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
