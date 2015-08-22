var typeset = require('../src/index');

var expect = require('chai').expect;

describe('Typeset', function() {

  it('should process a complex text', function() {
    var html = '<p>Yjarni Sigurðardóttir spoke to NATO from Iceland yesterday: "Light of my  life, fire of my florins -- my sin, my soul. The tip of the tongue taking a trip to 118° 19\' 43.5"."</p>' +
            '<p>"She\'s faster than a 120\' 4" whale." <em>Piña co­ladas</em> were widely consumed in Götterdämmerung from 1880–1912. For the low price of $20 / year from Ex­hi­bits A–E... Then the <em>duplex</em> came forward. "Thrice the tower, he mounted the round gunrest, \'awaking\' HTML. He can print a fixed num­ber of dots in a square inch (for in­stance, 600 × 600)."</p>';

    expect(typeset(html)).to.equal('<p><span class="pull-Y">Y</span>jarni Sigurðardót­tir spoke to <span class="small-caps">NATO</span> from Ice­land yes­ter­day:<span class="push-double"></span> <span class="pull-double">“</span>Light<span class="push-o"></span> <span class="pull-o">o</span>f my  life, ﬁre<span class="push-o"></span> <span class="pull-o">o</span>f my ﬂorins&thinsp;&mdash;&thinsp;my sin, my soul.<span class="push-T"></span> <span class="pull-T">T</span>he tip<span class="push-o"></span> <span class="pull-o">o</span>f the tongue tak­ing a trip to 118° 19′ 43.5″.”</p><p><span class="pull-double">“</span>She’s faster than a 120′ 4″<span class="push-w"></span> <span class="pull-w">w</span>hale.” <em>Piña<span class="push-c"></span> <span class="pull-c">c</span>o­ladas</em> <span class="pull-w">w</span>ere<span class="push-w"></span> <span class="pull-w">w</span>idely<span class="push-c"></span> <span class="pull-c">c</span>on­sumed in Göt­ter­däm­merung from 1880–1912. For the low price<span class="push-o"></span> <span class="pull-o">o</span>f $20 / year from Ex­hi­bits<span class="push-A"></span> <span class="pull-A">A</span>–E…<span class="push-T"></span> <span class="pull-T">T</span>hen the <em>du­plex</em> <span class="pull-c">c</span>ame for­ward.<span class="push-double"></span> <span class="pull-double">“</span>Thrice the tower, he mounted the round gun­rest,<span class="push-single"></span> <span class="pull-single">‘</span>awak­ing’ <span class="small-caps">HTML</span>. He<span class="push-c"></span> <span class="pull-c">c</span>an print a ﬁxed num­ber<span class="push-o"></span> <span class="pull-o">o</span>f dots in a square inch (for in­stance, 600 × 600).”</p>');
  });
});
