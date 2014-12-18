
  var legalize = function(position, modifier) {
    legals[position] += modifier;
    var tmod = position % N;
    var tdiv = Math.floor(position/N);
    for (var i=0; i<N; i++) {
      // row element
      modify(N*tdiv+i, position, modifier);
      // column
      modify(tmod+(i*N), position, modifier);
      // major diagonal
      modify((tmod-tdiv)+(i*(N+1)), position, modifier);
      // minor diagonal
      modify((tmod+tdiv)+(i*(N-1)), position, modifier);
    }
  };

  var modify = function(index, position, modifier) {
    if (legals[index] !== undefined && index !== position) legals[index] += modifier;
  };


  var setLegals = function(target, modifier) {
    // console.log(legals);
    var tdiv = Math.floor(target / N);
    var tmod = target % N;
    for (var i=0; i<(N*N); i++) {
      var idiv = Math.floor(i / N);
      var imod = i % N;
      // check each cell for threat, modify status if threatened.
      if (idiv===tdiv || imod===tmod || (idiv+imod)===(tdiv+tmod) || (idiv-imod)===(tdiv-tmod)) {
        legals[i] += modifier;
      }
    }
  };
