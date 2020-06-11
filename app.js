const CARD_URL = `https://api.magicthegathering.io/v1/cards?pageSize=20`;

function fetchCardList(url) {
    $('.searching').addClass('active');
    fetch(`${CARD_URL}`)
    .then(function (result) {
        return result.json();
    })
    .then(function(cardList) {
        renderCardList(cardList.cards)
        $('.searching').removeClass('active');
        console.log(cardList.cards);
    })
    .catch( function (error) {
        console.error(error);
    });
    
}


function renderCard(card) {
    return $(`
    <div class="card">
        <h3>${card.name} - ${card.manaCost}</h3>
        <h4>${card.type}</h4>
        <h5 class="set-name">${card.set}</h5>
        <pre> ${card.text} </pre>
        ${ card.imageUrl ? `<img src="${card.imageU}">` : '' }
    </div>
    `).find('.set-name').data()
}


function renderCardList(cardList) {
    $('#results').empty();
    cardList.forEach(function (card) {
        $('#results').append(renderCard(card));
    })
}


$('#card-search').on('submit', function (event) {
    event.preventDefault();
    const cardName = $('#cname').val();
    const cardText = $('#ctext').val();
    // $('#cname, #ctext').trigger('reset');
    const SEARCH_URL = `${(CARD_URL)}${cardName ? `&name=${cardName}` : ''}${cardText ? `&name=${cardText}` : ''}`
    console.log(SEARCH_URL);
    fetchCardList(SEARCH_URL);
  });
  

  $('#results').on('click', '.card .set-name', function () {
    const setName = $(this).closest('.set-name');
    const RESULTS_URL = `${(CARD_URL)}&set=${setName}`;
    fetchCardList(RESULTS_URL);
  });