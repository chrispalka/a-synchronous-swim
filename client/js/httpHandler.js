(function() {

  const serverUrl = 'http://127.0.0.1:3000';
  const swimFetcher = (data) => {
    $.ajax({
      type: 'GET',
      url: `${serverUrl}/random`,
      success: (data) => {
        //console.log server response
        console.log('Data from swimFetcher: ', data);
        SwimTeam.move(data);
      }
    })
  }

  // setInterval(swimFetcher, 3000);

  const backgroundFetcher = (data) => {
    $.ajax({
      type: 'GET',
      url: `${serverUrl}/background.jpg`,
      success: (data) => {
        //console.log server response
        console.log('Data from backgroundFetcher: ', data);

      }
    })
  }

  backgroundFetcher();

  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {  //note upload spelled wrong
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: 'FILL_ME_IN',
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);
  });

})();


//Scrap

  //setInterval(swimFetcher, 3000);

  // const swimSender = (direction) => {
  //   $.ajax({
  //     type: 'POST',
  //     url: `${serverUrl}/move`,
  //     data: JSON.stringify(direction),
  //     success: (data) => {
  //       console.log('Data from swimSender: ', data);
  //     }
  //   })
  // }

  // swimSender('up');
  // swimSender('right');