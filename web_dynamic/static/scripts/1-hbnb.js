$(document).ready(function () {
  let amenityDict = {}
  $('input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      amenityDict[(this).attr('amenity_id')] = $(this).attr('amenity_name')
    } else {
      delete amenityDict[(this).attr('amenity_id')]
    }
  });
  $(.amenities h4).text(Object.values(amenityDict).join(', '));
});
