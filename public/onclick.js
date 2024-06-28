function CardClicked(e){
    cid = e.getAttribute('data-id')
    $.ajax({
        url: "/decks/new",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({cardId: cid}),
        success: function(result){
            console.log("success");
            $("#selectedCard").html(result.html);
        }
    })
    //console.log(JSON.stringify(cid));
    //console.log(id);
}