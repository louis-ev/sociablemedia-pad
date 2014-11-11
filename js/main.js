String.prototype.insertAt=function(index, string) {
  return this.substr(0, index) + string + this.substr(index);
}

$("document").ready( function() {

	$(".colonne").each( function(i) {

		var $this = $(this);

				// ajouter bouton edit
		$this.prepend( '<div class="edit"><img src="./img/edit.png" class="" width="32" height="32" /></div>');

		var indexCouleur = $this.html().indexOf("couleur : ");
		var thisCouleur = "#eee";

		if( indexCouleur > 0 ) {
			thisCouleur = $this.html().substring( indexCouleur );
			thisCouleur = thisCouleur.substring( 10, thisCouleur.indexOf("<") );
		}

		console.log( "couleur : " +  thisCouleur );

		$this.css("borderColor", thisCouleur );

		$this.find(".edit").css("backgroundColor", thisCouleur );

		// liens en couleur du projet
		$this.find("a").css("color", thisCouleur );

		var indexEquipe = $this.html().indexOf("équipe : ");

		if( indexEquipe >= 0 ) {

			thisEquipe = $this.html().substring( indexEquipe );
			thisEquipe = thisEquipe.substring( 9, thisEquipe.indexOf("<") );
			console.log( "equipe : " +  thisEquipe );

			$this.attr("data-team", thisEquipe );
			$this.css("borderColor", thisCouleur );

		}

		// code-folding
		function makeCodeFold( thisColonne, thisHtml ) {
/*
			var indexBeginCodeFold = thisHtml.indexOf("<p>{</p>");
			var indexEndCodeFold = thisHtml.indexOf("<p>}</p>");
		  var codeFoldContent = thisHtml.substring( indexBeginCodeFold, indexEndCodeFold );
			codeFoldContent = "<div>" + codeFoldContent + "</div>";
*/

 			while ( thisColonne.html().indexOf("<p>{</p>") >= 0 ) {

				var indexBeginCodeFold = thisHtml.indexOf("<p>{</p>");

				thisColonne.html( thisHtml.replace( "<p>{</p>", "" ).insertAt( indexBeginCodeFold, "<div class='textFold is-folded'>") );

				// updter thisHtml
				thisHtml = thisColonne.html();

				thisColonne.html( thisHtml.insertAt( thisHtml.indexOf("<p>}</p>") + 8, "</div>").replace( "<p>}</p>", "" ) );

			}

			thisColonne.find(".textFold").css("borderColor", thisCouleur );

		}

		makeCodeFold( $this, $this.html() );


		// masquer paramètres
		$this.find("p").each(function() {
			var parameters = $(this).find("i");
			if ( parameters.length > 0 ) {
				parameters.hide();
			} else {
				return false;
			}
		});

		setTimeout( function() {
			$this.removeClass("is-hidden");
		}, i*150);

		$this.find("h1").click( function() {
			$this.toggleClass("is-larger");
		});
		$this.find(".textFold *:first-child").on("click",function() {
			$(this).parent(".textFold").toggleClass("is-folded");
		});


	});








	$(".colonne .edit").on("click", function(e) {

		$this = $(this).parent(".colonne");


		if ( !$this.hasClass("is-editable") ) {

			var thisScript = $this.find("script").eq(0).attr("src").substring( 27, $this.find("script").eq(0).attr("src").indexOf(".js") );

			$this.html('<iframe id="hackpad-' + thisScript + '" src="https://socmed.hackpad.com/ep/api/embed-pad?padId=' + thisScript + '" style="border:0px;width:100%;height:100%;"></iframe>');

			$this.addClass( "is-editable" );

			window.addEventListener("message", function(event) {
				console.log(event);
				if (event.origin == "https://socmed.hackpad.com") {
					var args = event.data.split(":");
					if (args.length < 3 || args[0] != "hackpad-" + thisScript || args[1] != "height") {
						return;
					}
					var height = Number(args[2]) + 60; // 60 is non-ace elements offset
					var hp = document.getElementById("hackpad-" + thisScript );
					if (hp && height > 420) {
						hp.style.height = height + "px";
					}
				}
			}, false);

		}

		else {

/*
				var thisScript = $this.find("iframe").eq(0).attr("id").substring( 8 );

				$this.html('<iframe><script src="https://socmed.hackpad.com/' + thisScript + '.js?format=html"></script><noscript><div>View <a href="https://hackpad.com/' + thisScript + '">Untitled</a> on Hackpad.</div></noscript></iframe>');

				$this.removeClass( "is-editable" );
*/

		}
		});

});