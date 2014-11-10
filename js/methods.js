
/***************************************************************************************************/

/* parse query variables from the URL to decide which tag to load */
// - ?id=154
// - ?latest
// - ?random

 function parse_URL(){

    var tag_id = 161; // default = KATSU
    var matches = document.location.href.match(/id=(\d+)/);
    console.log(matches);
    if(matches && matches[1]){ tag_id = matches[1]; }
    else if(/latest/.test(document.location.href)){ tag_id = 'latest'; }
    else if(/random/.test(document.location.href)){ tag_id = 'random'; }

    // update our navigation controls
    document.getElementById("tag_id").innerHTML = tag_id;
    if(document.getElementById("link-"+tag_id)){ document.getElementById("link-"+tag_id).className = 'selected'; }

    // append the cust <script> tag
    var s=document.createElement('script');
    s.setAttribute('src','http://000000book.com/data/'+tag_id+'.json?callback=load_gml');
    document.getElementsByTagName('body')[0].appendChild(s);

}

/* SCROLL */
/***************************************************************************************************/

/* réagir au scroll */

$(window).scroll(function() {
    $('#balls').css('opacity', (1-$(window).scrollTop()/200));
});


/* scroller, avec une animation, vers le div dont l'id est idTitre */

var gotoByScroll = function (idTitre, margintop) {
    var letitre = $(".entry-content h3").filter(function(){ return $(this).attr('id').match(idTitre); });
    if ( $(window).width() >= 768 ) {
        $('html, body').animate({   scrollTop: letitre.offset().top - margintop }, 200, 'easeOutQuad');
    } else {
        $('html, body').animate({   scrollTop: letitre.offset().top }, 0);
    }
};


/* CANVAS */
/***************************************************************************************************/

/* charger les canvas PJS uniquement au survol */

$(document).ready(
	function() {
		$('#post-814 canvas').each( function() {
			$(this).hover(
				function() {
					var thisID = this.id;
					console.log(thisID);
					Processing.getInstanceById(thisID).loop();
				}, function() {
					var thisID = this.id;
					Processing.getInstanceById(thisID).noLoop();
				}
			);
		});
	}
);

/* ANIMATION */
/***************************************************************************************************/

/* jquery UI easing  */


/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration

$.easing.jswing = $.easing.swing;

$.extend($.easing,
{
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        //alert($.easing.default);
        return $.easing[$.easing.def](x, t, b, c, d);
    },
    easeInQuad: function (x, t, b, c, d) {
        return c*(t/=d)*t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c*(t/=d)*t*t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    },
    easeInQuart: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t + b;
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    easeInQuint: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t*t + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t*t*t + 1) + b;
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
        return c/2*((t-=2)*t*t*t*t + 2) + b;
    },
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t/d * (Math.PI/2)) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
        return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    },
    easeInExpo: function (x, t, b, c, d) {
        return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
        return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    },
    easeInElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
    },
    easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    easeInBounce: function (x, t, b, c, d) {
        return c - $.easing.easeOutBounce (x, d-t, 0, c, d) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
        } else {
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
        }
    },
    easeInOutBounce: function (x, t, b, c, d) {
        if (t < d/2) return $.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
        return $.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
    }
});


/***************************************************************************************************/

/* universal delayer from stackoverflow */

var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();

/***************************************************************************************************/

/* fadeout de la page au click */

function redirectPage() {
    window.location = linkLocation;
}

$('a').click(function(event) {
    if (this.href == "" || this.href == null) {
        event.preventDefault();
        return;
    }
    if ((this.href.indexOf("#") === -1) && (this.href.indexOf("mailto:") === -1) && (this.target !== "_blank")) {
        event.preventDefault();
        linkLocation = this.href;
        $("body").fadeOut(600, redirectPage);
    }
});


/***************************************************************************************************/

/* calcul de la distance entre une série de titres h3 et modwscrolltop (par exemple, window.pageYOffset) */

var titreProche = function (modwscrollTop) {
    var dist =0;
    var pDist=10000000000;
    var titreactif;
    //optimisation : stocker le numéro d'article plutôt que l'article : http://jsperf.com/jquery-each-this-vs-eq-index
    var numTitre;

    var $titres = $('.entry-content h3');
    $titres.each( function(index){
        dist = Math.abs(modwscrollTop - this.offsetTop);
        if(dist<pDist) {
            pDist = dist;
            numTitre = index;
        }
        dist = Math.abs(modwscrollTop - (this.offsetTop + this.offsetHeight));
        if(dist<pDist) {
            pDist = dist;
            numTitre = index;
        }
    });
    titreactif = $titres.eq(numTitre);
    return titreactif;
};

/***************************************************************************************************/

/* créer une navigation pour chaque titre d'un article */
/* détecter le titre le plus proche et lui donner la classe "active" */


var createtopnav = function() {
    var counter = 0;
    //console.log("createtopnav");
    $('.entry-content').before("<nav id='aside-right'><ul></ul></nav>");
    $('.main').addClass("sidenav");
    $('.entry-content h3').each( function() {
        var refcounter = 'ref'+counter++;
        $(this).attr('id', refcounter);
        $('#aside-right ul').append('<li><a data-goto="'+refcounter+'">'+$(this).text()+'</a></li>');
    });

    var titreVu = $('.entry-content h3');
    var margintop = $('.entry-content').offset().top - 6;

    titreVu.addClass("viewed");
    $("#aside-right li > a[data-goto=" + titreVu.attr("id") + "]").addClass("active");

    // ajouter la détection de titre
    $(window).on('scroll', function () {
        if ( $(window).width() >= 768 ) {
            var newTitreVu = titreProche(window.pageYOffset + margintop);
            if ( newTitreVu !== titreVu ) {
                margintop = $('.entry-content').offset().top - 6;
                titreVu.removeClass("viewed");
                $("#aside-right li > a[data-goto=" + titreVu.attr("id") + "]").removeClass("active");

                newTitreVu.addClass("viewed");
                $("#aside-right li > a[data-goto=" + newTitreVu.attr("id") + "]").addClass("active");

                titreVu = newTitreVu;
            }
        }
    });

    $('#aside-right a').click ( function(e) {
        e.preventDefault();
        var slideto = $(this).attr("data-goto");
        //console.log("slideto : " + slideto);
        gotoByScroll(slideto, margintop);
    });

};


