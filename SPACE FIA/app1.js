function mostrarPisos({codigo, descripcion, cantidad}){
    return `
    <td>${descripcion}</td>
    <td>${cantidad}</td>
    `
  };
  //CHILD_ADDED
  coleccionPisos.on('child_added', data =>{
    let tr = document.createElement('tr')
    tr.id = data.key
    tr.innerHTML = mostrarPisos(data.val())
    document.getElementById('bodyPisos').appendChild(tr)
  });
  //CHILD_CHANGED
  coleccionPisos.on('child_changed', data =>{
    let nodoEditado = document.getElementById(data.key)
    nodoEditado.innerHTML = mostrarPisos(data.val())
  });
  