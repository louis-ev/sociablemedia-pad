String.prototype.insertAt=function(index, string) {
  return this.substr(0, index) + string + this.substr(index);
}

function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}

$("document").ready( function() {

	window.addEventListener("message", function(event) {
		console.log("windowMessage");
	});

	var teamMember = getUrlParameter('team');

	$(".colonne").each( function(i) {

		var $this = $(this);

				// ajouter bouton edit
		$this.prepend( '<div class="edit"><img src="./img/edit.png" class="" width="32" height="32" /></div>');

		var indexCouleur = $this.text().indexOf("<couleur=");
		var thisCouleur = "#eee";
		console.log( "indexCouleur : " +  indexCouleur );

		if( indexCouleur >= 0 ) {
			thisCouleur = $this.text().substring( indexCouleur );
			console.log( "thisCouleur : " +  thisCouleur );
			thisCouleur = "#" + thisCouleur.substring( 9, thisCouleur.indexOf(">") );
			console.log( "thisCouleur : " +  thisCouleur );
		}


		$this.css("borderColor", thisCouleur );

		$this.find(".edit").css("backgroundColor", thisCouleur );

		/*****************************************************
			lien en couleur, team name
		******************************************************/

		$this.find("a").css("color", thisCouleur );

		var indexEquipe = $this.text().indexOf("<équipe=");

		if( indexEquipe >= 0 ) {
			thisEquipe = $this.text().substring( indexEquipe );
			thisEquipe = thisEquipe.substring( 8, thisEquipe.indexOf(">") );
			console.log( "thisEquipe : " +  thisEquipe );

			$this.attr("data-team", thisEquipe );
			$this.css("borderColor", thisCouleur );

		}

		/*****************************************************
			changer l'ordre
		******************************************************/

		var indexOrdre = $this.text().indexOf("<ordre=");

		if( indexOrdre >= 0 ) {
			thisOrdre = $this.text().substring( indexOrdre );
			thisOrdre = thisOrdre.substring( 7, thisOrdre.indexOf(">") );
			console.log( "thisOrdre : " +  thisOrdre );

			$this.css("-webkit-order", thisOrdre );
			$this.css("-moz-order", thisOrdre );
			$this.css("order", thisOrdre );

		}


		/*****************************************************
			code-folding
		******************************************************/

		function makeCodeFold( thisColonne, thisHtml ) {

			thisColonne.html(function(index,html){
			    return html.replace(/<p>{<\/p>/g, "<div class='textFold is-folded'>");
			});
			thisColonne.html(function(index,html){
			    return html.replace(/<p>}<\/p>/g, "</div>");
			});

			thisColonne.find(".textFold").css("borderColor", thisCouleur );

		}

		makeCodeFold( $this, $this.html() );

		/*****************************************************
			masquer les-dits paramètres
		******************************************************/

		$this.find("p").each(function() {
			var parameters = $(this).find("i");
			if ( parameters.length > 0 ) {
				parameters.hide();
			} else {
				return false;
			}
		});

		/*****************************************************
			URL : membres d'équipe
		******************************************************/


		if ( teamMember !== '' && teamMember !== undefined ) {
			if ( indexEquipe >= 0 ) {
				var members = $this.attr("data-team").split(',');
		    for (var i = 0; i < members.length; i++) {
					if( members[i].trim().toLowerCase() === teamMember.toLowerCase() ) {
						$this.removeClass("is-hidden");
					}
				}
			}
		} else {
			setTimeout( function() {
				$this.removeClass("is-hidden");
			}, 100);
		}


		$this.find("h1").click( function() {
			$this.toggleClass("is-larger");
		});
		$this.find(".textFold *:first-child").on("click",function() {
			$(this).parent(".textFold").toggleClass("is-folded");
		});

		console.log("-----");

	});














	$(".tooltip .button").on("click", function(e) {
		$(".tooltip").toggleClass("is-closed");
	});




	$(".colonne .edit").on("click", function(e) {

		$this = $(this).parent(".colonne");


		if ( !$this.hasClass("is-editable") ) {

			var thisScriptSrc = $this.find("script").eq(0).attr("src");

			var thisScriptID = thisScriptSrc.substring( thisScriptSrc.lastIndexOf("\/") + 1, thisScriptSrc.indexOf(".js") );
			var workspaceLocation = thisScriptSrc.substring( 0, thisScriptSrc.lastIndexOf("\/") );

			$thisEdit = $this.find(".edit");
			$thisEdit.nextAll().remove()
			$thisEdit.after('<iframe id="hackpad-' + thisScriptID + '" src="' + workspaceLocation + '/ep/api/embed-pad?padId=' + thisScriptID + '" style="border:0px;width:100%;height:100%;"></iframe>');

			$this.addClass( "is-editable" );

			window.addEventListener("message", function(event) {
				console.log(event);
				if (event.origin == workspaceLocation) {
					var args = event.data.split(":");
					if (args.length < 3 || args[0] != "hackpad-" + thisScriptID || args[1] != "height") {
						return;
					}
					var height = Number(args[2]) + 60; // 60 is non-ace elements offset
					var hp = document.getElementById("hackpad-" + thisScriptID );
					if (hp && height > 420) {
						hp.style.height = height + "px";
					}
				}
			}, false);

		}

		else {

/*
				var thisScript = $this.find("iframe").eq(0).attr("id").substring( 8 );
				console.log("thisScript : " + thisScript );

				$this.html('<iframe src="https://socmed2.hackpad.com/' + thisScript + '.js?format=html" sandbox="allow-same-origin allow-scripts"><div></div></iframe>');
*/

//				$this.removeClass( "is-editable" );

			window.location.reload();

		}
		});

});