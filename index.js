function getData() {
  axios.get('http://localhost:3000/api/getData')
      .then(response => {
          console.log(response.data);
          // Aqui você pode manipular os dados recebidos como preferir
      })
      .catch(error => console.error('Erro ao obter dados:', error));
}

function updateData() {
    const newPerson = {
      nome: "Outro nome",
      idade: 000,
      pao: false
    };
  
    axios.post('http://localhost:3000/api/updateData', newPerson)
      .then(response => {
        console.log(response);
      })
      .catch(error => console.error('Erro ao atualizar dados:', error));
  }
  

