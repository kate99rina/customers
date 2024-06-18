var button = document.getElementById('myButton');
    
    button.addEventListener('click', function() {
        var table = document.getElementById('table');
        table.childNodes.forEach(tr=>{
            const data = {
                status: tr.childNodes[0].value,
                accountNumber: tr.childNodes[1].value
              };
            const response = fetch('http://localhost:3000/api/update', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              });
              if (!response.ok) {
                throw new Error('Error creating post');
              }
        })
        
    })
    .catch(error => console.error('Error fetching data:', error));
      alert('Данные обновлены!');
